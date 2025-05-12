"use client"

import { useState } from "react"
import { ArrowLeft, FileText, Check, X, FileDown } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileDropzone } from "@/components/file-dropzone"
import { useToast } from "@/hooks/use-toast"

const OUTPUT_FORMATS = [
  { value: "docx", label: "Word (DOCX)", description: "Editable document" },
  { value: "txt", label: "Text (TXT)", description: "Plain text only" },
  { value: "html", label: "HTML", description: "Web page format" },
  { value: "jpg", label: "Images (JPG)", description: "One image per page" },
]

const INPUT_FORMATS = [
  { value: "docx", label: "Word (DOCX)", description: "Microsoft Word document" },
  { value: "txt", label: "Text (TXT)", description: "Plain text file" },
  { value: "html", label: "HTML", description: "Web page file" },
  { value: "jpg", label: "Images", description: "JPG, PNG, etc." },
]

export default function PdfConverterPage() {
  const [files, setFiles] = useState<File[]>([])
  const [targetFormat, setTargetFormat] = useState("docx")
  const [isConverting, setIsConverting] = useState(false)
  const [convertedFiles, setConvertedFiles] = useState<string[]>([])
  const [conversionMode, setConversionMode] = useState<"to-pdf" | "from-pdf">("to-pdf")
  const { toast } = useToast()

  const handleFilesAdded = (newFiles: File[]) => {
    const validFiles = newFiles.filter((file) => {
      if (conversionMode === "to-pdf") {
        // Accept documents, images, etc.
        return !file.type.includes("pdf")
      } else {
        // Only accept PDFs
        return file.type.includes("pdf")
      }
    })

    if (validFiles.length === 0) {
      toast({
        title: "Invalid Files",
        description:
          conversionMode === "to-pdf"
            ? "Please upload non-PDF files to convert to PDF"
            : "Please upload PDF files to convert from PDF",
        variant: "destructive",
      })
      return
    }

    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Some files were skipped",
        description:
          conversionMode === "to-pdf"
            ? "PDF files were skipped. Use 'From PDF' tab to convert PDFs."
            : "Non-PDF files were skipped. Use 'To PDF' tab to convert to PDF.",
      })
    }

    setFiles((prev) => [...prev, ...validFiles])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleConvert = () => {
    if (files.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please upload at least one file to convert",
        variant: "destructive",
      })
      return
    }

    setIsConverting(true)

    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false)
      if (conversionMode === "to-pdf") {
        setConvertedFiles(files.map((file) => file.name.split(".")[0] + ".pdf"))
      } else {
        setConvertedFiles(files.map((file) => file.name.split(".")[0] + "." + targetFormat))
      }
      toast({
        title: "Conversion Complete",
        description: `${files.length} ${files.length === 1 ? "file" : "files"} converted successfully`,
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
      description: `Downloading all converted files as ZIP`,
    })
    // In a real implementation, this would trigger the download of all files as a ZIP
  }

  const handleReset = () => {
    setFiles([])
    setConvertedFiles([])
  }

  const handleTabChange = (value: string) => {
    setConversionMode(value as "to-pdf" | "from-pdf")
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
        <FileText className="h-5 w-5 text-gray-700" />
        <h1 className="text-xl font-medium text-gray-800">PDF Converter</h1>
      </div>

      <p className="text-sm text-gray-600 mb-6">Convert files to and from PDF format with ease.</p>

      <div className="max-w-3xl mx-auto">
        <Tabs defaultValue="to-pdf" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="to-pdf" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>To PDF</span>
            </TabsTrigger>
            <TabsTrigger value="from-pdf" className="flex items-center gap-2">
              <FileDown className="h-4 w-4" />
              <span>From PDF</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="to-pdf">
            {convertedFiles.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <Label className="mb-2 block">Upload Files to Convert to PDF</Label>
                      <FileDropzone
                        onFilesAdded={handleFilesAdded}
                        label="Click to upload files"
                        sublabel="or drag and drop"
                      />

                      {files.length > 0 && (
                        <div className="mt-4">
                          <h3 className="text-sm font-medium mb-2">Selected Files ({files.length})</h3>
                          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                            {files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                                  <span className="text-xs truncate max-w-[200px]">{file.name}</span>
                                  <span className="text-xs text-gray-500 ml-2">
                                    ({(file.size / 1024).toFixed(1)} KB)
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => removeFile(index)}
                                >
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
                      <Label>PDF Options</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="merge" className="rounded border-gray-300" />
                          <label htmlFor="merge" className="text-sm">
                            Merge into single PDF
                          </label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="compress" className="rounded border-gray-300" defaultChecked />
                          <label htmlFor="compress" className="text-sm">
                            Optimize file size
                          </label>
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleConvert} disabled={isConverting || files.length === 0} className="w-full">
                      {isConverting ? "Converting..." : "Convert to PDF"}
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
                        {convertedFiles.length} {convertedFiles.length === 1 ? "file" : "files"} converted to PDF
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
                        Convert More Files
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="from-pdf">
            {convertedFiles.length === 0 ? (
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    <div>
                      <Label className="mb-2 block">Upload PDF Files to Convert</Label>
                      <FileDropzone
                        accept=".pdf,application/pdf"
                        onFilesAdded={handleFilesAdded}
                        label="Click to upload PDF files"
                        sublabel="or drag and drop"
                      />

                      {files.length > 0 && (
                        <div className="mt-4">
                          <h3 className="text-sm font-medium mb-2">Selected Files ({files.length})</h3>
                          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                            {files.map((file, index) => (
                              <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                                <div className="flex items-center">
                                  <FileText className="h-4 w-4 text-gray-500 mr-2" />
                                  <span className="text-xs truncate max-w-[200px]">{file.name}</span>
                                  <span className="text-xs text-gray-500 ml-2">
                                    ({(file.size / 1024).toFixed(1)} KB)
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                  onClick={() => removeFile(index)}
                                >
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
                      <RadioGroup
                        value={targetFormat}
                        onValueChange={setTargetFormat}
                        className="grid grid-cols-2 gap-4"
                      >
                        {OUTPUT_FORMATS.map((format) => (
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

                    <Button onClick={handleConvert} disabled={isConverting || files.length === 0} className="w-full">
                      {isConverting ? "Converting..." : "Convert from PDF"}
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
                        {convertedFiles.length} {convertedFiles.length === 1 ? "file" : "files"} converted from PDF
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
                        Convert More Files
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Supported Formats</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Convert to PDF</h3>
              <div className="grid grid-cols-2 gap-2">
                {INPUT_FORMATS.map((format) => (
                  <div key={format.value} className="border rounded-lg p-2 text-center">
                    <p className="text-sm">{format.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Convert from PDF</h3>
              <div className="grid grid-cols-2 gap-2">
                {OUTPUT_FORMATS.map((format) => (
                  <div key={format.value} className="border rounded-lg p-2 text-center">
                    <p className="text-sm">{format.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Batch Conversion</h3>
              <p className="text-xs text-gray-600">
                Convert multiple files at once to save time. Upload up to 20 files in a single batch.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Bidirectional Conversion</h3>
              <p className="text-xs text-gray-600">
                Convert files to PDF or extract content from PDFs to other formats.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">Privacy First</h3>
              <p className="text-xs text-gray-600">
                All processing happens in your browser. Your files are never uploaded to our servers.
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2">High Quality Conversion</h3>
              <p className="text-xs text-gray-600">
                Our conversion engine preserves formatting, images, and layout for accurate results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
