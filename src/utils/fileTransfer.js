/**
 * FileTransfer Utility: The "Logistics" of StudySync.
 * Handles slicing files into chunks for P2P delivery and reassembly.
 */
export const CHUNK_SIZE = 16384 // 16KB (Safe limit for WebRTC)

export class FileTransfer {
  /**
   * Slice a file into chunks and send them via a peer
   */
  static async sendFile(peer, file, onProgress) {
    const arrayBuffer = await file.arrayBuffer()
    const totalChunks = Math.ceil(arrayBuffer.byteLength / CHUNK_SIZE)
    const fileID = Math.random().toString(36).substring(7)

    console.log(`📦 Beaming Pulse: ${file.name} (${totalChunks} chunks)`)

    // 1. Send Metadata
    peer.send(JSON.stringify({
      type: 'file-meta',
      fileID,
      name: file.name,
      size: file.size,
      mime: file.type,
      totalChunks
    }))

    // 2. Send Chunks with Throttling (for smooth UI and buffer safety)
    for (let i = 0; i < totalChunks; i++) {
      const start = i * CHUNK_SIZE
      const end = start + CHUNK_SIZE
      const chunk = arrayBuffer.slice(start, end)
      
      peer.send(JSON.stringify({
        type: 'file-chunk',
        fileID,
        index: i,
        totalChunks,
        mime: file.type,
        data: Array.from(new Uint8Array(chunk))
      }))

      // Update UI Progress
      if (onProgress) onProgress(((i + 1) / totalChunks) * 100)

      // Add architectural delay every 10 chunks to simulate "Beaming" and prevent congestion
      if (i % 10 === 0) {
        await new Promise(resolve => setTimeout(resolve, 5))
      }
    }
  }

  /**
   * Reassemble incoming chunks into a Blob for the UI to consume
   */
  static reassembleToBlob(chunks, fileMime) {
    const sortedChunks = chunks.sort((a, b) => a.index - b.index)
    const dataParts = sortedChunks.map(c => new Uint8Array(c.data))
    return new Blob(dataParts, { type: fileMime })
  }

  /**
   * Helper to trigger actual browser download from a Blob
   */
  static downloadBlob(blob, fileName) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }
}
