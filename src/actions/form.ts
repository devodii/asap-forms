"use server"

import db from "@/db"
import { form, submission } from "@/schema"
import { CreateFormDto, SubmissionData } from "@/types"
import { nanoid } from "nanoid"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { getUser } from "./auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options"
import { eq } from "drizzle-orm/sql"

export const updateForm = async (id: string, dto: CreateFormDto) => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) redirect("/sign-in")

  // todo: store accountId in next auth session
  const user = await getUser(session.user.email)

  if (!user) throw new Error("invalid user")

  await db.update(form).set(dto).where(eq(form.id, id))
}

export const getForm = async (id: string) => {
  return await db.query.form.findFirst({ where: (form, { eq }) => eq(form.id, id) })
}

export const createEmptyForm = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) redirect("/sign-in")

  const user = await getUser(session.user.email)

  if (!user) throw new Error("invalid user")

  const response = await db
    .insert(form)
    .values({ id: `form_${nanoid()}`, title: "Untitled Form", details: { fields: [] }, account_id: user.id })
    .returning({ id: form.id })

  redirect(`/dashboard/editor/${response[0].id}`)
}

export const createSubmission = async (formId: string, data: SubmissionData) => {
  await db.insert(submission).values({ id: `sub_${nanoid(12)}`, form_id: formId, data })
  return { success: true }
}

export const getAccountForms = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) redirect("/sign-in")

  const user = await getUser(session.user.email)

  if (!user) throw new Error("Invalid user")

  return await db.select().from(form).where(eq(form.account_id, user?.id))
}

export const getFormSubmissions = async (formId: string) => {
  return await db.select().from(submission).where(eq(submission.form_id, formId))
}
