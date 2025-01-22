import TaskItem from '@/components/task/TaskItem'

export default function TaskList({ tasks, setTasks, taskHistory, setTaskHistory }) {
  const toggleTask = (id) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
  }

  const updateTask = (id, newText, newPriority) => {
    setTasks(prevTasks => prevTasks.map(task =>
      task.id === id ? {...task, text: newText, priority: newPriority} : task
    ))
  }

  return (
    <ul className="space-y-2">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onUpdate={updateTask}
          taskHistory={taskHistory}
          setTaskHistory={setTaskHistory}
        />
      ))}
    </ul>
  )
} 