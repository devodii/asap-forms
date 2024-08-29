import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

const queryClient = postgres(process.env.POSTGRES_URL!)
const db = drizzle(queryClient, { logger: true, schema })

export default db

export type DrizzleClient = typeof db
