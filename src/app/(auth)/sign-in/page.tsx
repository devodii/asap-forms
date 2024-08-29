"use client"

import { AuthForm } from "@/components/auth-form"
import { InvalidUserError } from "@/errors"
import { Effect, Option, pipe } from "effect"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const { push } = useRouter()

  return (
    <AuthForm
      title="Sign in to AsapForms"
      action={(formdata) =>
        Effect.gen(function* () {
          const email = pipe(formdata.get("email") as string, Option.fromNullable, Option.getOrThrow)
          const password = pipe(formdata.get("password") as string, Option.fromNullable, Option.getOrThrow)

          const program = yield* Effect.promise(
            async () => await signIn("credentials", { email, password, redirect: false }),
          )

          if (!program?.ok) return yield* new InvalidUserError()
        })
      }
      ctaText="Sign in"
      spoiler={
        <div className="flex w-full items-center justify-center gap-2 text-sm text-gray-700">
          <Link href="/password-reset" className="underline underline-offset-2">
            Forgot password?
          </Link>

          <p>
            Dont have an account?{" "}
            <Link href="/sign-up" className="ml-1 underline underline-offset-2">
              Register
            </Link>
          </p>
        </div>
      }
      fields={["email", "password"]}
      onSuccess={() => push("/dashboard")}
    />
  )
}
