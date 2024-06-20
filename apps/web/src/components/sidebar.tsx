import { LogOut } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

type SidebarProps = {
  currentStatus: 'ALL' | 'COMPLETED' | 'PENDING'
}

const Sidebar = ({ currentStatus }: SidebarProps) => {
  return (
    <aside className="flex flex-col gap-4">
      <Avatar className="mx-auto size-16">
        <AvatarImage src="https://github.com/rcmonteiro.png" />
        <AvatarFallback className="bg-emerald-600 text-white">
          US
        </AvatarFallback>
      </Avatar>
      <nav className="flex flex-col gap-2">
        <Button
          asChild
          variant="link"
          data-current={currentStatus === 'ALL'}
          className="justify-start text-lg font-normal data-[current=true]:font-bold"
        >
          <Link href="tasks?status=ALL">All</Link>
        </Button>
        <Button
          asChild
          variant="link"
          data-current={currentStatus === 'PENDING'}
          className="justify-start text-lg font-normal data-[current=true]:font-bold"
        >
          <Link href="tasks?status=PENDING">Pending</Link>
        </Button>
        <Button
          asChild
          variant="link"
          data-current={currentStatus === 'COMPLETED'}
          className="justify-start text-lg font-normal data-[current=true]:font-bold"
        >
          <Link href="tasks?status=COMPLETED">Completed</Link>
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
Sidebar.displayName = 'Sidebar'

export { Sidebar }
