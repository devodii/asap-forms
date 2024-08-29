"use client"

import { createSubmission } from "@/actions/form"
import { Form } from "@/schema"
import { useFormState } from "react-dom"
import { toast } from "sonner"
import { FieldCard } from "./field-card"
import { SubmitButton } from "./submit-button"
import { Wrapper } from "./wrapper"

interface Props {
  id: string
  form: Form
}

export const ViewForm = ({ id, form }: Props) => {
  const submitHandler = async (formdata: FormData) => {
    try {
      const entries = Object.fromEntries(formdata.entries()) as Record<string, string>

      await createSubmission(id, entries)
      toast.success("submission created")
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  const [, formAction] = useFormState((_: unknown, formdata: FormData) => submitHandler(formdata), null)

  return (
    <Wrapper>
      <div className="container flex flex-col gap-6">
        <h4 className="text-center text-2xl font-semibold">{form.title}</h4>
        <p className="text-md -mt-4 text-center text-gray-800">{form.description}</p>

        <div className="mt-8">
          {form.details.fields?.length >= 1 && (
            <form action={formAction} className="grid w-full grid-cols-1 gap-4">
              {form.details.fields.map((it) => (
                <FieldCard key={it.title} item={{ ...it, name: it.title }} displayActions={false} isEditable={false} />
              ))}

              <SubmitButton text="Submit" />
            </form>
          )}
        </div>
      </div>
    </Wrapper>
  )
}
