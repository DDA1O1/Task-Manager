import { useTasks } from '@/context/TaskContext'

export default function FilterButtons() {
  const { filter, setFilter } = useTasks()
  const filters = ['all', 'active', 'completed']

  return (
    <div className="flex gap-3 mb-6">
      {filters.map((filterType) => (
        <button 
          key={filterType}
          onClick={() => setFilter(filterType)}
          className={`px-4 py-2 rounded-lg capitalize transition-colors ${
            filter === filterType 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          {filterType}
        </button>
      ))}
    </div>
  )
} 