import { getServerSession } from "next-auth"
import { type PropsWithChildren } from "react"
import { authOptions } from "../api/auth/[...nextauth]/auth-options"
import { redirect } from "next/navigation"

export default async function AuthLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)

  if (session?.user?.email) redirect("/dashboard")

  return <>{children}</>
}
