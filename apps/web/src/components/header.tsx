import { Logo } from '@/components/logo'

import { ThemeSwitcher } from './theme-switcher'

export const Header = () => {
  return (
    <header className="flex w-full max-w-4xl items-center justify-between gap-4 p-4">
      <Logo size="sm" />
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
      </div>
    </header>
  )
}
