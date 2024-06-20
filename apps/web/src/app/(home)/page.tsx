import Image from 'next/image'

import githublogo from '../../assets/github-logo.svg'
import { Logo } from '../../components/logo'
import { Button } from '../../components/ui/button'

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[url(/signin.jpg)] bg-cover bg-center">
      <div className="mx-4 flex flex-col items-center justify-center gap-10 rounded-lg bg-card p-8 text-center shadow-lg">
        <Logo />
        <p className="text-lg text-muted-foreground">
          <strong>Welcome to Utter Todo!</strong>
          <br />
          To manage your tasks, you need to sign in.
        </p>
        <Button variant="outline" className="flex gap-2" size="lg">
          <Image
            className="dark:invert"
            src={githublogo}
            alt="GitHub logo"
            width={24}
            height={24}
          />
          Sign-in with GitHub
        </Button>
      </div>
    </main>
  )
}
