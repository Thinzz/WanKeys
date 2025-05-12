"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, FileText, Globe, Upload } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function WebToPdfPage() {
  const [url, setUrl] = useState("")
  const [isConverting, setIsConverting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const { toast } = useToast()

  const handleConvert = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL to convert",
        variant: "destructive",
      })
      return
    }

    // Validate URL format
    try {
      new URL(url)
    } catch (e) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive",
      })
      return
    }

    setIsConverting(true)

    // Simulate conversion process
    setTimeout(() => {
      setIsConverting(false)
      setIsComplete(true)
      toast({
        title: "Conversion Complete",
        description: "Your PDF has been generated successfully",
      })
    }, 3000)
  }

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your PDF is being downloaded",
    })
    // In a real implementation, this would trigger the actual file download
  }

  const handleReset = () => {
    setUrl("")
    setIsComplete(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      toast({
        title: "File Received",
        description: "Your HTML file has been uploaded",
      })
      // In a real implementation, this would process the HTML file
      setIsConverting(true)
      setTimeout(() => {
        setIsConverting(false)
        setIsComplete(true)
      }, 2000)
    }
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
        <h1 className="text-xl font-medium text-gray-800">Web to PDF Converter</h1>
      </div>

      <p className="text-sm text-gray-600 mb-6">
        Convert any webpage to a clean, downloadable PDF document with just a URL.
      </p>

      <Tabs defaultValue="url" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="url" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>URL</span>
          </TabsTrigger>
          <TabsTrigger value="file" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>HTML File</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="url">
          <Card>
            <CardContent className="pt-6">
              {!isComplete ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">Website URL</Label>
                    <Input
                      id="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      disabled={isConverting}
                    />
                    <p className="text-xs text-gray-500">
                      Enter the full URL including https:// of the webpage you want to convert
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Options</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="remove-ads" className="rounded border-gray-300" />
                        <label htmlFor="remove-ads" className="text-sm">
                          Remove ads
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="include-images" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="include-images" className="text-sm">
                          Include images
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="print-background"
                          className="rounded border-gray-300"
                          defaultChecked
                        />
                        <label htmlFor="print-background" className="text-sm">
                          Print background
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="landscape" className="rounded border-gray-300" />
                        <label htmlFor="landscape" className="text-sm">
                          Landscape orientation
                        </label>
                      </div>
                    </div>
                  </div>

                  <Button onClick={handleConvert} disabled={isConverting || !url} className="w-full">
                    {isConverting ? "Converting..." : "Convert to PDF"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg border border-green-100 bg-green-50 p-4 text-center">
                    <h3 className="font-medium text-green-800 mb-1">Conversion Complete!</h3>
                    <p className="text-sm text-green-700">Your PDF has been generated successfully from {url}</p>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleDownload} className="flex-1">
                      Download PDF
                    </Button>
                    <Button variant="outline" onClick={handleReset} className="flex-1">
                      Convert Another
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="file">
          <Card>
            <CardContent className="pt-6">
              {!isComplete ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="html-file">Upload HTML File</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                      <input
                        type="file"
                        id="html-file"
                        accept=".html,.htm"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <label htmlFor="html-file" className="flex flex-col items-center justify-center cursor-pointer">
                        <Upload className="h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-sm font-medium text-gray-700 mb-1">Click to upload HTML file</span>
                        <span className="text-xs text-gray-500">or drag and drop here</span>
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      Upload an HTML file to convert it to PDF. Max file size: 10MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-lg border border-green-100 bg-green-50 p-4 text-center">
                    <h3 className="font-medium text-green-800 mb-1">Conversion Complete!</h3>
                    <p className="text-sm text-green-700">
                      Your PDF has been generated successfully from your HTML file
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleDownload} className="flex-1">
                      Download PDF
                    </Button>
                    <Button variant="outline" onClick={handleReset} className="flex-1">
                      Convert Another
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-lg font-medium text-gray-800 mb-4">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 mb-3">
              1
            </div>
            <h3 className="text-sm font-medium mb-2">Enter URL or Upload HTML</h3>
            <p className="text-xs text-gray-600">
              Provide the webpage URL you want to convert or upload your HTML file
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 mb-3">
              2
            </div>
            <h3 className="text-sm font-medium mb-2">Customize Options</h3>
            <p className="text-xs text-gray-600">Select your preferred settings for the PDF output</p>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-700 mb-3">
              3
            </div>
            <h3 className="text-sm font-medium mb-2">Download Your PDF</h3>
            <p className="text-xs text-gray-600">Get your converted PDF file instantly, ready to save or share</p>
          </div>
        </div>
      </div>

      <div className="mt-12 max-w-3xl mx-auto">
        <h2 className="text-lg font-medium text-gray-800 mb-4">FAQ</h2>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">Is there a limit to how many PDFs I can create?</h3>
            <p className="text-xs text-gray-600">
              No, you can convert as many webpages to PDF as you need. There are no daily or monthly limits.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">Are my files stored on your servers?</h3>
            <p className="text-xs text-gray-600">
              No, all conversions happen in your browser. We don't store your files or webpage content on our servers.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="text-sm font-medium mb-2">Can I convert password-protected websites?</h3>
            <p className="text-xs text-gray-600">
              Currently, our tool cannot access password-protected content. You'll need to convert publicly accessible
              pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
