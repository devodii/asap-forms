"use client"

import { resetPassword } from "@/actions/auth"
import { AuthForm } from "@/components/auth-form"
import { UnknownError } from "@/errors"
import { Effect } from "effect"
import Link from "next/link"
import { toast } from "sonner"

export const ResetPassword = () => {
  return (
    <AuthForm
      fields={["email"]}
      action={(formdata) =>
        Effect.gen(function* () {
          const email = formdata.get("email") as string
          return yield* Effect.tryPromise({
            try: async () => await resetPassword(email),
            catch: () => new UnknownError(),
          })
        })
      }
      ctaText="Send reset link"
      title="Reset password"
      spoiler={
        <div className="flex w-full justify-center text-center text-sm text-gray-700">
          Suddenly remembered your password?{" "}
          <Link href="/sign-in" className="ml-1 underline underline-offset-2">
            Log in
          </Link>
        </div>
      }
      onSuccess={() => toast.success("Check your email for a reset link")}
    />
  )
}
