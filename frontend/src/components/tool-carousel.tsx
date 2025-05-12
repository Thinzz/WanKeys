"use client"

import type React from "react"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ToolCarouselProps {
  children: React.ReactNode
  title?: string
  description?: string
}

export function ToolCarousel({ children, title, description }: ToolCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10) // 10px buffer
    }
  }

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" })
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      {title && (
        <div className="mb-4">
          <h3 className="text-base font-medium text-gray-800">{title}</h3>
          {description && <p className="text-xs text-gray-600 mt-1">{description}</p>}
        </div>
      )}

      <div className="relative group">
        {showLeftArrow && (
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 h-8 w-8 rounded-full bg-white shadow-md border opacity-90 hover:opacity-100"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Scroll left</span>
          </Button>
        )}

        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x"
          onScroll={handleScroll}
        >
          {children}
        </div>

        {showRightArrow && (
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 h-8 w-8 rounded-full bg-white shadow-md border opacity-90 hover:opacity-100"
            onClick={scrollRight}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Scroll right</span>
          </Button>
        )}
      </div>
    </div>
  )
}
