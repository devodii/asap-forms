"use client"

import { FormInput, Home } from "lucide-react"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Forms",
    url: "/dashboard/editor",
    icon: FormInput,
  },
]

export function AppSidebar() {
  const segment = useSelectedLayoutSegment() as string

  return (
    <div className="fixed left-0 flex h-screen w-[12rem] flex-col gap-4 border-r px-2 pt-6">
      <Label>Features</Label>

      <ul className="grid grid-cols-1 gap-2">
        {items.map((el) => (
          <li key={el.url} className="w-full">
            <Button
              className={cn(
                "flex w-full items-center justify-start gap-2",
                el.url.includes(segment) ? "bg-[240_4.8%_95_9%]" : "",
              )}
              variant="outline"
              asChild
            >
              <Link href={el.url}>
                <el.icon className="text-md text-gray-700" size={20} />
                <span>{el.title}</span>
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
