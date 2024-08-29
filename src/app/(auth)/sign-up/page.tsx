"use client"

import { createUser, getUser } from "@/actions/auth"
import { AuthForm } from "@/components/auth-form"
import { DuplicateRecordError, UnknownError } from "@/errors"
import { Effect, Option, pipe } from "effect"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignUpPage() {
  const { push } = useRouter()

  return (
    <AuthForm
      title="Create a Free Account"
      action={(formdata) =>
        Effect.gen(function* () {
          const email = pipe(formdata.get("email") as string, Option.fromNullable, Option.getOrThrow)
          const password = pipe(formdata.get("password") as string, Option.fromNullable, Option.getOrThrow)

          const user = yield* Effect.promise(async () => await getUser(email))

          if (user) return yield* new DuplicateRecordError()

          return yield* Effect.tryPromise({
            try: async () => await createUser({ email, password }),
            catch: () => new UnknownError(),
          })
        })
      }
      ctaText="Register"
      spoiler={
        <div className="flex w-full justify-center text-center text-sm text-gray-700">
          Already have an account?{" "}
          <Link href="/sign-in" className="ml-1 underline underline-offset-2">
            Log in
          </Link>
        </div>
      }
      fields={["email", "password"]}
      onSuccess={() => push("/sign-in")}
    />
  )
}
