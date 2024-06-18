import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'

export const TaskItem = () => {
  return (
    <Label className="flex items-center justify-between space-x-4 py-4">
      <div className="flex-shrink-0">
        <Checkbox />
      </div>
      <p className="flex-grow text-base font-medium text-muted-foreground">
        Task name
      </p>
      <p className="text-sm text-muted-foreground">A minute ago</p>
    </Label>
  )
}
