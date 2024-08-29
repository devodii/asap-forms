import * as Select from "@/components/ui/select"
import { splitProps } from "@/lib/split-props"
import { MixinProps } from "@/types"
import { ComponentProps } from "react"

interface Props
  extends ComponentProps<typeof Select.Root>,
    MixinProps<"trigger", Omit<ComponentProps<typeof Select.Trigger>, "children">>,
    MixinProps<"value", ComponentProps<typeof Select.Value>>,
    MixinProps<"content", Omit<ComponentProps<typeof Select.Content>, "children">>,
    MixinProps<"item", Omit<ComponentProps<typeof Select.Content>, "children" | "value">> {
  trigger: string
  contents: { label: string; value: string }[]
}

export const SelectMix = ({ trigger, contents, ...mixProps }: Props) => {
  const forwardedProps = splitProps(mixProps, "trigger", "item", "value", "content")

  return (
    <Select.Root {...forwardedProps.rest}>
      <Select.Trigger {...forwardedProps.trigger}>
        <Select.Value {...forwardedProps.value} />
      </Select.Trigger>
      <Select.Content {...forwardedProps.content}>
        {contents.map(({ label, value }) => (
          <Select.Item {...forwardedProps.item} value={value} key={value}>
            {label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}
