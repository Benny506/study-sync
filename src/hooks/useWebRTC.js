import { useEffect, useRef, useState, useCallback } from 'react'
import Peer from 'simple-peer'
import { supabase } from '../supabase'
import { SignalingService } from '../services/signaling'
import { DBService } from '../services/dbService'
import { StorageService } from '../services/storageService'
import { FileTransfer } from '../utils/fileTransfer'
import { showLoader, hideLoader, addAlert } from '../store/uiSlice'
import { useDispatch } from 'react-redux'

/**
 * useWebRTC Hook: Now with Bi-Directional Full-Duplex Pulse
 */
export const useWebRTC = (roomID, userName, sessionID) => {
  const dispatch = useDispatch()
  const [peers, setPeers] = useState([]) 
  const [connectionStatus, setConnectionStatus] = useState('disconnected')
  const [messages, setMessages] = useState([])
  const [cloudFiles, setCloudFiles] = useState([])
  
  // Decoupled Progress States for Full-Duplex P2P
  const [incomingProgress, setIncomingProgress] = useState(0)
  const [outgoingProgress, setOutgoingProgress] = useState(0)
  
  const [isUploading, setIsUploading] = useState(false)
  const [incomingFiles, setIncomingFiles] = useState([]) 
  
  const signalingRef = useRef(null)
  const peerRef = useRef(null)
  const signalBufferRef = useRef([]) 
  const chunksMapRef = useRef(new Map()) 

  useEffect(() => {
    if (!roomID || !userName || !sessionID) return

    const initPersistence = async () => {
      const history = await DBService.getMessages(roomID)
      setMessages(history.map(m => ({ 
        id: m.id,
        type: 'chat', 
        sender: m.sender_name, 
        text: m.text, 
        timestamp: m.created_at 
      })))

      const files = await DBService.getFiles(roomID)
      setCloudFiles(files)
    }

    initPersistence()

    const dbSub = supabase.channel(`studysync_db_${roomID}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'studysync_messages' }, (payload) => {
        if (payload.new.room_id !== roomID) return
        setMessages(prev => {
          if (prev.some(m => m.id === payload.new.id)) return prev
          return [...prev, {
            id: payload.new.id,
            type: 'chat',
            sender: payload.new.sender_name,
            text: payload.new.text,
            timestamp: payload.new.created_at
          }]
        })
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'studysync_files' }, (payload) => {
        if (payload.new.room_id !== roomID) return
        setCloudFiles(prev => [payload.new, ...prev])
      })
      .subscribe()

    const signaling = new SignalingService(roomID, userName, sessionID)
    signalingRef.current = signaling

    const handleSignal = (payload) => {
      if (peerRef.current) {
        peerRef.current.signal(payload.data)
      } else {
        signalBufferRef.current.push(payload.data)
      }
    }

    const handlePresenceChange = (state) => {
      const activePeerEntries = Object.entries(state)
        .filter(([sid]) => sid !== sessionID)
        .map(([sid, presences]) => ({
          sessionID: sid,
          userName: presences[0].user || 'Anonymous Student'
        }))

      setPeers(activePeerEntries)
      
      if (activePeerEntries.length > 0 && !peerRef.current) {
        const allIDs = [sessionID, ...activePeerEntries.map(p => p.sessionID)].sort()
        const isInitiator = allIDs[0] === sessionID
        initiateConnection(isInitiator)
      }
    }

    signaling.join({ onSignal: handleSignal, onPresenceChange: handlePresenceChange })

    return () => {
      if (signalingRef.current) signalingRef.current.leave()
      if (peerRef.current) peerRef.current.destroy()
      dbSub.unsubscribe()
      peerRef.current = null
      signalBufferRef.current = []
    }
  }, [roomID, userName, sessionID, dispatch])

  const initiateConnection = useCallback((initiator) => {
    setConnectionStatus('connecting')
    if (peerRef.current) peerRef.current.destroy()

    const p = new Peer({
      initiator,
      trickle: true,
      config: { 
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun.services.mozilla.com' }
        ] 
      }
    })

    p.on('signal', (data) => signalingRef.current?.sendSignal(null, data))
    p.on('connect', () => { setConnectionStatus('connected') })

    p.on('data', (data) => {
      try {
        const decoded = JSON.parse(data.toString())
        
        if (decoded.type === 'file-meta') {
          chunksMapRef.current.set(decoded.fileID, [])
          const newFile = { 
            id: decoded.fileID,
            name: decoded.name, 
            size: decoded.size, 
            mime: decoded.mime,
            totalChunks: decoded.totalChunks,
            completed: false 
          }
          setIncomingFiles(prev => [newFile, ...prev])
          dispatch(addAlert({ type: 'info', title: 'Incoming Pulse', message: `Receiving ${decoded.name} via P2P...` }))
        }

        if (decoded.type === 'file-chunk') {
          const fileID = decoded.fileID
          if (!chunksMapRef.current.has(fileID)) return

          const currentChunks = chunksMapRef.current.get(fileID)
          currentChunks.push(decoded)
          
          // Independent incoming progress tracking
          setIncomingProgress(prev => Math.min(prev + (100 / decoded.totalChunks / 5), 100))

          if (currentChunks.length === decoded.totalChunks) {
            const blob = FileTransfer.reassembleToBlob(currentChunks, decoded.mime)
            setIncomingFiles(prev => prev.map(f => 
              f.id === fileID ? { ...f, blob, completed: true } : f
            ))
            dispatch(addAlert({ type: 'success', title: 'Pulse Received', message: `${decoded.name || 'File'} is ready for download.` }))
            chunksMapRef.current.delete(fileID)
          }
        }
      } catch (err) { console.error('P2P Error:', err) }
    })

    if (signalBufferRef.current.length > 0) {
      signalBufferRef.current.forEach(sig => p.signal(sig))
      signalBufferRef.current = []
    }

    peerRef.current = p
  }, [dispatch])

  const uploadToLibrary = async (files) => {
    if (!files || files.length === 0) return
    setIsUploading(true)
    
    if (files.length > 5) {
      dispatch(addAlert({ type: 'warning', title: 'Batch Limit', message: 'Maximum 5 files per library beam.' }))
      setIsUploading(false)
      return
    }

    const oversized = Array.from(files).some(f => f.size > 50 * 1024 * 1024)
    if (oversized) {
      dispatch(addAlert({ type: 'error', title: 'Size Limit', message: 'Each file must be under 50MB for Cloud.' }))
      setIsUploading(false)
      return
    }

    dispatch(showLoader({ title: 'Syncing Library', message: `Beaming ${files.length} resource(s) to cloud...` }))
    
    try {
      for (const file of Array.from(files)) {
        const { path } = await StorageService.uploadFile(file, roomID)
        await DBService.saveFileRecord(roomID, file.name, file.size, userName, path)
      }
      dispatch(addAlert({ type: 'success', title: 'Batch Synced', message: `Library updated with ${files.length} file(s).` }))
    } catch (err) { 
      dispatch(addAlert({ type: 'error', title: 'Sync Failed', message: 'Could not beam library to cloud.' }))
    } finally { 
      setIsUploading(false) 
      dispatch(hideLoader())
    }
  }

  const sendPulseDrop = async (files) => {
    if (!files || files.length === 0) return
    if (!peerRef.current || connectionStatus !== 'connected') return

    const totalPulseSize = Array.from(files).reduce((acc, f) => acc + f.size, 0)
    if (totalPulseSize > 100 * 1024 * 1024) {
      dispatch(addAlert({ type: 'warning', title: 'Pulse Limit', message: 'Total P2P pulse must be under 100MB.' }))
      return
    }

    dispatch(addAlert({ type: 'info', title: 'Beaming Pulse', message: `Direct beaming ${files.length} resource(s)...` }))
    
    try {
      for (const file of Array.from(files)) {
        await FileTransfer.sendFile(peerRef.current, file, (prog) => {
          // Independent outgoing progress tracking
          setOutgoingProgress(prog)
        })
      }
      dispatch(addAlert({ type: 'success', title: 'Beam Success', message: `Pulse drop of ${files.length} file(s) complete.` }))
    } catch (err) {
      dispatch(addAlert({ type: 'error', title: 'Beam Failed', message: 'P2P pulse was interrupted.' }))
    } finally {
      setTimeout(() => setOutgoingProgress(0), 1000)
    }
  }

  const dismissIncomingFile = (id) => {
    setIncomingFiles(prev => prev.filter(f => f.id !== id))
    chunksMapRef.current.delete(id)
  }

  const clearIncoming = () => {
    setIncomingFiles([])
    chunksMapRef.current.clear()
    setIncomingProgress(0)
  }

  const sendMessage = async (text) => {
    if (!text.trim()) return
    await DBService.saveMessage(roomID, userName, text)
  }

  return {
    peers,
    connectionStatus,
    messages,
    cloudFiles,
    sendMessage,
    uploadToLibrary,
    sendPulseDrop,
    incomingProgress,
    outgoingProgress,
    isUploading,
    incomingFiles,
    dismissIncomingFile,
    clearIncoming
  }
}
