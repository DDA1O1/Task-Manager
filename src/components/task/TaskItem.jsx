import { useState } from 'react'
import { getPriorityColor } from '@/utils/priorityUtils'
import PriorityBadge from '@/components/shared/PriorityBadge'
import TaskHistory from '@/components/task/TaskHistory'

export default function TaskItem({ 
  task,           // Current task object containing id, text, priority, completed status
  onToggle,       // Function to toggle task completion status
  onDelete,       // Function to delete task
  onUpdate,       // Function to update task text and priority
  taskHistory,    // Array of historical changes for tasks
  setTaskHistory  // Function to update task history
}) {
  // State management for task editing and history display
  const [isEditing, setIsEditing] = useState(false)    // Controls edit mode
  const [editText, setEditText] = useState(task.text)  // Temporary state for text editing
  const [editPriority, setEditPriority] = useState(task.priority)  // Temporary state for priority editing
  const [showHistory, setShowHistory] = useState(false)  // Controls history display

  // Handles saving edited task changes
  const handleSave = () => {
    // Prevent saving empty task text
    if (!editText.trim()) return
    
    // Check if task text or priority has been modified
    const hasChanges = task.text !== editText.trim() || task.priority !== editPriority
    
    if (hasChanges) {
      // Record change in task history
      setTaskHistory([...taskHistory, {
        taskId: task.id,
        type: 'EDIT',
        oldValue: { text: task.text, priority: task.priority },
        newValue: { text: editText, priority: editPriority },
        timestamp: new Date().toISOString()
      }])
      
      // Update task with new values
      onUpdate(task.id, editText, editPriority)
    }
    
    // Exit edit mode
    setIsEditing(false)
  }


  return (
    // Task item container with dynamic background color based on priority
    <li className={`rounded-lg ${getPriorityColor(task.priority)} transition-all duration-200`}>
      <div className="flex items-center justify-between p-4">
        {/* Left section: Checkbox and Task Content */}
        <div className="flex items-center space-x-3">
          {/* Task completion checkbox */}
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                     focus:ring-blue-500 focus:ring-offset-gray-800"
          />
          
          {/* Conditional rendering based on edit mode */}
          {isEditing ? (
            // Edit mode: Show text input and priority dropdown
            <div className="flex gap-2">
              {/* Task text input field */}
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg 
                         text-gray-100 focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 outline-none"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
              {/* Priority selection dropdown */}
              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
                className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg 
                         text-gray-100 focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          ) : (
            // View mode: Display task text and priority badge
            <div className="flex items-center gap-3">
              <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                {task.text}
              </span>
              <PriorityBadge priority={task.priority} />
            </div>
          )}
        </div>

        {/* Right section: Action buttons */}
        <div className="flex items-center gap-2">
          {isEditing ? (
            // Edit mode: Show save button
            <button 
              onClick={handleSave}
              className="px-3 py-1 text-sm font-medium text-green-400 hover:text-green-300"
            >
              Save
            </button>
          ) : (
            // View mode: Show edit and history buttons
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Edit
              </button>
              <button 
                onClick={() => setShowHistory(!showHistory)}
                className="px-3 py-1 text-sm font-medium text-purple-400 hover:text-purple-300"
              >
                History
              </button>
            </>
          )}
          {/* Delete button - always visible */}
          <button 
            onClick={() => onDelete(task.id)}
            className="px-3 py-1 text-sm font-medium text-red-400 hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>
      {/* Task history section - conditionally rendered */}
      {showHistory && <TaskHistory taskHistory={taskHistory} taskId={task.id} />}
    </li>
  )
} 