import type { ReactNode } from 'react'

import { Header } from '../../components/header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center bg-muted px-4">
      <Header />
      <div className="w-full max-w-4xl rounded-3xl bg-card px-8 py-16 shadow-lg">
        {children}
      </div>
    </main>
  )
}
