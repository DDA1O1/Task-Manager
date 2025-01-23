/**
 * TaskHistory Component - Displays historical changes for a specific task
 * @param {string} taskId - ID of the current task to show history for
 */
import { useTasks } from '@/context/TaskContext'

export default function TaskHistory() {
  const { taskHistory, selectedTaskId } = useTasks()
  
  // Filter records for selected task
  const history = taskHistory
    .filter(record => record.taskId === selectedTaskId)
    .reverse()

  return (
    <div className="mt-2 ml-8 p-3 bg-yellow-700/50 rounded-lg">
      <ul>
        {history.map((record) => (
          <li key={`${record.taskId}-${record.timestamp}`} className="text-xs text-gray-300">
            {/* Display timestamp in local format */}
            {new Date(record.timestamp).toLocaleString()} - 

            {/* Show edit history - displays old and new values */}
            {record.type === 'EDIT' && 
              `Changed from "${record.oldValue.text}" (${record.oldValue.priority}) to "${record.newValue.text}" (${record.newValue.priority})`
            }

            {/* Show creation history - displays initial values */}
            {record.type === 'ADD' && 
              `Created with text "${record.newValue.text}" and priority "${record.newValue.priority}"`
            }
          </li>
        ))}
      </ul>
    </div>
  )
} 