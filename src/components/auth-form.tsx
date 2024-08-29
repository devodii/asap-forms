"use client"

import { InputMix } from "@/components/mixins/input-mix"
import { SubmitButton } from "@/components/submit-button"
import { Wrapper } from "@/components/wrapper"
import { Error, makeErrorMessage } from "@/errors"
import { Effect, Either, String } from "effect"
import { ReactNode } from "react"
import { useFormState } from "react-dom"
import { toast } from "sonner"

interface Props<E> {
  action: (formdata: FormData) => Effect.Effect<void, E>
  title: string
  ctaText: string
  spoiler?: ReactNode
  fields: string[]
  onSuccess: () => void
}

const initialState = null

export const AuthForm = <E extends Error>({ action, onSuccess, title, ctaText, spoiler, fields }: Props<E>) => {
  const submitHandler = (formdata: FormData) =>
    Effect.gen(function* () {
      const either = yield* action(formdata).pipe(Effect.either)

      if (Either.isLeft(either)) return toast.error(makeErrorMessage(either.left._tag))

      onSuccess()
    }).pipe(Effect.runPromise)

  const [, formAction] = useFormState((_: unknown, formdata: FormData) => submitHandler(formdata), initialState)

  return (
    <Wrapper className="items-start">
      <h4 className="w-full text-center text-3xl font-medium">{title}</h4>
      <form action={formAction} className="container mx-auto flex max-w-4xl flex-col gap-4">
        {fields.map((it) => (
          <InputMix name={it} title={String.capitalize(it)} id={it} key={it} />
        ))}

        <SubmitButton text={ctaText} />
      </form>

      <>{spoiler}</>
    </Wrapper>
  )
}
