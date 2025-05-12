"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"

interface FileDropzoneProps {
  accept?: string
  maxSize?: number
  onFilesAdded: (files: File[]) => void
  label?: string
  sublabel?: string
  className?: string
}

export function FileDropzone({
  accept = "*",
  maxSize = 10485760, // 10MB default
  onFilesAdded,
  label = "Click to upload",
  sublabel = "or drag and drop",
  className = "",
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const validFiles = Array.from(e.dataTransfer.files).filter((file) => {
        // Check file size
        if (file.size > maxSize) {
          console.warn(`File ${file.name} exceeds the maximum size limit`)
          return false
        }

        // Check file type if accept is specified
        if (accept !== "*") {
          const acceptTypes = accept.split(",").map((type) => type.trim())
          const fileType = file.type
          const fileExtension = `.${file.name.split(".").pop()}`

          const isValidType = acceptTypes.some((type) => {
            if (type.startsWith(".")) {
              // Extension check
              return fileExtension.toLowerCase() === type.toLowerCase()
            } else if (type.includes("*")) {
              // Wildcard check (e.g., "image/*")
              const [category] = type.split("/")
              return fileType.startsWith(`${category}/`)
            } else {
              // Exact match
              return fileType === type
            }
          })

          if (!isValidType) {
            console.warn(`File ${file.name} is not an accepted file type`)
            return false
          }
        }

        return true
      })

      onFilesAdded(validFiles)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const validFiles = Array.from(e.target.files).filter((file) => file.size <= maxSize)
      onFilesAdded(validFiles)
    }
  }

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
        isDragging ? "border-gray-400 bg-gray-50" : "border-gray-200"
      } ${className}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input type="file" ref={fileInputRef} onChange={handleFileInputChange} accept={accept} className="hidden" />
      <div className="flex flex-col items-center justify-center">
        <Upload className="h-8 w-8 text-gray-400 mb-2" />
        <span className="text-sm font-medium text-gray-700 mb-1">{label}</span>
        <span className="text-xs text-gray-500">{sublabel}</span>
      </div>
    </div>
  )
}
