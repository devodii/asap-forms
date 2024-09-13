CREATE TABLE IF NOT EXISTS "waitlist" (
	"email" varchar PRIMARY KEY NOT NULL,
	CONSTRAINT "waitlist_email_unique" UNIQUE("email")
);
