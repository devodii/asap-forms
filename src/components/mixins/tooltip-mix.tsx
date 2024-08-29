import * as Tooltip from "@/components/ui/tooltip"
import { splitProps } from "@/lib/split-props"
import { MixinProps } from "@/types"
import { ComponentPropsWithoutRef, ReactNode } from "react"

interface Props
  extends ComponentPropsWithoutRef<typeof Tooltip.Root>,
    MixinProps<"trigger", Omit<ComponentPropsWithoutRef<typeof Tooltip.Trigger>, "children">>,
    MixinProps<"content", Omit<Tooltip.ContentProps, "children">> {
  content: ReactNode
  trigger: ReactNode
}

export const TooltipMix = ({ content, trigger, ...mixProps }: Props) => {
  const forwardedProps = splitProps(mixProps, "content", "trigger")

  return (
    <Tooltip.Provider>
      <Tooltip.Root {...forwardedProps.rest}>
        <Tooltip.Trigger {...forwardedProps.trigger}>{trigger}</Tooltip.Trigger>
        <Tooltip.Content {...forwardedProps.content}>{content}</Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  )
}
