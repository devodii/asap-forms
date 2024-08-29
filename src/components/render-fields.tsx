"use client"

import { fieldsAtom } from "@/atoms/fields-atom"
import { FieldCard } from "@/components/field-card"
import { Option, pipe } from "effect"
import { useAtomValue } from "jotai"

interface Props {
  isEditable: boolean
}

export const RenderFields = ({ isEditable }: Props) => {
  const fields = pipe(useAtomValue(fieldsAtom), Option.getOrThrow)

  return (
    <>
      {fields.map((it) => (
        <FieldCard key={it.title} item={it} displayActions isEditable={isEditable} />
      ))}
    </>
  )
}
