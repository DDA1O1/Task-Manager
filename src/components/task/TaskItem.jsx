import { useState } from 'react'
import { useTasks } from '@/context/TaskContext'
import { getPriorityColor } from '@/utils/priorityUtils'
import PriorityBadge from '@/components/shared/PriorityBadge'
import TaskHistory from '@/components/task/TaskHistory'

export default function TaskItem({ task }) {
  const { toggleTask, deleteTask, updateTask, selectedTaskId, setSelectedTaskId } = useTasks()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)
  const [editPriority, setEditPriority] = useState(task.priority)

  const handleSave = () => {
    if (!editText.trim()) return
    
    const hasChanges = task.text !== editText.trim() || task.priority !== editPriority
    
    if (hasChanges) {
      updateTask(task.id, editText, editPriority)
    }
    
    setIsEditing(false)
  }

  const toggleHistory = () => {
    // If this task's history is currently shown (selectedTaskId matches current task)
    // then hide it (set to null)
    // otherwise show this task's history (set to current task.id)
    setSelectedTaskId(selectedTaskId === task.id ? null : task.id)
  }

  return (
    <li className={`rounded-lg ${getPriorityColor(task.priority)} transition-all duration-200`}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
            className="w-5 h-5 rounded border-gray-600 bg-gray-700 text-blue-500 
                     focus:ring-blue-500 focus:ring-offset-gray-800"
          />
          
          {isEditing ? (
            <div className="flex gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg 
                         text-gray-100 focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 outline-none"
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
              />
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
            <div className="flex items-center gap-3">
              <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-100'}`}>
                {task.text}
              </span>
              <PriorityBadge priority={task.priority} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <button 
              onClick={handleSave}
              className="px-3 py-1 text-sm font-medium text-green-400 hover:text-green-300"
            >
              Save
            </button>
          ) : (
            <>
              <button 
                onClick={() => setIsEditing(true)}
                className="px-3 py-1 text-sm font-medium text-blue-400 hover:text-blue-300"
              >
                Edit
              </button>
              <button 
                onClick={toggleHistory}
                className="px-3 py-1 text-sm font-medium text-purple-400 hover:text-purple-300"
              >
                History
              </button>
            </>
          )}
          <button 
            onClick={() => deleteTask(task.id)}
            className="px-3 py-1 text-sm font-medium text-red-400 hover:text-red-300"
          >
            Delete
          </button>
        </div>
      </div>
      {selectedTaskId === task.id && <TaskHistory />}
    </li>
  )
} 