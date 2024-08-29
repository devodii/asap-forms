"use client"

import { createEmptyForm } from "@/actions/form"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "./spinner"

interface Props {
  text: string
}

export const CreateEmptyForm = ({ text }: Props) => {
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    try {
      setLoading(true)

      await createEmptyForm()
    } catch {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleCreate} className="flex items-center">
      {loading && <Spinner size={20} className="mr-2" />}
      <span>{text}</span>
    </Button>
  )
}
