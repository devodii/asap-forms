"use server"

import db from "@/db"
import { waitlist } from "@/schema"

export const joinWaitlist = async (parameters: {
  email: string
  comment: string
}) => {
  await db.insert(waitlist).values(parameters)
}
