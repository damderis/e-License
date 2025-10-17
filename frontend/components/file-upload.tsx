"use client"

import type React from "react"

import { useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileUploadProps {
  onUploadComplete: (url: string) => void
  currentFile?: string
}

export function FileUpload({ onUploadComplete, currentFile }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [preview, setPreview] = useState<string | null>(currentFile || null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size must be less than 5MB",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    setProgress(0)

    const storageRef = ref(storage, `applications/${Date.now()}_${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      (error) => {
        console.error("[v0] Upload error:", error)
        toast({
          title: "Error",
          description: "Failed to upload file",
          variant: "destructive",
        })
        setUploading(false)
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        setPreview(downloadURL)
        onUploadComplete(downloadURL)
        setUploading(false)
        toast({
          title: "Success",
          description: "File uploaded successfully",
        })
      },
    )
  }

  const handleRemove = () => {
    setPreview(null)
    onUploadComplete("")
  }

  return (
    <div className="space-y-4">
      {!preview ? (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mb-4">Upload an image of your place of operation</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button type="button" variant="outline" disabled={uploading} asChild>
              <span>{uploading ? "Uploading..." : "Choose File"}</span>
            </Button>
          </label>
        </div>
      ) : (
        <div className="relative border rounded-lg p-4">
          <div className="flex items-center gap-4">
            <img src={preview || "/placeholder.svg"} alt="Preview" className="h-20 w-20 object-cover rounded" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Image uploaded</p>
              <p className="text-xs text-muted-foreground">Click remove to change</p>
            </div>
            <Button type="button" variant="ghost" size="icon" onClick={handleRemove}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-xs text-muted-foreground text-center">{Math.round(progress)}% uploaded</p>
        </div>
      )}
    </div>
  )
}
