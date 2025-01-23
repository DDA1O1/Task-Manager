import { useState } from 'react'

export default function TaskForm({ tasks, setTasks, taskHistory, setTaskHistory }) {
  const [newTask, setNewTask] = useState('')
  const [newPriority, setNewPriority] = useState('low')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTask.trim()) return
    
    const taskId = Date.now()
    setTasks([...tasks, {
      id: taskId,
      text: newTask,
      completed: false,
      priority: newPriority
    }])

    setTaskHistory([...taskHistory, {
      taskId,
      type: 'ADD',
      newValue: { text: newTask, priority: newPriority },
      timestamp: new Date().toISOString()
    }])

    setNewTask('')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex items-center gap-3">
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className="flex-grow px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 
                 focus:border-blue-500 outline-none transition-all"
        placeholder="Add new task..."
      />
      <select
        value={newPriority}
        onChange={(e) => setNewPriority(e.target.value)}
        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-100 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button 
        type="submit" 
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add
      </button>
    </form>
  )
} 