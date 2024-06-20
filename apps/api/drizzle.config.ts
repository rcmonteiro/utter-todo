import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

config({
  path: '.env',
})

export default defineConfig({
  schema: './src/http/database/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DB_URL ?? '',
  },
  verbose: true,
  strict: false,
})
