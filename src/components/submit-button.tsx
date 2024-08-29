"use client"

import { useFormStatus } from "react-dom"
import { Button, ButtonProps } from "./ui/button"
import { Spinner } from "./spinner"

interface Props extends Omit<ButtonProps, "type" | "children"> {
  text: string
}

export const SubmitButton = ({ className, text, ...forwardedProps }: Props) => {
  const { pending } = useFormStatus()

  return (
    <Button {...forwardedProps} type="submit" className="flex items-center gap-1">
      {pending && <Spinner size={20} className="mr-2" />}
      <span>{text}</span>
    </Button>
  )
}
