"use client"

import { useState } from "react"
import { ArrowLeft, Download, Music } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function AudioDownloaderPage() {
  const [url, setUrl] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [audioInfo, setAudioInfo] = useState<{ title: string; duration: string } | null>(null)
  const { toast } = useToast()

  const handleExtract = async () => {
    if (!url) {
      toast({
        title: "URL Required",
        description: "Please enter a valid URL to extract audio from",
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

    setIsProcessing(true)

    // Simulate extraction process
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      setAudioInfo({
        title: "Sample Audio Track",
        duration: "3:45",
      })
      toast({
        title: "Extraction Complete",
        description: "Your audio has been extracted successfully",
      })
    }, 2500)
  }

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your audio file is being downloaded",
    })
    // In a real implementation, this would trigger the actual file download
  }

  const handleReset = () => {
    setUrl("")
    setIsComplete(false)
    setAudioInfo(null)
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
        <Music className="h-5 w-5 text-gray-700" />
        <h1 className="text-xl font-medium text-gray-800">Audio Downloader</h1>
      </div>

      <p className="text-sm text-gray-600 mb-6">Extract MP3 audio files from supported websites with just a URL.</p>

      <div className="max-w-3xl mx-auto">
        <Card>
          <CardContent className="pt-6">
            {!isComplete ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Website URL</Label>
                  <Input
                    id="url"
                    placeholder="https://example.com/audio-page"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    disabled={isProcessing}
                  />
                  <p className="text-xs text-gray-500">
                    Enter the URL of the webpage containing the audio you want to download
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Format Options</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="mp3" name="format" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="mp3" className="text-sm">
                        MP3
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="m4a" name="format" className="rounded border-gray-300" />
                      <label htmlFor="m4a" className="text-sm">
                        M4A
                      </label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Quality</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="high" name="quality" className="rounded border-gray-300" defaultChecked />
                      <label htmlFor="high" className="text-sm">
                        High
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="medium" name="quality" className="rounded border-gray-300" />
                      <label htmlFor="medium" className="text-sm">
                        Medium
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="radio" id="low" name="quality" className="rounded border-gray-300" />
                      <label htmlFor="low" className="text-sm">
                        Low
                      </label>
                    </div>
                  </div>
                </div>

                <Button onClick={handleExtract} disabled={isProcessing || !url} className="w-full">
                  {isProcessing ? "Extracting Audio..." : "Extract Audio"}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg border border-green-100 bg-green-50 p-4">
                  <h3 className="font-medium text-green-800 mb-1">Audio Extracted Successfully!</h3>
                  <p className="text-sm text-green-700">Your audio file is ready to download</p>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium text-sm">{audioInfo?.title}</h4>
                      <p className="text-xs text-gray-500">Duration: {audioInfo?.duration}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={handleDownload}>
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>

                <Button variant="outline" onClick={handleReset} className="w-full">
                  Extract Another Audio
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Supported Websites</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["YouTube", "SoundCloud", "Vimeo", "Facebook", "Twitter", "Instagram", "Dailymotion", "Twitch"].map(
              (site) => (
                <div key={site} className="border rounded-lg p-3 text-center">
                  <p className="text-sm">{site}</p>
                </div>
              ),
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Note: We only support extracting audio from publicly available content where permitted.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-800 mb-4">How to Use</h2>
          <ol className="space-y-3">
            <li className="flex gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-700 text-xs flex-shrink-0">
                1
              </div>
              <p className="text-sm text-gray-700">
                Copy the URL of the webpage containing the audio you want to download
              </p>
            </li>
            <li className="flex gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-700 text-xs flex-shrink-0">
                2
              </div>
              <p className="text-sm text-gray-700">Paste the URL in the input field above</p>
            </li>
            <li className="flex gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-700 text-xs flex-shrink-0">
                3
              </div>
              <p className="text-sm text-gray-700">Select your preferred format and quality options</p>
            </li>
            <li className="flex gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-700 text-xs flex-shrink-0">
                4
              </div>
              <p className="text-sm text-gray-700">Click "Extract Audio" and wait for the process to complete</p>
            </li>
            <li className="flex gap-3">
              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-100 text-gray-700 text-xs flex-shrink-0">
                5
              </div>
              <p className="text-sm text-gray-700">Download your audio file when ready</p>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
