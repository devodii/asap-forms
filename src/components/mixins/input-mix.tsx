"use client"

import { Input as InputPrimitive, InputProps } from "@/components/ui/input"
import { type LabelProps, Label } from "@/components/ui/label"
import { splitProps } from "@/lib/split-props"
import { cn } from "@/lib/utils"
import { MixinProps, OverrideProps } from "@/types"
import { ComponentPropsWithoutRef } from "react"

export interface Props
  extends OverrideProps<InputProps, { id: string }>,
    MixinProps<"container", Omit<ComponentPropsWithoutRef<"div">, "children">>,
    MixinProps<"title", Omit<LabelProps, "children" | "htmlFor">>,
    MixinProps<"description", Omit<ComponentPropsWithoutRef<"span">, "children">> {
  title: string
  description?: string
}

export const InputMix = ({ id, title, description, required, ...mixProps }: Props) => {
  const forwardedProps = splitProps(mixProps, "container", "description", "title")

  const { className, ...containerProps } = forwardedProps.container

  return (
    <div {...containerProps} className={cn("flex w-full flex-col items-start gap-2", className)}>
      <Label {...forwardedProps.title} htmlFor={id}>
        {title}
        {required && <span className="text-md ml-1 text-red-500">*</span>}
      </Label>

      <InputPrimitive id={id} required={required} {...forwardedProps.rest} />

      {description && <span className="-mt-1 text-sm text-secondary-foreground">{description}</span>}
    </div>
  )
}
