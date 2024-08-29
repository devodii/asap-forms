import { cn } from "@/lib/utils"
import { ComponentPropsWithRef } from "react"

interface Props extends ComponentPropsWithRef<"div"> {}

export const Wrapper = ({ className, ...rest }: Props) => {
  return (
    <div
      className={cn(
        "ml-12 flex h-screen w-screen flex-col items-center justify-center gap-6 bg-background p-6 md:p-12",
        className,
      )}
      {...rest}
    />
  )
}
