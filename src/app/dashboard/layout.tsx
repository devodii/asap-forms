import { AppSidebar } from "@/components/dashboard-sidebar"
import { Option, pipe } from "effect"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { type PropsWithChildren } from "react"
import { authOptions } from "../api/auth/[...nextauth]/auth-options"

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const session = await getServerSession(authOptions)

  const isAuthenticated = pipe(session?.user?.email, Option.fromNullable, Option.isSome)

  if (!isAuthenticated) redirect("/sign-in")

  return (
    <>
      <AppSidebar />
      {children}
    </>
  )
}
