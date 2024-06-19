import { env } from '@/env'

import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: env.API_PORT,
  })
  .then(() => {
    console.log('')
    console.log('🤘 Utter Todo API running!')
  })
