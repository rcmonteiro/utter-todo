import '@/lib/dayjs'
import '@/styles/globals.css'

import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'UTTER Todo',
  description:
    'From nothing to automated CI/CD - simple app for CI/CD automation for rcmonteiro portfolio',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
