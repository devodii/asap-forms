import { migrate as migratePg } from "drizzle-orm/postgres-js/migrator"
import postgres from "postgres"
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "./schema"

const migrationClient = postgres(process.env.POSTGRES_URL!, { max: 1 })
migratePg(drizzle(migrationClient, { logger: true, schema }), {
  migrationsFolder: "drizzle",
})
