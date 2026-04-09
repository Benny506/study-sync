import { supabase } from '../supabase'

/**
 * Signaling Service: The "Matchmaker" for StudySync.
 * Uses Supabase Broadcast to exchange WebRTC handshakes and ICE candidates.
 */
export class SignalingService {
  constructor(roomID, userName, sessionID) {
    this.roomID = roomID
    this.userName = userName
    this.sessionID = sessionID
    this.channel = supabase.channel(`studysync_room_${roomID}`, {
      config: {
        broadcast: { self: false },
        presence: { key: sessionID }, // Tie-breaker: Use UUID as key
      },
    })
  }

  /**
   * Initialize the channel and subscribe to events
   */
  async join(callbacks) {
    const { onSignal, onPresenceChange } = callbacks

    this.channel
      .on('broadcast', { event: 'signal' }, ({ payload }) => {
        // Targeted Delivery: Only process if it's for us or a global broadcast
        if (payload.target && payload.target !== this.sessionID) return
        
        console.log('📡 Received Signal:', payload.data.type)
        onSignal(payload)
      })
      .on('presence', { event: 'sync' }, () => {
        const state = this.channel.presenceState()
        onPresenceChange(state)
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('👤 Peer Joined:', newPresences)
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('👤 Peer Left:', leftPresences)
      })

    const status = await this.channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        console.log('🟢 Subscribed to signaling room:', this.roomID)
        await this.channel.track({
          user: this.userName,
          sessionID: this.sessionID,
          online_at: new Date().toISOString(),
        })
      }
    })

    return status
  }

  /**
   * Send a WebRTC signal (Offer, Answer, or ICE candidate)
   */
  async sendSignal(targetPeer, signalData) {
    console.log('📡 Sending Signal:', signalData.type)
    await this.channel.send({
      type: 'broadcast',
      event: 'signal',
      payload: {
        sender: this.userName,
        target: targetPeer, // To support multi-peer later
        data: signalData,
      },
    })
  }

  /**
   * Leave the room and cleanup
   */
  async leave() {
    await this.channel.unsubscribe()
  }
}
