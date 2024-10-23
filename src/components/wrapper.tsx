import { cn } from "@/lib/utils"
import { ComponentPropsWithRef } from "react"

interface Props extends ComponentPropsWithRef<"div"> {}

export const Wrapper = ({ className, ...rest }: Props) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center h-screen w-screen flex-col gap-6 bg-gray-50 p-6 md:p-12",
        className,
      )}
      {...rest}
    />
  )
}
