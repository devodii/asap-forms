"use client"

import { Label, type LabelProps } from "@/components/ui/label"
import { Switch, type SwitchProps } from "@/components/ui/switch"
import { splitProps } from "@/lib/split-props"
import { cn } from "@/lib/utils"
import { MixinProps, OverrideProps } from "@/types"
import { ComponentPropsWithoutRef } from "react"

export interface Props
  extends OverrideProps<SwitchProps, { id: string }>,
    MixinProps<"container", Omit<ComponentPropsWithoutRef<"div">, "children">>,
    MixinProps<"label", Omit<LabelProps, "children" | "htmlFor">> {
  label: string
}

export const SwitchMix = ({ id, label, ...mixProps }: Props) => {
  const forwardedProps = splitProps(mixProps, "container", "label")

  const { className, ...containerProps } = forwardedProps.container

  return (
    <div {...containerProps} className={cn("flex w-full items-center gap-2", className)}>
      <Label {...forwardedProps.label} htmlFor={id}>
        {label}
      </Label>

      <Switch id={id} {...forwardedProps.rest} />
    </div>
  )
}
