import { retrievePasswordReset } from "@/actions/auth"
import { ResetPassword } from "@/components/reset-password"
import { UpdatePassword } from "@/components/update-password"
import { Option, pipe } from "effect"
import { notFound } from "next/navigation"

interface Props {
  searchParams: {
    secret: string
  }
}

export default async function PasswordResetPage({ searchParams }: Props) {
  const isResetAttempt = searchParams.secret

  if (isResetAttempt) {
    const passwordReset = await retrievePasswordReset(searchParams.secret)

    if (
      !passwordReset ||
      passwordReset.expires_at.getTime() < Date.now() ||
      pipe(passwordReset.last_used, Option.fromNullable, Option.isSome)
    )
      return notFound()

    return <UpdatePassword secret={passwordReset.secret} />
  }

  return <ResetPassword />
}
