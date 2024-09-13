"use client"

import * as React from "react"

import { joinWaitlist } from "@/app/action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ImSpinner8 } from "react-icons/im"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

export const Waitlist = () => {
  const [step, setStep] = React.useState<1 | 2>(1)
  const [isLoading, setIsLoading] = React.useState(false)

  if (step === 2) {
    return (
      <div className="mt-6 text-xl">
        Thank you for waiting, we’ll let you know when we have any updates ☕
      </div>
    )
  }

  return (
    <form
      className="flex w-full max-w-4xl flex-col gap-3"
      onSubmit={async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const formdata = new FormData(e.currentTarget)
        const { email, comment } = Object.fromEntries(formdata) as Record<
          string,
          string
        >

        await joinWaitlist({ email, comment })
          .then(() => setStep(2))
          .catch((err) => toast.error("an unexpected error occured"))
          .finally(() => setIsLoading(false))
      }}
    >
      <div>
        <Label>Email</Label>
        <Input
          className="mt-1 w-full focus-visible:ring-blue-400"
          name="email"
        />
      </div>

      <div>
        <Label>What feature would you like to see?</Label>
        <Textarea
          rows={5}
          className="mt-1 w-full focus-visible:ring-blue-400"
          name="comment"
        />
      </div>

      <Button variant="blueAlpha" className="w-full" type="submit">
        <span> Notify me</span>
        {isLoading && <ImSpinner8 className="text-md animate-spin" />}
      </Button>
    </form>
  )
}
