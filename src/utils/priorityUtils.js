export const getPriorityColor = (priority) => {
  switch(priority) {
    case 'high': return 'bg-red-900/30 hover:bg-red-900/40'
    case 'medium': return 'bg-yellow-900/30 hover:bg-yellow-900/40'
    case 'low': return 'bg-green-900/30 hover:bg-green-900/40'
    default: return 'bg-gray-800/30 hover:bg-gray-800/40'
  }
}

export const getPriorityBadgeColor = (priority) => {
  switch(priority) {
    case 'high': return 'bg-red-900/50 text-red-200'
    case 'medium': return 'bg-yellow-900/50 text-yellow-200'
    case 'low': return 'bg-green-900/50 text-green-200'
    default: return 'bg-gray-800/50 text-gray-200'
  }
} 