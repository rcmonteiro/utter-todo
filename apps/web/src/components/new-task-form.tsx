'use client'

import { Plus } from 'lucide-react'
import { useTransition } from 'react'

import { createTaskAction } from '../app/tasks/actions'
import { Button } from './ui/button'
import { Input } from './ui/input'

const NewTaskForm = () => {
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      await createTaskAction(formData)
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-auto flex w-full max-w-xl items-center space-x-2 rounded-lg border-2 border-muted p-4 has-[:focus-visible]:ring-2">
        <Input
          type="text"
          name="title"
          placeholder="Create a new task"
          className="focus-visible: rounded-none border-0 outline-none focus-visible:ring-0"
        />
        <Button type="submit" disabled={isPending}>
          <Plus className="size-4" />
          <span className="sr-only">Create new task</span>
        </Button>
      </div>
    </form>
  )
}
NewTaskForm.displayName = 'NewTaskForm'

export { NewTaskForm }
