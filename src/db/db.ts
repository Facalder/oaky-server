import { drizzle } from 'drizzle-orm/neon-http'
import env from '@/configs/env'
import * as schema from '@/db/schemas'

const db = drizzle(env.DATABASE_URL, {
	logger: true,
	schema,
})

export default db
