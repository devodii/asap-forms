"use client"

import { DialogMix } from "@/components/mixins/dialog-mix"
import { Button } from "@/components/ui/button"
import { Close, Footer } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface Props {
  link: string
}

export function ShareForm({ link }: Props) {
  const [copy, setCopy] = useState(false)

  async function onCopy(url: string) {
    try {
      await navigator.clipboard.writeText(url)
      setCopy(true)
      toast.success("url successfully copied")
      setTimeout(() => setCopy(false), 2000)
    } catch (err) {
      toast.error("copy failed")
    }
  }

  const Icon = copy ? Check : Copy

  return (
    <DialogMix
      triggerAsChild
      trigger={<Button variant="outline">Share</Button>}
      title="Share link"
      description="Anyone who has this link will be able to create a submission"
      content={
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={link} readOnly />
          </div>
          <Button type="submit" size="sm" className="px-3" onClick={() => onCopy(link)}>
            <span className="sr-only">Copy</span>

            <Icon className="h-4 w-4" />
          </Button>
        </div>
      }
      customFooter={
        <Footer className="sm:justify-start">
          <Close asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </Close>
        </Footer>
      }
    />
  )
}
