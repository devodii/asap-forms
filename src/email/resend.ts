import { Option, pipe } from "effect"
import { type CreateEmailOptions, Resend } from "resend"

const resend = new Resend(pipe(process.env.RESEND_API, Option.fromNullable, Option.getOrThrow))

export const send = async (params: CreateEmailOptions) => await resend.emails.send(params)
