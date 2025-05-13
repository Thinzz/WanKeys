import {
  Download,
  FileText,
  Music,
  Ticket,
  Wrench,
  ImageIcon,
  FileVideo,
  FileAudio,
  FileCog,
  FileImage,
  FileCode,
  FileArchive,
  FileSpreadsheet,
  Calendar,
  QrCode,
  Scissors,
  Crop,
  Palette,
  Printer,
  BarChart,
  Layers,
  Scan,
  Smartphone,
} from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ToolCard } from "@/components/tool-card"
import { ToolCarousel } from "@/components/tool-carousel"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b sticky top-0 bg-white/80 backdrop-blur-sm z-10">
        <div className="container mx-auto py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-gray-700" />
              <h1 className="text-xl font-medium text-gray-800">WanKeys</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="#download" className="text-sm text-gray-600 hover:text-gray-900">
                Download
              </Link>
              <Link href="#convert" className="text-sm text-gray-600 hover:text-gray-900">
                Convert
              </Link>
              <Link href="#edit" className="text-sm text-gray-600 hover:text-gray-900">
                Edit
              </Link>
              <Link href="#create" className="text-sm text-gray-600 hover:text-gray-900">
                Create
              </Link>
              <Link href="#more" className="text-sm text-gray-600 hover:text-gray-900">
                More
              </Link>
            </nav>
            <Button variant="ghost" size="sm" className="hidden md:flex">
              Sign In
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <section className="text-center mb-10">
          <h1 className="text-3xl font-medium text-gray-900 mb-2">All-in-One Web Utilities</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Free browser-based tools to download, convert, and manage your digital content securely.
          </p>
        </section>

        <div className="space-y-12">
          <section id="download">
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <Download className="h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-medium text-gray-800">Download Center</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Easily extract content from web pages and save them in useful formats.
            </p>

            <ToolCarousel>
              <ToolCard
                title="Audio Downloader"
                description="Extract MP3 files from web"
                details="Download audio files directly from supported websites with just a URL."
                icon={FileAudio}
                href="/tools/audio-downloader"
              />

              <ToolCard
                title="Web to PDF"
                description="Save web pages as PDFs"
                details="Convert any article or web page to a clean, ad-free PDF document."
                icon={FileText}
                href="/tools/web-to-pdf"
              />

              <ToolCard
                title="Video Downloader"
                description="Save videos from websites"
                details="Download videos from supported platforms in various quality options."
                icon={FileVideo}
                href="/tools/video-downloader"
              />

              <ToolCard
                title="Bulk Image Downloader"
                description="Download multiple images at once"
                details="Extract and download all images from a website with filtering options."
                icon={ImageIcon}
                comingSoon
              />

              <ToolCard
                title="Website Archiver"
                description="Save entire websites offline"
                details="Archive complete websites for offline viewing and reference."
                icon={FileArchive}
                comingSoon
              />

              <ToolCard
                title="Social Media Downloader"
                description="Save content from social platforms"
                details="Download photos, videos, and stories from popular social media sites."
                icon={Smartphone}
                comingSoon
              />
            </ToolCarousel>
          </section>

          <section id="convert">
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <FileCog className="h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-medium text-gray-800">File Conversion</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Convert files between different formats with ease and precision.
            </p>

            <ToolCarousel>
              <ToolCard
                title="Youtube to mp3"
                description="Convert youtube to mp3"
                details="Convert youtube links to mp3 files"
                icon={Music}
                href=""
              />

              <ToolCard
                title="PDF Converter"
                description="Convert to/from PDF"
                details="Convert documents to PDF or extract content from PDFs to other formats."
                icon={FileText}
                href="/tools/pdf-converter"
              />

              <ToolCard
                title="Image Converter"
                description="Convert between image formats"
                details="Convert images between JPG, PNG, WebP, SVG and other formats."
                icon={FileImage}
                href="/tools/image-converter"
              />

              <ToolCard
                title="Audio Converter"
                description="Convert audio file formats"
                details="Convert between MP3, WAV, FLAC, and other audio formats."
                icon={Music}
                href="/tools/audio-converter"
              />

              <ToolCard
                title="Video Converter"
                description="Convert video formats"
                details="Convert videos between MP4, AVI, MOV, and other formats."
                icon={FileVideo}
                comingSoon
              />

              <ToolCard
                title="Document Converter"
                description="Convert document formats"
                details="Convert between DOCX, PDF, TXT, RTF and other document formats."
                icon={FileCode}
                comingSoon
              />

              <ToolCard
                title="Spreadsheet Converter"
                description="Convert spreadsheet formats"
                details="Convert between XLSX, CSV, ODS and other spreadsheet formats."
                icon={FileSpreadsheet}
                comingSoon
              />
            </ToolCarousel>
          </section>

          <section id="edit">
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <Scissors className="h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-medium text-gray-800">Edit & Modify</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Edit and modify your files directly in your browser without installing software.
            </p>

            <ToolCarousel>
              <ToolCard
                title="PDF Editor"
                description="Edit PDF content and structure"
                details="Add, remove, or edit text and images in PDF files."
                icon={FileText}
                href="/tools/pdf-editor"
              />

              <ToolCard
                title="Image Editor"
                description="Basic image editing tools"
                details="Crop, resize, rotate, and apply filters to images."
                icon={Crop}
                href="/tools/image-editor"
              />

              <ToolCard
                title="Audio Trimmer"
                description="Cut and trim audio files"
                details="Trim or split MP3 and other audio files without quality loss."
                icon={Music}
                comingSoon
              />

              <ToolCard
                title="Video Trimmer"
                description="Cut and trim video files"
                details="Trim videos to extract specific sections without quality loss."
                icon={FileVideo}
                comingSoon
              />

              <ToolCard
                title="Color Picker"
                description="Extract colors from images"
                details="Get color codes and create palettes from uploaded images."
                icon={Palette}
                comingSoon
              />

              <ToolCard
                title="Text Editor"
                description="Edit and format text"
                details="Clean up, format, and modify text with various tools."
                icon={FileCode}
                comingSoon
              />
            </ToolCarousel>
          </section>

          <section id="create">
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <Layers className="h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-medium text-gray-800">Create & Generate</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">Create new files and generate content for various purposes.</p>

            <ToolCarousel>
              <ToolCard
                title="QR Code Generator"
                description="Create custom QR codes"
                details="Generate QR codes for URLs, text, contact info, and more."
                icon={QrCode}
                href="/tools/qr-generator"
              />

              <ToolCard
                title="PDF Creator"
                description="Create PDF documents"
                details="Create PDF documents from scratch with text, images, and more."
                icon={FileText}
                href="/tools/pdf-creator"
              />

              <ToolCard
                title="Calendar Generator"
                description="Create printable calendars"
                details="Generate customizable calendars for any month and year."
                icon={Calendar}
                comingSoon
              />

              <ToolCard
                title="Chart Generator"
                description="Create charts and graphs"
                details="Generate visual charts from data for presentations and reports."
                icon={BarChart}
                comingSoon
              />

              <ToolCard
                title="Invoice Generator"
                description="Create professional invoices"
                details="Generate customizable invoices for your business needs."
                icon={FileText}
                comingSoon
              />

              <ToolCard
                title="Certificate Creator"
                description="Design custom certificates"
                details="Create professional certificates for awards, completion, and more."
                icon={FileText}
                comingSoon
              />
            </ToolCarousel>
          </section>

          <section id="ticket">
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <Ticket className="h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-medium text-gray-800">Ticket Assistant</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Quickly save ticket information for offline access or printing.
            </p>

            <ToolCarousel>
              <ToolCard
                title="Ticket to PDF"
                description="Convert digital tickets to PDF"
                details="Save your e-tickets as PDF files for easy printing or offline access."
                icon={Printer}
                href="/tools/ticket-to-pdf"
              />

              <ToolCard
                title="Ticket Screenshot"
                description="Auto-screenshot ticket pages"
                details="Capture full-page screenshots of your ticket confirmations automatically."
                icon={ImageIcon}
                href="/tools/ticket-screenshot"
              />

              <ToolCard
                title="Ticket Data Export"
                description="Export ticket information"
                details="Extract and save important ticket information in various formats."
                icon={FileSpreadsheet}
                comingSoon
              />

              <ToolCard
                title="Ticket QR Scanner"
                description="Scan and save ticket QR codes"
                details="Scan QR codes from tickets and save the information securely."
                icon={Scan}
                comingSoon
              />
            </ToolCarousel>
          </section>

          <section id="more">
            <div className="flex items-center gap-2 mb-4 border-b pb-2">
              <Wrench className="h-5 w-5 text-gray-700" />
              <h2 className="text-lg font-medium text-gray-800">More Utilities</h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">Additional tools to help with various digital tasks.</p>

            <ToolCarousel>
              <ToolCard
                title="OCR Tool"
                description="Extract text from images"
                details="Convert text in images to editable text with advanced OCR technology."
                icon={Scan}
                comingSoon
              />

              <ToolCard
                title="Website Screenshot"
                description="Capture full-page screenshots"
                details="Take complete screenshots of any website with one click."
                icon={ImageIcon}
                comingSoon
              />

              <ToolCard
                title="File Compressor"
                description="Compress files for sharing"
                details="Reduce file sizes for easier sharing and storage."
                icon={FileArchive}
                comingSoon
              />

              <ToolCard
                title="Password Generator"
                description="Create secure passwords"
                details="Generate strong, random passwords for better security."
                icon={FileCog}
                comingSoon
              />

              <ToolCard
                title="Text Case Converter"
                description="Convert text case"
                details="Convert text between uppercase, lowercase, title case, and more."
                icon={FileCode}
                comingSoon
              />

              <ToolCard
                title="Metadata Viewer"
                description="View file metadata"
                details="Examine and extract metadata from various file types."
                icon={FileCog}
                comingSoon
              />
            </ToolCarousel>
          </section>
        </div>
      </main>

      <footer className="bg-gray-50 py-6 border-t mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-medium text-gray-800 mb-2 text-sm">UtilityHub</h3>
              <p className="text-xs text-gray-600">Free browser-based tools for all your digital content needs.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2 text-sm">Tool Categories</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link href="#download" className="text-gray-600 hover:text-gray-900">
                    Download Center
                  </Link>
                </li>
                <li>
                  <Link href="#convert" className="text-gray-600 hover:text-gray-900">
                    File Conversion
                  </Link>
                </li>
                <li>
                  <Link href="#edit" className="text-gray-600 hover:text-gray-900">
                    Edit & Modify
                  </Link>
                </li>
                <li>
                  <Link href="#create" className="text-gray-600 hover:text-gray-900">
                    Create & Generate
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2 text-sm">Company</h4>
              <ul className="space-y-1 text-xs">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-2 text-sm">Stay Updated</h4>
              <p className="text-xs text-gray-600 mb-2">Subscribe to get notified about new tools and features.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="px-2 py-1 border rounded-md text-xs flex-1" />
                <Button size="sm" variant="outline" className="text-xs h-7">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200 text-center text-xs text-gray-600">
            <p>© {new Date().getFullYear()} WanKeys. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
