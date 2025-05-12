import Link from "next/link"
import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ToolCardProps {
  title: string
  description: string
  details: string
  icon: LucideIcon
  href?: string
  comingSoon?: boolean
}

export function ToolCard({ title, description, details, icon: Icon, href, comingSoon }: ToolCardProps) {
  return (
    <Card className="shadow-sm hover:shadow transition-shadow min-w-[250px] max-w-[300px] snap-start">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-xs">{description}</CardDescription>
          </div>
          <Icon className="h-5 w-5 text-gray-500" />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-xs text-gray-500">{details}</p>
      </CardContent>
      <CardFooter>
        {comingSoon ? (
          <Button size="sm" className="w-full" disabled>
            Coming Soon
          </Button>
        ) : (
          <Link href={href || "#"} className="w-full">
            <Button size="sm" className="w-full">
              Try Now
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}
