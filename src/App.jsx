import Statistics from '@components/ui/Statistics'
import FilterButtons from '@components/ui/FilterButtons'
import TaskForm from '@components/task/TaskForm'
import TaskList from '@components/task/TaskList'
import SearchBar from '@components/ui/SearchBar'
import { TaskProvider } from '@/context/TaskContext'

function TaskManager() {
  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Task Manager</h1>
        <Statistics />
        <SearchBar />
        <TaskForm />
        <FilterButtons />
        <TaskList />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <TaskProvider>
      <TaskManager />
    </TaskProvider>
  )
}
