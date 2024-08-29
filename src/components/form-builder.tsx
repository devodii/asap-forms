"use client"

import { updateForm } from "@/actions/form"
import { descriptionAtom, fieldsAtom, titleAtom } from "@/atoms/fields-atom"
import { ActionsPanel } from "@/components/actions-panel"
import { FieldsCard } from "@/components/fields-card"
import { RenderFields } from "@/components/render-fields"
import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import { Form } from "@/schema"
import { Option, pipe } from "effect"
import { useAtomValue, useSetAtom } from "jotai"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Props {
  id: string
  metadata: Form
}

export const FormBuilder = ({ id, metadata }: Props) => {
  const title = pipe(useAtomValue(titleAtom), Option.getOrThrow)
  const setTitle = useSetAtom(titleAtom)

  const description = pipe(useAtomValue(descriptionAtom), Option.getOrNull)
  const setDescription = useSetAtom(descriptionAtom)

  const fields = pipe(useAtomValue(fieldsAtom), Option.getOrThrow)
  const setFields = useSetAtom(fieldsAtom)

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    setTitle(Option.some(metadata.title))
    setDescription(Option.some(metadata.description))
    setFields(Option.some(metadata.details.fields))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metadata, id])

  const submitHandler = async () => {
    try {
      setSubmitting(true)

      if (submitting) return

      await updateForm(id, { title, description, details: { fields } })
      toast.success("form successfully updated")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="container flex w-full max-w-7xl gap-6">
      <div className="flex flex-1 flex-grow flex-col gap-4">
        <div className="flex w-full justify-end">
          <Button type="submit" className="flex items-center gap-1" onClick={submitHandler}>
            {submitting && <Spinner size={20} className="mr-2" />}
            <span>Save form</span>
          </Button>
        </div>

        <FieldsCard
          items={[
            {
              title: "Title",
              type: "text",
              id: "title",
              required: true,
              className: "text-md",
              value: title,
              onChange: (e) => setTitle(Option.some(e.target.value)),
            },
            {
              title: "Description",
              type: "text",
              id: "description",
              placeholder: "Form description 🦄️",
              value: description ?? "",
              onChange: (e) => setDescription(Option.some(e.target.value)),
            },
          ]}
        />
        <RenderFields isEditable />
      </div>
      <ActionsPanel />
    </div>
  )
}
