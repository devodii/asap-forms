"use client"

import { updatePassword } from "@/actions/auth"
import { UnknownError } from "@/errors"
import { Effect, Option, pipe } from "effect"
import { useRouter } from "next/navigation"
import { AuthForm } from "./auth-form"

interface Props {
  secret: string
}

export const UpdatePassword = async ({ secret }: Props) => {
  const { push } = useRouter()

  return (
    <AuthForm
      fields={["password", "confirm password"]}
      action={(formdata) =>
        Effect.gen(function* () {
          // todo: implement confirm password validations
          const password = pipe(formdata.get("password") as string, Option.fromNullable, Option.getOrThrow)
          return yield* Effect.tryPromise({
            try: async () => await updatePassword(secret, password),
            catch: () => new UnknownError(),
          })
        })
      }
      ctaText="save"
      title="Reset password"
      onSuccess={() => push("/sign-in")}
    />
  )
}
