import { relations } from "drizzle-orm"
import { foreignKey, jsonb, pgTable, timestamp, varchar } from "drizzle-orm/pg-core"
import type { FormDetails, SubmissionData } from "./types"

export const account = pgTable("account", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique().notNull(),
  password: varchar("password"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(() => new Date()),
})

export const form = pgTable(
  "form",
  {
    id: varchar("id").primaryKey().notNull(),
    account_id: varchar("account_id").notNull(),
    title: varchar("title").notNull(),
    description: varchar("description"),
    details: jsonb("details").notNull().$type<FormDetails>(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(() => new Date()),
  },
  (_) => ({
    accountFk: foreignKey({
      columns: [_.account_id],
      foreignColumns: [account.id],
      name: "fk__account_form",
    }).onDelete("cascade"),
  }),
)

export const submission = pgTable(
  "submission",
  {
    id: varchar("id").primaryKey().notNull(),
    form_id: varchar("form_id").notNull(),
    data: jsonb("data").notNull().$type<SubmissionData>(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at", { mode: "date", precision: 3 }).$onUpdate(() => new Date()),
  },
  (_) => ({
    formFk: foreignKey({
      columns: [_.form_id],
      foreignColumns: [form.id],
      name: "fk__form_submission",
    }).onDelete("cascade"),
  }),
)

export const password_reset = pgTable(
  "password_reset",
  {
    id: varchar("id").primaryKey().notNull(),
    email: varchar("email").notNull(),
    expires_at: timestamp("expires_at").notNull(),
    user_id: varchar("user_id"),
    last_used: timestamp("last_used"),
    created_at: timestamp("created_at").defaultNow().notNull(),
    secret: varchar("secret").notNull(),
  },
  (_) => ({
    user_fk: foreignKey({
      columns: [_.user_id],
      foreignColumns: [account.id],
      name: "fk__password_reset_user",
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
export type PasswordReset = typeof password_reset.$inferSelect
