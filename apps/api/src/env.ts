import { config } from 'dotenv'
import { z } from 'zod'

config()

const envSchema = z.object({
  API_PORT: z.coerce.number().default(4000),
  DB_URL: z.string().url(),
  DB_TEST_URL: z.string().url(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.string().default('development'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())
  throw new Error('Invalid environment variables')
}

export const env = _env.data
