import { useTasks } from '@/context/TaskContext'

export default function Statistics() {
  const { tasks } = useTasks()
  
  const completionRate = tasks.length 
    ? Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)
    : 0

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-blue-900/30 rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-blue-200 mb-1">Total Tasks</h2>
        <p className="text-2xl font-bold text-blue-300">{tasks.length}</p>
      </div>
      <div className="bg-green-900/30 rounded-lg p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-green-200 mb-1">Completion Rate</h2>
        <p className="text-2xl font-bold text-green-300">{completionRate}%</p>
      </div>
    </div>
  )
} 