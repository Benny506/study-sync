import { supabase } from '../supabase'

/**
 * DB Service: The memory of StudySync.
 * Handles persistence for messages and file records.
 */
export class DBService {
  /**
   * Fetch message history for a room
   */
  static async getMessages(roomID, limit = 50) {
    const { data, error } = await supabase
      .from('studysync_messages')
      .select('*')
      .eq('room_id', roomID)
      .order('created_at', { ascending: true })
      .limit(limit)

    if (error) {
      console.error('❌ Error fetching messages:', error)
      return []
    }
    return data
  }

  /**
   * Save a new message
   */
  static async saveMessage(roomID, sender, text) {
    const { data, error } = await supabase
      .from('studysync_messages')
      .insert([{
        room_id: roomID,
        sender_name: sender,
        text: text
      }])
      .select()

    if (error) console.error('❌ Error saving message:', error)
    return data ? data[0] : null
  }

  /**
   * Fetch the list of cloud-stored files for a room
   */
  static async getFiles(roomID) {
    const { data, error } = await supabase
      .from('studysync_files')
      .select('*')
      .eq('room_id', roomID)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error fetching file records:', error)
      return []
    }
    return data
  }

  /**
   * Save metadata for a cloud file
   */
  static async saveFileRecord(roomID, fileName, fileSize, uploader, storagePath) {
    const { data, error } = await supabase
      .from('studysync_files')
      .insert([{
        room_id: roomID,
        file_name: fileName,
        file_size: fileSize,
        uploader_name: uploader,
        storage_path: storagePath
      }])
      .select()

    if (error) console.error('❌ Error saving file record:', error)
    return data ? data[0] : null
  }
}
