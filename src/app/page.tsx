import { Button } from "@/components/ui/button"
import { Wrapper } from "@/components/wrapper"
import { Option, pipe } from "effect"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { authOptions } from "./api/auth/[...nextauth]/auth-options"

export default async function Index() {
  const session = await getServerSession(authOptions)

  const isAuthenticated = pipe(session?.user?.email, Option.fromNullable, Option.isSome)

  const action = {
    text: isAuthenticated ? "Go to dashboard" : "Start building",
    href: isAuthenticated ? "/dashboard" : "/sign-in",
  }

  return (
    <Wrapper className="gap-2">
      <h4 className="text-center text-4xl font-semibold">Build better forms</h4>
      <p className="text-md flex text-center text-secondary-foreground">
        Recieve feedback from your users in less than one minute
      </p>

      <Button asChild className="mx-auto w-full max-w-xl">
        <Link href={action.href}>{action.text}</Link>
      </Button>
    </Wrapper>
  )
}
