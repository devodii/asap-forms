"use client"

import { AuthForm } from "@/components/auth-form"
import { InvalidUserError } from "@/errors"
import { Effect } from "effect"

export default function SignUpPage() {
  return (
    <AuthForm
      title="Create a Free Account"
      handleSubmit={() =>
        Effect.gen(function* () {
          const user = yield* Effect.tryPromise({
            try: async () => {
              throw new InvalidUserError()
            },
            catch: (error) => new InvalidUserError(),
          })
        })
      }
    />
  )
}
