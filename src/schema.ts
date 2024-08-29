import { relations } from "drizzle-orm";
import {
  foreignKey,
  jsonb,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

const _def = (idPrefix: string) => ({
  id: varchar("id")
    .primaryKey()
    .notNull()
    .$default(() => idPrefix + nanoid(12)),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).$onUpdate(
    () => new Date()
  ),
});

export const session = pgTable("session", {
  ..._def("sesh_"),
});

export const form = pgTable(
  "form",
  {
    ..._def("form_"),
    sessionId: varchar("sessionId").notNull(),
    name: varchar("name").notNull(),
    details: jsonb("details").notNull(), // Array of fields
  },
  (_) => ({
    sessionFk: foreignKey({
      columns: [_.sessionId],
      foreignColumns: [session.id],
      name: "sesh_form_fk",
    }).onDelete("set null"),
  })
);

export const submission = pgTable(
  "submission",
  {
    ..._def("su_"),
    formId: varchar("formId").notNull(),
    data: jsonb("data").notNull(), // Record<string, string>
  },
  (_) => ({
    formFk: foreignKey({
      columns: [_.formId],
      foreignColumns: [form.id],
      name: "form_submission_fk",
    }).onDelete("cascade"),
  })
);

export const formRelations = relations(form, ({ many, one }) => ({
  session: one(session, { references: [session.id], fields: [form.sessionId] }),
  submission: many(submission),
}));

export const submissionRelations = relations(submission, ({ one }) => ({
  form: one(form, { references: [form.id], fields: [submission.formId] }),
}));

export type Form = typeof form.$inferSelect;
export type Session = typeof session.$inferSelect;
export type Submission = typeof submission.$inferSelect;
