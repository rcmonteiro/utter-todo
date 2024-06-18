import { LogOut } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

export const Sidebar = () => {
  return (
    <aside className="flex flex-col gap-4">
      <Avatar className="mx-auto size-16">
        <AvatarImage src="https://github.com/rcmonteiro.png" />
        <AvatarFallback className="bg-emerald-600 text-white">
          US
        </AvatarFallback>
      </Avatar>
      <nav className="flex flex-col gap-2">
        <Button variant="link" className="justify-start text-lg font-bold">
          All
        </Button>
        <Button variant="link" className="justify-start text-lg font-normal">
          Pending
        </Button>
        <Button variant="link" className="justify-start text-lg font-normal">
          Completed
        </Button>
        <Separator />
        <Button variant="outline" className="mt-4">
          <LogOut />
          Log-out
        </Button>
      </nav>
    </aside>
  )
}
