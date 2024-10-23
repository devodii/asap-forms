import { relations } from "drizzle-orm"
import { foreignKey, jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"
import { nanoid } from "nanoid"
import type { FormData, SubmissionData } from "./types"

const _def = (idPrefix: string) => ({
  id: varchar("id")
    .primaryKey()
    .notNull()
    .$default(() => idPrefix + nanoid(12)),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).$onUpdate(() => new Date()),
})

export const account = pgTable("account", {
  ..._def("acc_"),
  email: varchar("email").unique().notNull(),
  password: varchar("password"),
})

export const form = pgTable(
  "form",
  {
    ..._def("form_"),
    account_id: varchar("account_id").notNull(),
    name: varchar("name").notNull(),
    details: jsonb("details").notNull().$type<FormData>(),
  },
  (_) => ({
    accountFk: foreignKey({
      columns: [_.account_id],
      foreignColumns: [account.id],
      name: "fk__account_form",
    }).onDelete("set null"),
  }),
)

export const submission = pgTable(
  "submission",
  {
    ..._def("su_"),
    form_id: varchar("formId").notNull(),
    data: jsonb("data").notNull().$type<SubmissionData>(),
  },
  (_) => ({
    formFk: foreignKey({
      columns: [_.form_id],
      foreignColumns: [form.id],
      name: "form_submission_fk",
    }).onDelete("cascade"),
  }),
)

export const formRelations = relations(form, ({ many, one }) => ({
  account: one(account, { references: [account.id], fields: [form.account_id] }),
  submission: many(submission),
}))

export const submissionRelations = relations(submission, ({ one }) => ({
  form: one(form, { references: [form.id], fields: [submission.form_id] }),
}))

export type Form = typeof form.$inferSelect
export type Account = typeof account.$inferSelect
export type Submission = typeof submission.$inferSelect
