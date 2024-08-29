ALTER TABLE "password_reset" ADD COLUMN "expires_at" timestamp NOT NULL;--> statement-breakpoint
ALTER TABLE "password_reset" DROP COLUMN IF EXISTS "expiresAt";