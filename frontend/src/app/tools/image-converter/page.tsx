"use client"

import { useState } from "react"
import { ArrowLeft, FileImage, Check, X } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { FileDropzone } from "@/components/file-dropzone"
import { useToast } from "@/hooks/use-toast"

const IMAGE_FORMATS = [
  { value: "jpg", label: "JPG", description: "Best for photos" },
  { value: "png", label: "PNG", description: "Supports transparency" },
  { value: "webp", label: "WebP", description: "Modern, efficient format" },
  { value: "gif", label: "GIF", description: "For animations" },
]

export default function ImageConverterPage() {
  const [files, setFiles] = useState<File[]>([])
  const [targetFormat, setTargetFormat] = useState("jpg")
  const [quality, setQuality] = useState(80)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedFiles, setConvertedFiles] = useState<string[]>([])
  const { toast } = useToast()

  const handleFilesAdded = (newFiles: File[]) => {
    // Filter for image files
    const imageFiles = newFiles.filter((file) => file.type.startsWith("image/"))

    if (imageFiles.length === 0) {
      toast({
        title: "Invalid Files",
        description: "Please upload image files only",
        variant: "destructive",
      })
      return
    }

    if (imageFiles.length !== newFiles.length) {
      toast({
        title: "Some files were skipped",
        description: "Only image files are accepted",
      })
    }

    setFiles((prev) => [...prev, ...imageFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleConvert = () => {
    if (files.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please upload at least one image to convert",
        variant: "destructive",
      })
      return
    }

    setIsConverting(true)

    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false)
      setConvertedFiles(files.map((file) => file.name.split(".")[0] + "." + targetFormat))
      toast({
        title: "Conversion Complete",
        description: `${files.length} ${files.length === 1 ? "image" : "images"} converted successfully`,
      })
    }, 2000)
  }

  const handleDownload = (fileName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${fileName}`,
    })
    // In a real implementation, this would trigger the actual file download
  }

  const handleDownloadAll = () => {
    toast({
      title: "Download Started",
      description: `Downloading all converted images as ZIP`,
    })
    // In a real implementation, this would trigger the download of all files as a ZIP
  }

  const handleReset = () => {
    setFiles([])
    setConvertedFiles([])
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link href="/" className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <FileImage className="h-5 w-5 text-gray-700" />
        <h1 className="text-xl font-medium text-gray-800">Image Converter</h1>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Convert images between different formats with optional quality settings.
      </p>

      <div className="max-w-3xl mx-auto">
        {convertedFiles.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div>
                  <Label className="mb-2 block">Upload Images</Label>
                  <FileDropzone
                    accept="image/*"
                    onFilesAdded={handleFilesAdded}
                    label="Click to upload images"
                    sublabel="or drag and drop"
                  />

                  {files.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">Selected Files ({files.length})</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                            <div className="flex items-center">
                              <FileImage className="h-4 w-4 text-gray-500 mr-2" />
                              <span className="text-xs truncate max-w-[200px]">{file.name}</span>
                              <span className="text-xs text-gray-500 ml-2">({(file.size / 1024).toFixed(1)} KB)</span>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => removeFile(index)}>
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remove</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label>Target Format</Label>
                  <RadioGroup value={targetFormat} onValueChange={setTargetFormat} className="grid grid-cols-2 gap-4">
                    {IMAGE_FORMATS.map((format) => (
                      <div key={format.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={format.value} id={format.value} />
                        <Label htmlFor={format.value} className="flex flex-col">
                          <span>{format.label}</span>
                          <span className="text-xs text-gray-500">{format.description}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label>Quality: {quality}%</Label>
                  </div>
                  <Slider
                    value={[quality]}
                    min={10}
                    max={100}
                    step={5}
                    onValueChange={(value) => setQuality(value[0])}
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Lower quality, smaller file</span>
                    <span>Higher quality, larger file</span>
                  </div>
                </div>

                <Button onClick={handleConvert} disabled={isConverting || files.length === 0} className="w-full">
                  {isConverting ? "Converting..." : "Convert Images"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                  <h3 className="font-medium text-green-800 mb-1">Conversion Complete!</h3>
                  <p className="text-sm text-green-700">
                    {convertedFiles.length} {convertedFiles.length === 1 ? "image" : "images"} converted successfully
                  </p>
                </div>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {convertedFiles.map((fileName, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm truncate max-w-[200px]">{fileName}</span>
                      </div>
                      <Button variant="outline" size="sm" className="h-7" onClick={() => handleDownload(fileName)}>
                        Download
                      </Button>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  {convertedFiles.length > 1 && (
                    <Button onClick={handleDownloadAll} className="flex-1">
                      Download All (ZIP)
                    </Button>
                  )}
                  <Button variant="outline" onClick={handleReset} className="flex-1">
                    Convert More Images
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Supported Formats</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["JPG/JPEG", "PNG", "WebP", "GIF", "BMP", "TIFF", "SVG", "HEIC"].map((format) => (
              <div key={format} className="border rounded-lg p-3 text-center">
                <p className="text-sm">{format}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Batch Conversion</h3>
              <p className="text-xs text-gray-600">
                Convert multiple images at once to save time. Upload up to 20 images in a single batch.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Quality Control</h3>
              <p className="text-xs text-gray-600">
                Adjust the quality setting to balance between file size and image quality.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Privacy First</h3>
              <p className="text-xs text-gray-600">
                All processing happens in your browser. Your images are never uploaded to our servers.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Fast Processing</h3>
              <p className="text-xs text-gray-600">
                Our optimized conversion engine processes your images quickly and efficiently.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
