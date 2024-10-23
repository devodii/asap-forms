"use client"

import { AuthForm } from "@/components/auth-form"
import { InvalidUserError } from "@/errors"
import { Effect } from "effect"
import { signIn } from "next-auth/react"

export default function SignInPage() {
  return (
    <AuthForm
      title="Sign in to AsapForms"
      handleSubmit={(dto) =>
        Effect.gen(function* () {
          const program = yield* Effect.promise(async () => await signIn("credentials", { ...dto, redirect: false }))

          if (!program?.ok) return yield* new InvalidUserError()
        })
      }
      ctaText="Sign in"
    />
  )
}
