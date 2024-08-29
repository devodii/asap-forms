"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

const Root = AccordionPrimitive.Root

export interface ItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

const Item = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Item>, ItemProps>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
  ),
)
Item.displayName = "AccordionItem"

export interface TriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {}

const Trigger = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Trigger>, TriggerProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
)
Trigger.displayName = AccordionPrimitive.Trigger.displayName

export interface ContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {}

const Content = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Content>, ContentProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  ),
)

Content.displayName = AccordionPrimitive.Content.displayName

export { Root, Item, Trigger, Content }
