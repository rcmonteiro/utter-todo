import { getCookie } from 'cookies-next'
import type { CookiesFn } from 'cookies-next/lib/types'
import ky from 'ky'

import { env } from '../env'

export const api = ky.create({
  prefixUrl: env.NEXT_PUBLIC_API_URL,
  // env.NODE_ENV !== 'production'
  //   ? `${env.NEXT_PUBLIC_APP_URL}/api`
  //   : env.NEXT_PUBLIC_API_URL,
  hooks: {
    beforeRequest: [
      async (request) => {
        let cookieSource: CookiesFn | undefined

        // Server-side only
        if (typeof window === 'undefined') {
          const { cookies: serverCookies } = await import('next/headers')
          cookieSource = serverCookies
        }

        const token = getCookie('token', { cookies: cookieSource })

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
  },
})
