'use client'

import { TrashIcon } from 'lucide-react'
import { useState, useTransition } from 'react'

import {
  deleteTaskAction,
  toggleTaskCompletedAction,
} from '@/app/tasks/actions'

import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

type TaskItemProps = {
  task: {
    id: string
    title: string
    createdAt: string
    completedAt?: string
  }
}

export const TaskItem = ({ task }: TaskItemProps) => {
  const [checked, setChecked] = useState(false)

  const [isPending, startTransition] = useTransition()

  const handleCompleteTask = (taskId: string) => {
    setChecked(!checked)
    startTransition(() => {
      toggleTaskCompletedAction({ taskId })
    })
  }

  const handleDeleteTask = (taskId: string) => {
    startTransition(() => {
      deleteTaskAction({ taskId })
    })
  }

  return (
    <Label
      className={`flex items-center justify-between space-x-4 py-4 ${checked ? 'line-through' : ''}`}
    >
      <Checkbox
        disabled={isPending}
        className="flex-shrink-0"
        checked={checked}
        onClick={() => handleCompleteTask(task.id)}
      />
      <p className="flex-grow text-base font-medium text-muted-foreground">
        {task.title}
      </p>
      <p className="text-sm text-muted-foreground">{task.createdAt}</p>
      <Button variant="ghost" onClick={() => handleDeleteTask(task.id)}>
        <TrashIcon className="size-4" />
      </Button>
    </Label>
  )
}
