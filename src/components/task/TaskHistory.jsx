/**
 * TaskHistory Component - Displays historical changes for a specific task
 * @param {Array} taskHistory - Array of all task history records
 * @param {string} taskId - ID of the current task to show history for
 */
export default function TaskHistory({ taskHistory, taskId }) {
  // Filter records for current task and reverse to show newest first
  const history = taskHistory
    .filter(record => record.taskId === taskId)
    .reverse() // Reverse to show newest first. Chronological order.
    
  console.log('Task History:', history)

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