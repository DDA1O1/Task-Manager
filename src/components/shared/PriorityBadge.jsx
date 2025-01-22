import { getPriorityBadgeColor } from '@/utils/priorityUtils'

export default function PriorityBadge({ priority }) {
  return (
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityBadgeColor(priority)}`}>
      {priority}
    </span>
  )
} 