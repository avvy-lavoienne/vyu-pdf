"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useDropzone } from "react-dropzone"
import { Upload, X, Loader2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

interface FileUploaderProps {
  endpoint: string
  allowMultiple?: boolean
  acceptedFileTypes?: Record<string, string[]>
  maxFiles?: number
  maxSize?: number
}

export function FileUploader({
  endpoint,
  allowMultiple = false,
  acceptedFileTypes = {
    "application/pdf": [".pdf"],
    "image/jpeg": [".jpg", ".jpeg"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
  },
  maxFiles = 10,
  maxSize = 50 * 1024 * 1024, // 50MB
}: FileUploaderProps) {
  const [files, setFiles] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()
  const router = useRouter()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!allowMultiple && acceptedFiles.length > 0) {
        setFiles([acceptedFiles[0]])
      } else {
        setFiles((prev) => [...prev, ...acceptedFiles])
      }
    },
    [allowMultiple],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles: allowMultiple ? maxFiles : 1,
    maxSize,
    onDropRejected: (rejections) => {
      if (rejections.some((r) => r.errors.some((e) => e.code === "file-too-large"))) {
        toast({
          title: "File too large",
          description: `Maximum file size is ${maxSize / (1024 * 1024)}MB`,
          variant: "destructive",
        })
      } else if (rejections.some((r) => r.errors.some((e) => e.code === "file-invalid-type"))) {
        toast({
          title: "Invalid file type",
          description: "Please upload files with the correct format",
          variant: "destructive",
        })
      } else if (rejections.some((r) => r.errors.some((e) => e.code === "too-many-files"))) {
        toast({
          title: "Too many files",
          description: `Maximum ${maxFiles} files allowed`,
          variant: "destructive",
        })
      }
    },
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append("files", file)
      })

      // Simulate progress for demo purposes
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 5
        })
      }, 300)

      // In a real implementation, you would use fetch with a proper API endpoint
      // const response = await fetch(`/api/${endpoint}`, {
      //   method: 'POST',
      //   body: formData,
      // })

      // Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 3000))

      clearInterval(progressInterval)
      setProgress(100)

      toast({
        title: "Files processed successfully",
        description: "Your files have been processed and are ready for download",
      })

      // Simulate redirect to results page
      setTimeout(() => {
        router.push("/dashboard/history")
      }, 1000)
    } catch (error) {
      toast({
        title: "Error processing files",
        description: "There was an error processing your files. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-teal-500 bg-teal-50" : "border-gray-300 hover:border-teal-500"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="text-lg font-medium">{isDragActive ? "Drop the files here" : "Drag & drop files here"}</p>
          <p className="text-sm text-gray-500">
            or <span className="text-teal-600 font-medium">browse files</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">
            {allowMultiple
              ? `Upload up to ${maxFiles} files (max ${maxSize / (1024 * 1024)}MB each)`
              : `Upload a single file (max ${maxSize / (1024 * 1024)}MB)`}
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <div className="text-sm font-medium">Selected Files ({files.length})</div>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
              >
                <div className="flex items-center space-x-2 truncate">
                  <FileText className="h-5 w-5 text-teal-600 flex-shrink-0" />
                  <span className="text-sm truncate">{file.name}</span>
                  <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeFile(index)} disabled={uploading}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setFiles([])} disabled={uploading || files.length === 0}>
              Clear All
            </Button>
            <Button onClick={handleUpload} disabled={uploading || files.length === 0}>
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Process Files"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
