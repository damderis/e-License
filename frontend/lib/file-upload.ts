import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from './firebase'

export interface UploadProgress {
  progress: number
  completed: boolean
  url?: string
  error?: string
}

export async function uploadFileToStorage(
  file: File,
  path: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<string> {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        onProgress?.({
          progress,
          completed: false,
        })
      },
      (error) => {
        const errorMessage = `Failed to upload file: ${error.message}`
        onProgress?.({
          progress: 0,
          completed: false,
          error: errorMessage,
        })
        reject(new Error(errorMessage))
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          onProgress?.({
            progress: 100,
            completed: true,
            url: downloadURL,
          })
          resolve(downloadURL)
        } catch (error) {
          const errorMessage = `Failed to get download URL: ${error}`
          onProgress?.({
            progress: 0,
            completed: false,
            error: errorMessage,
          })
          reject(new Error(errorMessage))
        }
      }
    )
  })
}

export async function uploadMultipleFiles(
  files: { file: File; path: string }[],
  onProgress?: (overallProgress: number, completedCount: number, totalCount: number) => void
): Promise<string[]> {
  const uploadPromises = files.map(async ({ file, path }, index) => {
    return uploadFileToStorage(file, path, (progress) => {
      // Calculate overall progress
      const completedFiles = progress.completed ? 1 : 0
      const currentFileProgress = progress.progress / 100
      const overallProgress = ((index + currentFileProgress) / files.length) * 100
      
      onProgress?.(overallProgress, completedFiles, files.length)
    })
  })

  return Promise.all(uploadPromises)
}
