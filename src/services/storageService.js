import { supabase } from '../supabase'

/**
 * Storage Service: The "Library" of StudySync.
 * Handles binary file persistence using Supabase Storage.
 */
export class StorageService {
  /**
   * Upload a file to the Study Library
   */
  static async uploadFile(file, roomID) {
    const timestamp = Date.now()
    const path = `${roomID}/${timestamp}_${file.name}`
    
    console.log(`☁️ Uploading to Cloud Storage: ${file.name}`)
    
    const { data, error } = await supabase.storage
      .from('studysync_files')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('❌ Upload failed:', error)
      throw error
    }

    // Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('studysync_files')
      .getPublicUrl(path)

    return { path, publicUrl }
  }

  /**
   * Get a signed URL for secure download (if bucket is private)
   * For now, we assume bucket is public for simplicity in a school project.
   */
  static getDownloadURL(path) {
    const { data } = supabase.storage
      .from('studysync_files')
      .getPublicUrl(path)
    return data.publicUrl
  }

  /**
   * Delete a file from the Study Library
   */
  static async deleteFile(path) {
    const { error } = await supabase.storage
      .from('studysync_files')
      .remove([path])
    
    if (error) console.error('❌ Delete failed:', error)
  }
}
