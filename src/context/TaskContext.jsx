import { createContext, useContext, useState, useMemo } from 'react'
import { useLocalStorage } from '@/hooks/useLocalStorage'

// Create empty context container for tasks
const TaskContext = createContext()

// Provider component that wraps the app and provides task-related state and functions
export function TaskProvider({ children }) {
  // Persistent state using local storage
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [taskHistory, setTaskHistory] = useLocalStorage('taskHistory', [])
  
  // UI state
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTaskId, setSelectedTaskId] = useState(null)

  // Filter tasks based on search term and filter type
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (searchTerm) {
        return task.text.toLowerCase().includes(searchTerm.toLowerCase())
      }
      return filter === 'all' ? true : 
             filter === 'completed' ? task.completed : !task.completed
    })
  }, [tasks, filter, searchTerm])

  // Add new task and record in history
  const addTask = (text, priority) => {
    const taskId = Date.now()
    
    setTasks(prev => [...prev, {
      id: taskId,
      text,
      completed: false,
      priority
    }])

    setTaskHistory(prev => [...prev, {
      taskId,
      type: 'ADD',
      newValue: { text, priority },
      timestamp: new Date().toISOString()
    }])
  }

  // Update existing task and record changes
  const updateTask = (id, newText, newPriority) => {
    const task = tasks.find(t => t.id === id)
    
    setTasks(prev => prev.map(t => 
      t.id === id ? {...t, text: newText, priority: newPriority} : t
    ))

    setTaskHistory(prev => [...prev, {
      taskId: id,
      type: 'EDIT',
      oldValue: { text: task.text, priority: task.priority },
      newValue: { text: newText, priority: newPriority },
      timestamp: new Date().toISOString()
    }])
  }

  // Toggle task completion status
  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? {...task, completed: !task.completed} : task
    ))
  }

  // Remove task from list
  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  // Bundle all values and functions to pass through context
  const value = {
    tasks,
    taskHistory,
    filteredTasks,
    filter,
    setFilter,
    searchTerm,
    setSearchTerm,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    selectedTaskId,
    setSelectedTaskId
  }

  // Provide context to child components
  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  )
}

// Custom hook for consuming task context
export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}