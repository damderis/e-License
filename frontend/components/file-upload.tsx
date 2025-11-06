"use client"

import React, { useState, useRef } from "react"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FileUploadProps {
  onFileSelect: (file: File | null) => void
  currentFile?: File | null
  onUploadComplete?: (url: string) => void // Optional for backward compatibility
}

export function FileUpload({ onFileSelect, currentFile, onUploadComplete }: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [preview, setPreview] = useState<string | null>(null)
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Create preview URL when file is selected
  React.useEffect(() => {
    if (currentFile) {
      const previewUrl = URL.createObjectURL(currentFile)
      setPreview(previewUrl)
      return () => URL.revokeObjectURL(previewUrl)
    } else {
      setPreview(null)
    }
  }, [currentFile])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/") && !file.type.includes("pdf")) {
      toast({
        title: "Ralat",
        description: "Sila muat naik gambar atau PDF file",
        variant: "destructive",
      })
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Ralat",
        description: "Fail saiz mesti kurang dari 10MB",
        variant: "destructive",
      })
      return
    }

    // Store file locally and notify parent
    onFileSelect(file)
    toast({
      title: "Fail Dipilih",
      description: "Fail dipilih berjaya dimuat naik.",
    })
  }

  const handleRemove = () => {
    setPreview(null)
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      {!preview ? (
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-sm text-muted-foreground mb-4">Muat naik gambar atau PDF lokasi operasi</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button type="button" variant="outline" disabled={uploading} asChild>
              <span>{uploading ? "Muat naik..." : "Pilih Fail"}</span>
            </Button>
          </label>
        </div>
      ) : (
        <div className="relative border rounded-lg p-4">
          <div className="flex items-center gap-4">
            {currentFile?.type.includes('pdf') ? (
              <div className="h-20 w-20 bg-red-100 flex items-center justify-center rounded">
                <span className="text-red-600 font-bold text-xs">PDF</span>
              </div>
            ) : (
              <img src={preview || "/placeholder.svg"} alt="Preview" className="h-20 w-20 object-cover rounded" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                {currentFile?.type.includes('pdf') ? 'Fail PDF' : 'Gambar'} dipilih
              </p>
              <p className="text-xs text-muted-foreground">Klik hapus untuk menukar</p>
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
          <p className="text-xs text-muted-foreground text-center">{Math.round(progress)}% dimuat naik</p>
        </div>
      )}
    </div>
  )
}
