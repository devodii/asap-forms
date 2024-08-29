import * as Dialog from "@/components/ui/dialog"
import { splitProps } from "@/lib/split-props"
import { MixinProps } from "@/types"
import { ComponentProps, ReactNode } from "react"

interface Props
  extends ComponentProps<typeof Dialog.Root>,
    MixinProps<"trigger", Omit<ComponentProps<typeof Dialog.Trigger>, "children">>,
    MixinProps<"title", Dialog.TitleProps>,
    MixinProps<"description", Dialog.DescriptionProps> {
  content: ReactNode
  title: string
  description?: string
  trigger?: ReactNode
  customFooter: ReactNode
}

export const DialogMix = ({ content, trigger, title, description, customFooter, ...mixProps }: Props) => {
  const forwardedProps = splitProps(mixProps, "trigger", "title", "description")

  return (
    <Dialog.Root {...forwardedProps.rest}>
      {trigger && <Dialog.Trigger {...forwardedProps.trigger}>{trigger}</Dialog.Trigger>}

      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title {...forwardedProps.title}>{title}</Dialog.Title>
          <Dialog.Description {...forwardedProps.description}>{description}</Dialog.Description>
        </Dialog.Header>

        <>{content}</>

        <>{customFooter}</>
      </Dialog.Content>
    </Dialog.Root>
  )
}
