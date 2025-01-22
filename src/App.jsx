import { useLocalStorage } from '@hooks/useLocalStorage'
import Statistics from '@components/ui/Statistics'
import FilterButtons from '@components/ui/FilterButtons'
import TaskForm from '@components/task/TaskForm'
import TaskList from '@components/task/TaskList'
import { useState, useMemo } from 'react'
import SearchBar from '@components/ui/SearchBar'

export default function App() {
  // Store tasks in localStorage to persist data after page refresh
  
  const [tasks, setTasks] = useLocalStorage('tasks')

  // Store task history (like completed/deleted tasks) in localStorage
  
  const [taskHistory, setTaskHistory] = useLocalStorage('taskHistory')

  // Track which filter is currently selected (all/active/completed)
  // Initial value is 'all'
  const [filter, setFilter] = useState('all')

  // Add search term state
  const [searchTerm, setSearchTerm] = useState('')

  // Memoized filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (searchTerm) {
        return task.text.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return filter === 'all' ? true : 
             filter === 'completed' ? task.completed : !task.completed;
    });
  }, [tasks, filter, searchTerm]);  // Only recalculate when these values change

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-xl p-6">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Task Manager</h1>
        
        {/* Display task statistics (total, completed, active) */}
        <Statistics tasks={tasks} />
        
        <SearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        
        {/* Form to add new tasks */}
        <TaskForm 
          tasks={tasks} 
          setTasks={setTasks}
          taskHistory={taskHistory}
          setTaskHistory={setTaskHistory}
        />
        
        {/* Buttons to filter tasks view */}
        <FilterButtons 
          filter={filter} 
          setFilter={setFilter} 
        />
        
        {/* List of tasks with edit/delete functionality */}
        <TaskList 
          tasks={filteredTasks}    // Pass filtered tasks instead of all tasks
          setTasks={setTasks}
          taskHistory={taskHistory}
          setTaskHistory={setTaskHistory}
        />
      </div>
    </div>
  )
}
