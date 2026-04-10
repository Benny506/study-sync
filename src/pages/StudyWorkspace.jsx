import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Form, Badge, InputGroup, ProgressBar, Spinner } from 'react-bootstrap'
import { motion, AnimatePresence } from 'framer-motion'
import { useDispatch } from 'react-redux'
import {
  Users,
  FileUp,
  Share2,
  Terminal,
  MessagesSquare,
  Zap,
  Activity,
  Cloud,
  Download,
  Database,
  Hash,
  DownloadCloud,
  XCircle,
  CheckCircle2,
  Shield,
  Lock,
  RefreshCw
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../index.css'
import './StudyWorkspace.css'

// Store & Components
import { useWebRTC } from '../hooks/useWebRTC'
import { StorageService } from '../services/storageService'
import { FileTransfer } from '../utils/fileTransfer'
import GlobalLoader from '../components/Loader/GlobalLoader'
import GlobalAlerts from '../components/Alerts/GlobalAlerts'
import { showLoader, hideLoader, addAlert } from '../store/uiSlice'
import Logo from '../assets/logo.svg'

/**
 * Lobby Component
 */
const Lobby = ({ roomID, setRoomID, userName, setUserName, onJoin, isAdminMode, setIsAdminMode, adminCredentials, adminInput, setAdminInput, timeLeft }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="d-flex flex-column align-items-center justify-content-center min-vh-100 px-3"
  >
    <div className="text-center mb-5">
      <div className="d-inline-block p-4 glass-card mb-4 pulse" style={{ width: '120px', height: '120px' }}>
        <img src={Logo} alt="StudySync Logo" className="img-fluid glow-filter" />
      </div>
      <h1 className="display-3 fw-bold tracking-tighter shiny-text">StudySync <span className="text-cobalt">Drop</span></h1>
      <p className="text-secondary lead">Persistent P2P Collaboration for Modern Study Groups</p>
    </div>

    <Card className="glass-card p-4 p-md-5 w-100" style={{ maxWidth: '480px' }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="fw-bold m-0 d-flex align-items-center gap-2">
          <Terminal size={20} className="text-cyan" /> {isAdminMode ? 'Admin Intelligence' : 'Configure Connection'}
        </h4>
        <Form.Check 
          type="switch"
          id="admin-switch"
          label={<small className="mono text-secondary uppercase tracking-widest" style={{ fontSize: '0.6rem' }}>Admin Access</small>}
          checked={isAdminMode}
          onChange={(e) => setIsAdminMode(e.target.checked)}
          className="admin-switch"
        />
      </div>

      <Form onSubmit={onJoin}>
        {!isAdminMode ? (
          <>
            <Form.Group className="mb-3">
              <Form.Label className="mono smaller text-secondary uppercase tracking-widest">Display Name</Form.Label>
              <InputGroup className="shadow-sm">
                <InputGroup.Text className="input-group-text-glass">
                  <Users size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Your student name..."
                  className="glass-input glass-input-with-icon p-3"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="mono smaller text-secondary uppercase tracking-widest">Study Group ID</Form.Label>
              <InputGroup className="shadow-sm">
                <InputGroup.Text className="input-group-text-glass">
                  <Hash size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="e.g. MATH-202"
                  className="glass-input glass-input-with-icon p-3"
                  value={roomID}
                  onChange={(e) => setRoomID(e.target.value)}
                  required
                />
                <Button variant="outline-cyan" className="border-white border-opacity-10 px-4" onClick={() => setRoomID(Math.random().toString(36).substring(7).toUpperCase())}>
                  Auto
                </Button>
              </InputGroup>
            </Form.Group>
          </>
        ) : (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="p-3 mb-4 rounded-4 bg-cobalt bg-opacity-10 border border-cobalt border-opacity-20">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Badge bg="cobalt" className="text-white mono smaller uppercase tracking-widest">Active Rotating Key</Badge>
                <div className="smaller mono text-secondary d-flex align-items-center gap-1">
                  <RefreshCw size={12} className="spin-slow" /> {timeLeft}s
                </div>
              </div>
              <div className="d-flex gap-3 mb-2">
                <div className="flex-grow-1">
                  <small className="mono text-secondary uppercase block mb-1" style={{ fontSize: '0.6rem' }}>Access UID</small>
                  <div className="p-2 glass-card text-center mono fw-bold">{adminCredentials.user}</div>
                </div>
                <div className="flex-grow-1">
                  <small className="mono text-secondary uppercase block mb-1" style={{ fontSize: '0.6rem' }}>Passphrase</small>
                  <div className="p-2 glass-card text-center mono fw-bold">{adminCredentials.pass}</div>
                </div>
              </div>
              <p className="smaller text-secondary m-0 mt-3 opacity-75">
                <Shield size={12} className="me-1" /> Use the above temporary credentials to bypass peer protocols.
              </p>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="mono smaller text-secondary uppercase tracking-widest">Admin User</Form.Label>
              <InputGroup className="shadow-sm">
                <InputGroup.Text className="input-group-text-glass">
                  <Users size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Enter UID..."
                  className="glass-input glass-input-with-icon p-3"
                  value={adminInput.user}
                  onChange={(e) => setAdminInput({...adminInput, user: e.target.value})}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="mono smaller text-secondary uppercase tracking-widest">Security Passphrase</Form.Label>
              <InputGroup className="shadow-sm">
                <InputGroup.Text className="input-group-text-glass">
                  <Lock size={18} />
                </InputGroup.Text>
                <Form.Control
                  type="password"
                  placeholder="Enter passphrase..."
                  className="glass-input glass-input-with-icon p-3"
                  value={adminInput.pass}
                  onChange={(e) => setAdminInput({...adminInput, pass: e.target.value})}
                  required
                />
              </InputGroup>
            </Form.Group>
          </motion.div>
        )}

        <Button type="submit" className="btn-prism w-100 py-3 d-flex align-items-center justify-content-center gap-2">
          {isAdminMode ? 'Authorize Intelligence' : 'Initialize Session'} <Zap size={18} />
        </Button>
      </Form>
    </Card>
  </motion.div>
)

/**
 * StudyRoom Component
 */
const StudyRoom = ({
  roomID,
  userName,
  peers,
  connectionStatus,
  messages,
  cloudFiles,
  chatInput,
  setChatInput,
  onSendChat,
  uploadToLibrary,
  sendPulseDrop,
  incomingFiles,
  dismissIncomingFile,
  clearIncoming,
  incomingProgress,
  outgoingProgress,
  isUploading,
  onLeave,
  fileInputRef,
  pulseInputRef
}) => {

  const handleDownloadPulse = (file) => {
    if (file?.blob) {
      FileTransfer.downloadBlob(file.blob, file.name)
    }
  }

  const handleDownloadAll = async () => {
    const readyFiles = incomingFiles.filter(f => f.completed)
    for (const file of readyFiles) {
      handleDownloadPulse(file)
      await new Promise(r => setTimeout(r, 300)) // 🚀 Security Stagger: Prevents browser pop-up block
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="container-fluid py-5 px-lg-5">
      <Row className="mb-5 align-items-center">
        <Col>
          <div className="d-flex align-items-center gap-3">
            <div className="p-2 glass-card" style={{ width: '60px', height: '60px' }}>
              <img src={Logo} alt="Logo" className="img-fluid" />
            </div>
            <div>
              <h2 className="mb-0 fw-bold tracking-tighter">Study Room: <span className="text-cobalt">{roomID}</span></h2>
              <p className="text-secondary small m-0 mono">Active Student: {userName}</p>
            </div>
          </div>
        </Col>
        <Col md="auto" className="d-flex align-items-center gap-3">
          <Badge bg={connectionStatus === 'connected' ? 'success' : 'warning'} className="rounded-pill px-3 py-2 mono smaller text-uppercase">
            <Activity size={12} className="me-1" /> {connectionStatus}
          </Badge>
          <Button variant="outline-danger" className="border-opacity-10 rounded-pill px-4" onClick={onLeave}>
            Leave Room
          </Button>
        </Col>
      </Row>

      <Row className="g-4">
        <Col lg={3}>
          <Card className="glass-card p-4 mb-4 h-100 shadow-lg">
            <h6 className="mono smaller uppercase text-secondary tracking-widest mb-4">Peer Directory</h6>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex align-items-center gap-3 p-3 prism-surface rounded-4 shadow-sm">
                <div className="bg-cyan rounded-circle p-2 text-black shadow-sm"><Users size={18} /></div>
                <div className="fw-bold small">{userName} (You)</div>
              </div>
              {peers.map(p => {
                const isNameDuplicate = p.userName === userName || peers.filter(peer => peer.userName === p.userName).length > 1;
                return (
                  <motion.div key={p.sessionID} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="d-flex align-items-center gap-3 p-3 prism-surface rounded-4 shadow-sm">
                    <div className="bg-cobalt rounded-circle p-2 text-white shadow-sm"><Users size={18} /></div>
                    <div className="flex-grow-1 overflow-hidden">
                      <div className="fw-bold small text-truncate text-dark">{p.userName}</div>
                      {isNameDuplicate && <div className="smaller mono text-secondary opacity-75" style={{ fontSize: '0.6rem' }}>Session: #{p.sessionID.substring(0, 4)}</div>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="glass-card p-4 mb-4 shadow-lg overflow-hidden" style={{ minHeight: '340px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h6 className="mono smaller uppercase text-secondary tracking-widest m-0">Study Library <Cloud size={14} className="ms-1" /></h6>
                <div className="smaller text-secondary opacity-50 mono mt-1" style={{ fontSize: '0.6rem' }}>Limits: 5 Files • 50MB Each</div>
              </div>
              <input type="file" ref={fileInputRef} onChange={(e) => uploadToLibrary(e.target.files)} multiple hidden />
              <Button variant="outline-cyan" size="sm" className="rounded-pill px-3 shadow-sm hover-lift" onClick={() => fileInputRef.current.click()} disabled={isUploading}>
                {isUploading ? <Spinner animation="border" size="sm" /> : <><FileUp size={14} className="me-1" /> Add to Library</>}
              </Button>
            </div>

            <div className="d-flex flex-column gap-2 overflow-auto pe-1" style={{ maxHeight: '250px' }}>
              {cloudFiles.length === 0 ? (
                <div className="text-center py-5 opacity-25 d-flex flex-column align-items-center">
                  <Database size={48} className="mb-2" />
                  <span className="mono smaller">No persistent files shared yet.</span>
                </div>
              ) : (
                cloudFiles.map(file => (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={file.id} className="d-flex align-items-center justify-content-between p-3 prism-surface rounded-4 shadow-sm mb-1 hover-lift">
                    <div className="d-flex align-items-center gap-3 overflow-hidden">
                      <div className="bg-cyan bg-opacity-10 p-2 rounded-3 shadow-inner">
                        <Database size={20} className="text-cyan flex-shrink-0" />
                      </div>
                      <div className="overflow-hidden">
                        <div className="fw-bold small text-truncate">{file.file_name}</div>
                        <div className="smaller text-secondary mono" style={{ fontSize: '0.7rem' }}>Uploaded by {file.uploader_name}</div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-cyan p-0 hover-glow" onClick={() => window.open(StorageService.getDownloadURL(file.storage_path))}>
                      <DownloadCloud size={20} />
                    </Button>
                  </motion.div>
                ))
              )}
            </div>
          </Card>

          <Card
            className={`glass-card p-4 d-flex flex-column border-2 transition-all shadow-lg ${incomingFiles.length > 0 || outgoingProgress > 0 ? 'border-cyan' : 'border-secondary opacity-50'}`}
            style={{ borderStyle: 'dashed', minHeight: '300px' }}
          >
            {/* 📤 OUTGOING SECTION (PERSISTENT) */}
            <div className="w-100 mb-4 pb-4 border-bottom border-white border-opacity-5">
              <h6 className="mono smaller uppercase text-secondary tracking-widest m-0 text-center">Pulse Drop Zone <Zap size={14} className="ms-1 shadow-sm" /></h6>
              <div className="smaller text-secondary opacity-50 mono mb-4 mt-1 text-center" style={{ fontSize: '0.6rem' }}>Limits: 100MB Total Pulse • Bi-Directional Ready</div>

              {outgoingProgress > 0 && (
                <div className="w-100 mb-4 px-4">
                  <div className="d-flex justify-content-between smaller mono text-cyan mb-2">
                    <span>OUTGOING BEAM...</span>
                    <span>{Math.round(outgoingProgress)}%</span>
                  </div>
                  <ProgressBar now={outgoingProgress} variant="cyan" className="bg-black bg-opacity-50 shadow-inner" style={{ height: '6px' }} />
                </div>
              )}

              <input type="file" ref={pulseInputRef} onChange={(e) => sendPulseDrop(e.target.files)} multiple hidden />
              <div className="text-center">
                <Button
                  className="btn-prism px-5 py-3 shadow-lg hover-lift"
                  disabled={connectionStatus !== 'connected' || outgoingProgress > 0}
                  onClick={() => pulseInputRef.current.click()}
                >
                  {outgoingProgress > 0 ? 'Beaming...' : 'Initiate Pulse'}
                </Button>
              </div>
            </div>

            {/* 📥 INCOMING SECTION (EXPANDABLE) */}
            <AnimatePresence>
              {incomingFiles.length > 0 && (
                <motion.div
                  key="incoming-tray"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-100 overflow-hidden"
                >
                  <div className="smaller mono text-cyan fw-bold mb-3 mt-2 tracking-widest uppercase d-flex align-items-center justify-content-between">
                    <span><Spinner animation="grow" size="sm" className="bg-cyan me-2" /> TRANSIT HUB</span>
                    <div className="d-flex gap-3">
                      {incomingFiles.filter(f => f.completed).length > 1 && (
                        <Button variant="link" size="sm" className="text-cyan p-0 mono hover-glow" onClick={handleDownloadAll}>Download All</Button>
                      )}
                      <Button variant="link" size="sm" className="text-secondary p-0 mono" onClick={clearIncoming}>Clear Hub</Button>
                    </div>
                  </div>

                  <div className="d-flex flex-column gap-2 overflow-auto pe-1" style={{ maxHeight: '200px' }}>
                    {incomingFiles.map(file => (
                      <div key={file.id} className="p-3 prism-surface rounded-4 d-flex align-items-center justify-content-between mb-1 hover-lift">
                        <div className="d-flex align-items-center gap-3 overflow-hidden">
                          {file.completed ? <CheckCircle2 size={18} className="text-cyan pulse" /> : <Spinner animation="border" size="sm" className="text-secondary" style={{ width: '14px', height: '14px' }} />}
                          <div className="text-start overflow-hidden">
                            <div className="fw-bold smaller text-truncate text-dark" style={{ maxWidth: '120px' }}>{file.name}</div>
                            <div className="smaller text-secondary mono" style={{ fontSize: '0.6rem' }}>
                              {file.completed ? 'READY' : 'SYNCING...'}
                            </div>
                          </div>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                          {file.completed && (
                            <Button variant="ghost" size="sm" className="text-cyan p-0 hover-glow" onClick={() => handleDownloadPulse(file)}>
                              <Download size={18} />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="text-secondary opacity-25 p-0 hover-glow" onClick={() => dismissIncomingFile(file.id)}>
                            <XCircle size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {incomingProgress > 0 && incomingProgress < 100 && (
                    <div className="w-100 mt-3 px-2">
                      <div className="d-flex justify-content-between smaller mono text-secondary mb-1">
                        <span style={{ fontSize: '0.6rem' }}>INCOMING SYNC</span>
                        <span style={{ fontSize: '0.6rem' }}>{Math.round(incomingProgress)}%</span>
                      </div>
                      <ProgressBar now={incomingProgress} variant="primary" className="bg-black bg-opacity-50 shadow-inner" style={{ height: '4px' }} />
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {incomingFiles.length === 0 && (
              <div className="text-center py-4 opacity-25">
                <p className="text-secondary mb-0 smaller mono uppercase tracking-widest">Full-Duplex Pulse Ready.</p>
              </div>
            )}
          </Card>
        </Col>

        <Col lg={3}>
          <Card className="glass-card h-100 d-flex flex-column p-4 overflow-hidden shadow-lg border-white border-opacity-5">
            <h6 className="mono smaller uppercase text-secondary tracking-widest mb-4">Study Session Logs</h6>
            <div className="flex-grow-1 overflow-auto mb-3 pe-2 chat-container" style={{ maxHeight: '500px' }}>
              {messages.length === 0 ? (
                <div className="h-100 d-flex flex-column align-items-center justify-content-center opacity-20 py-5">
                  <MessagesSquare size={48} className="mb-2" />
                  <span className="smaller mono text-center">No logs found.</span>
                </div>
              ) : (
                <div className="d-flex flex-column gap-3">
                  {messages.map((m, i) => (
                    <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} key={i} className={`p-3 rounded-4 shadow-sm ${m.sender === userName ? 'bg-cobalt bg-opacity-10 ms-3 border border-cobalt border-opacity-10 shadow-sm' : 'prism-surface me-3 border-opacity-5'}`}>
                      <div className="smaller mono text-secondary mb-1 d-flex justify-content-between border-bottom border-dark border-opacity-5 pb-1 mb-2" style={{ fontSize: '0.65rem' }}>
                        <span className="fw-bold text-cobalt">{m.sender}</span>
                        <span className="opacity-50">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="small text-dark">{m.text}</div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            <Form onSubmit={onSendChat}>
              <InputGroup className="shadow-lg rounded-pill overflow-hidden">
                <InputGroup.Text className="input-group-text-glass">
                  <MessagesSquare size={16} />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Drop a study note..."
                  className="glass-input glass-input-with-icon px-3"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <Button type="submit" variant="none" className="bg-cobalt bg-opacity-10 text-cobalt border border-dark border-opacity-10 px-3 hover-glow">
                  <Zap size={16} />
                </Button>
              </InputGroup>
            </Form>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
}

/**
 * Main Controller: StudyWorkspace
 */
function StudyWorkspace() {
  const dispatch = useDispatch()
  const [roomID, setRoomID] = useState(() => localStorage.getItem('studysync_room_id') || '')
  const [userName, setUserName] = useState(() => localStorage.getItem('studysync_user_name') || '')
  const [isInRoom, setIsInRoom] = useState(() => localStorage.getItem('studysync_in_room') === 'true')
  const navigate = useNavigate()

  // 🔐 Admin Security States
  const [isAdminMode, setIsAdminMode] = useState(false)
  const [adminCredentials, setAdminCredentials] = useState({ user: '', pass: '' })
  const [adminInput, setAdminInput] = useState({ user: '', pass: '' })
  const [timeLeft, setTimeLeft] = useState(60)

  // 🛰️ Admin Credential Rotation (60s cycle)
  useEffect(() => {
    const generateCreds = () => {
      setAdminCredentials({
        user: `ADM-${Math.floor(1000 + Math.random() * 9000)}`,
        pass: Math.random().toString(36).substring(7).toUpperCase()
      })
      setTimeLeft(60)
    }

    generateCreds()
    const rotationInterval = setInterval(generateCreds, 60000)
    const countdownInterval = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => {
      clearInterval(rotationInterval)
      clearInterval(countdownInterval)
    }
  }, [])

  // 🛰️ Unique Identity: Ensures P2P survives name collisions
  const [sessionID] = useState(() => {
    const saved = localStorage.getItem('studysync_session_id')
    if (saved) return saved
    const newID = crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15)
    localStorage.setItem('studysync_session_id', newID)
    return newID
  })

  const [chatInput, setChatInput] = useState('')
  const fileLibraryRef = useRef(null)
  const pulseDropRef = useRef(null)

  const {
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
    clearIncoming,
  } = useWebRTC(isInRoom ? roomID : null, userName, sessionID)

  // Side-effect to handle alerts for connection changes
  useEffect(() => {
    if (isInRoom && connectionStatus === 'connected') {
      dispatch(addAlert({
        type: 'success',
        title: 'Room Active',
        message: 'Pulse channel established with peers.'
      }))
    }
  }, [connectionStatus, isInRoom, dispatch])

  const handleJoin = (e) => {
    e.preventDefault()

    if (isAdminMode) {
      if (adminInput.user === adminCredentials.user && adminInput.pass === adminCredentials.pass) {
        dispatch(showLoader({ title: 'Elevating Base', message: 'Authorizing Intelligence HUD...' }))
        setTimeout(() => {
          dispatch(hideLoader())
          navigate('/admin')
        }, 1200)
      } else {
        dispatch(addAlert({
          type: 'danger',
          title: 'Authorization Failure',
          message: 'Security credentials do not match active rotation key.'
        }))
      }
      return
    }

    if (roomID && userName) {
      dispatch(showLoader({
        title: 'Synchronizing',
        message: 'Establishing laboratory session...'
      }))

      setTimeout(() => {
        localStorage.setItem('studysync_room_id', roomID)
        localStorage.setItem('studysync_user_name', userName)
        localStorage.setItem('studysync_in_room', 'true')
        setIsInRoom(true)
        dispatch(hideLoader())
      }, 1500)
    }
  }

  const handleLeave = () => {
    localStorage.removeItem('studysync_room_id')
    localStorage.removeItem('studysync_user_name')
    localStorage.setItem('studysync_in_room', 'false')
    setIsInRoom(false)
    dispatch(addAlert({
      type: 'info',
      title: 'Session Terminated',
      message: 'You have left the study group.'
    }))
  }

  const handleSendChat = (e) => {
    e.preventDefault()
    if (chatInput.trim()) {
      sendMessage(chatInput)
      setChatInput('')
    }
  }

  return (
    <div className="App">
      <GlobalLoader />
      <GlobalAlerts />

      <AnimatePresence mode="wait">
        {!isInRoom ? (
          <Lobby
            key="lobby"
            roomID={roomID}
            setRoomID={setRoomID}
            userName={userName}
            setUserName={setUserName}
            onJoin={handleJoin}
            isAdminMode={isAdminMode}
            setIsAdminMode={setIsAdminMode}
            adminCredentials={adminCredentials}
            adminInput={adminInput}
            setAdminInput={setAdminInput}
            timeLeft={timeLeft}
          />
        ) : (
          <StudyRoom
            key="room"
            roomID={roomID}
            userName={userName}
            peers={peers}
            connectionStatus={connectionStatus}
            messages={messages}
            cloudFiles={cloudFiles}
            chatInput={chatInput}
            setChatInput={setChatInput}
            onSendChat={handleSendChat}
            uploadToLibrary={uploadToLibrary}
            sendPulseDrop={sendPulseDrop}
            incomingFiles={incomingFiles}
            dismissIncomingFile={dismissIncomingFile}
            clearIncoming={clearIncoming}
            incomingProgress={incomingProgress}
            outgoingProgress={outgoingProgress}
            isUploading={isUploading}
            onLeave={handleLeave}
            fileInputRef={fileLibraryRef}
            pulseInputRef={pulseDropRef}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default StudyWorkspace
