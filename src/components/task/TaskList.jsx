import { useTasks } from '@/context/TaskContext'
import TaskItem from '@/components/task/TaskItem'

export default function TaskList() {
  const { filteredTasks } = useTasks()
  
  return (
    <ul className="space-y-2">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </ul>
  )
} 