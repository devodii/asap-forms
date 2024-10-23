"use client"

import { AuthForm } from "@/components/auth-form"
import db from "@/db"
import { DuplicateRecordError, UnknownError } from "@/errors"
import { encrypt } from "@/lib/hash"
import { account } from "@/schema"
import { Effect } from "effect"
import { nanoid } from "nanoid"

export default function SignUpPage() {
  return (
    <AuthForm
      title="Create a Free Account"
      handleSubmit={(dto) =>
        Effect.gen(function* () {
          const user = yield* Effect.promise(
            async () => await db.query.account.findFirst({ where: ({ email }, { eq }) => eq(email, dto.email) }),
          )

          if (user) return yield* new DuplicateRecordError()

          return yield* Effect.tryPromise({
            try: async () => {
              const password = await encrypt(dto.password)
              await db.insert(account).values({ id: `acc_${nanoid()}`, email: dto.email, password })
            },
            catch: () => new UnknownError(),
          })
        })
      }
      ctaText="Register"
    />
  )
}
