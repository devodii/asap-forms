"use client"

import { fieldsAtom } from "@/atoms/fields-atom"
import { Option, pipe } from "effect"
import { useSetAtom } from "jotai"
import { nanoid } from "nanoid"
import { IoMdAdd } from "react-icons/io"
import { TooltipMix } from "./mixins/tooltip-mix"

export const ActionsPanel = () => {
  const setFields = useSetAtom(fieldsAtom)

  return (
    <ul className="flex h-36 w-max flex-col gap-4 rounded-md border p-2 shadow-md">
      <TooltipMix
        contentSideOffset={20}
        contentSide="right"
        content={<span>New field</span>}
        trigger={
          <li
            className="h-max rounded-full border p-2"
            onClick={() => {
              setFields((prev) =>
                Option.some([
                  ...pipe(prev, Option.getOrThrow),
                  { title: "Untitled Question", type: "text", id: `fi_${nanoid(5)}`, required: false },
                ]),
              )
            }}
          >
            <IoMdAdd className="text-xl" />
          </li>
        }
      />
    </ul>
  )
}
