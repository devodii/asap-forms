"use server"

import db from "@/db"
import { ResetPasswordTemplate } from "@/email/components/password-reset"
import { send } from "@/email/resend"
import { type Account, account, password_reset } from "@/schema"
import bcrypt from "bcrypt"
import { eq } from "drizzle-orm/sql"
import { Option, pipe } from "effect"
import { nanoid } from "nanoid"
import { redirect } from "next/navigation"

const SALT_OR_ROUNDS = 15

export const getUser = async (email: string) => {
  return await db.query.account.findFirst({ where: (account, { eq }) => eq(account.email, email) })
}

export const createUser = async (dto: Omit<Partial<Account>, "id">) => {
  const { password, ...forwardedProps } = dto

  const hashedPassword = await bcrypt.hash(pipe(password, Option.fromNullable, Option.getOrThrow), SALT_OR_ROUNDS)
  await db.insert(account).values({ id: `acc_${nanoid()}`, password: hashedPassword, ...forwardedProps } as Account)

  redirect("/sign-in")
}

export const resetPassword = async (email: string) => {
  const user = await db.query.account.findFirst({ where: (account, { eq }) => eq(account.email, email) })

  if (!user) throw new Error("User not found")

  const data = await db
    .insert(password_reset)
    .values({
      id: `pr_${nanoid()}`,
      email,
      user_id: user.id,
      secret: `sec_${nanoid(15)}`,
      expires_at: (() => {
        const date = new Date()
        date.setHours(date.getHours() + 1)
        return date
      })(),
    })
    .returning({ secret: password_reset.secret })

  await send({
    from: "Acme <onboarding@resend.dev>",
    to: [user.email],
    subject: "AsapForms - Reset your password",
    react: ResetPasswordTemplate({ link: `${process.env.NEXTAUTH_URL}/password-reset?secret=${data[0].secret}` }),
  })
}

export const retrievePasswordReset = async (secret: string) => {
  return await db.query.password_reset.findFirst({
    where: (password_reset, { eq }) => eq(password_reset.secret, secret),
  })
}

export const updatePassword = async (secret: string, password: string) => {
  const hashedPassword = await bcrypt.hash(pipe(password, Option.fromNullable, Option.getOrThrow), SALT_OR_ROUNDS)

  const reset = await retrievePasswordReset(secret)

  if (!reset) return

  return await Promise.all([
    db.update(password_reset).set({ last_used: new Date() }).where(eq(password_reset.id, reset.id)),
    db
      .update(account)
      .set({ password: hashedPassword })
      .where(eq(account.id, reset.user_id as string)),
  ]).catch((err) => {
    throw new Error(err)
  })
}
