import dayjs from 'dayjs'

import { NewTaskForm } from '@/components/new-task-form'
import { Sidebar } from '@/components/sidebar'
import { TaskItem } from '@/components/task-item'

export default function TaskPage() {
  return (
    <main className="space-y-8">
      <h2 className="text-center text-4xl font-bold">
        {dayjs().format('dddd DD,')}{' '}
        <span className="text-muted-foreground">{dayjs().format('MMMM')}</span>
      </h2>
      <NewTaskForm />
      <div className="flex flex-col gap-8 divide-x-0 divide-y pt-8 sm:flex-row sm:divide-x sm:divide-y-0">
        <Sidebar />
        <div className="w-full divide-y px-8">
          {Array.from({ length: 35 }).map((_, index) => (
            <TaskItem key={index} />
          ))}
        </div>
      </div>
    </main>
  )
}
