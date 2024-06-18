import { Plus } from 'lucide-react'

import { Button } from './ui/button'
import { Input } from './ui/input'

export const NewTaskForm = () => {
  return (
    <form>
      <div className="mx-auto flex w-full max-w-xl items-center space-x-2 rounded-lg border-2 border-muted p-4 has-[:focus-visible]:ring-2">
        <Input
          type="text"
          placeholder="Create a new task"
          className="focus-visible: rounded-none border-0 outline-none focus-visible:ring-0"
        />
        <Button type="submit">
          <Plus className="size-4" />
        </Button>
      </div>
    </form>
  )
}
