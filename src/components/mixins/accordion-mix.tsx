import * as AccordionPrimitive from "@/components/ui/accordion"
import { splitProps } from "@/lib/split-props"
import { MixinProps } from "@/types"
import { ReactNode } from "react"

interface AccordionItem {
  title: string
  content: ReactNode
}

interface Props
  extends MixinProps<"trigger", Omit<AccordionPrimitive.TriggerProps, "children">>,
    MixinProps<"item", Omit<AccordionPrimitive.ItemProps, "children">>,
    MixinProps<"content", Omit<AccordionPrimitive.ContentProps, "children">> {
  items: AccordionItem[]
}

export const AccordionMix = ({ items, ...mixProps }: Props) => {
  const forwardedProps = splitProps(mixProps, "trigger", "item", "content")

  return (
    <AccordionPrimitive.Root type="single" collapsible>
      {items.map(({ title, content }, idx) => (
        <AccordionPrimitive.Item {...forwardedProps.item} key={idx}>
          <AccordionPrimitive.Trigger {...forwardedProps.trigger}>{title}</AccordionPrimitive.Trigger>
          <AccordionPrimitive.Content {...forwardedProps.content}>{content}</AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}
