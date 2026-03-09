import { defineConfig } from 'drizzle-kit'
import { env } from './src/configs/env'

export default defineConfig({
	out: '@/db/migrations',
	schema: '@/db/schemas',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.DATABASE_URL || '',
	},
	verbose: true,
	casing: 'snake_case',
	strict: true,
})
