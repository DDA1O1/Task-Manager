# Task Manager App Structure
# Task Manager

A React-based task management application with features like task creation, filtering, and history tracking.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
```bash
git clone https://github.com/DDA1O1/Task-Manager.git
cd Task-Manager
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

## Directory Structure
```
src/
├── App.jsx                    # Main container
├── components/
│   ├── task/                 # Task-related components
│   ├── ui/                   # UI components
│   └── shared/              # Reusable components
├── hooks/                    # Custom hooks
└── utils/                    # Utility functions
```

## Core Features
- Task management (create, edit, delete)
- Priority levels (low, medium, high)
- Task filtering and search
- Task history tracking
- Local storage persistence

## Data Flow & State Management

### Initial Data Loading
When the app mounts, the `useLocalStorage` hook:
1. Fetches stored data from localStorage for:
   - `tasks` - Returns stored tasks or empty array `[]`
   - `taskHistory` - Returns stored history or empty array `[]`
2. Initializes state with this data before first render

### State Management
The app uses multiple state hooks:
- `tasks` - Main task data (persisted in localStorage)
- `taskHistory` - Task change history (persisted in localStorage) 
- `filter` - Current filter selection ('all'/'active'/'completed')
- `searchTerm` - Current search input

### Re-render Behavior
App.jsx re-renders when:
- State hooks update (`tasks`, `taskHistory`, `filter`, `searchTerm`)
- Child components trigger state updates via:
  - TaskForm: Adding new tasks
  - TaskList: Editing/deleting tasks
  - FilterButtons: Changing filter
  - SearchBar: Updating search term

## Component Logic

### TaskForm Logic
1. **State Management**
   ```jsx
   const [newTask, setNewTask] = useState('')
   const [newPriority, setNewPriority] = useState('low')
   ```

2. **Task Creation Flow**
   - Validate input (prevent empty tasks)
   - Generate unique ID using timestamp
   - Create task object
   - Update task history
   - Reset form

### TaskList Logic
1. **State Update Pattern**
   ```jsx
   // Correct: Using prevTasks for atomic updates
   setTasks(prevTasks => prevTasks.map(...))
   ```

2. **Core Operations**
   - Toggle completion
   - Delete task
   - Update task
   - Maintain state consistency using prevTasks

### TaskItem Logic
1. **Edit Mode**
   ```jsx
   const [isEditing, setIsEditing] = useState(false)
   const [editText, setEditText] = useState(task.text)
   const [editPriority, setEditPriority] = useState(task.priority)
   ```
   - Temporary state for edits
   - Validation before save
   - History tracking for changes

2. **History Display**
   ```jsx
   const [showHistory, setShowHistory] = useState(false)
   ```
   - On-demand history loading
   - Task-specific filtering

### Task History Implementation
1. **Data Structure**
   ```jsx
   {
     taskId: string,
     timestamp: ISOString,
     type: 'ADD' | 'EDIT',
     oldValue?: { text: string, priority: string },
     newValue: { text: string, priority: string }
   }
   ```

2. **Display Logic**
   - Filter by taskId
   - Reverse chronological order
   - Different messages for ADD/EDIT

## Performance Optimization

### Task Filtering
```jsx
const filteredTasks = useMemo(() => 
  tasks.filter(task => {...}), 
  [tasks, filter, searchTerm]
);
```
- Prevents unnecessary recalculations
- Only updates when dependencies change
- Improves performance with large lists

### State Updates
- Use functional updates with prevState
- Atomic operations for consistency
- Prevent race conditions

### Component Updates
- Conditional rendering for history
- Memoized filtering
- Efficient state management

### TaskList Component
Manages the display and manipulation of tasks.

#### Core Functions
1. **Toggle Task Completion**
   ```jsx
   const toggleTask = (id) => {
     setTasks(prevTasks => prevTasks.map(task => 
       task.id === id ? {...task, completed: !task.completed} : task
     ))
   }
   ```

2. **Delete Task**
   ```jsx
   const deleteTask = (id) => {
     setTasks(prevTasks => prevTasks.filter(task => task.id !== id))
   }
   ```

3. **Update Task**
   ```jsx
   const updateTask = (id, newText, newPriority) => {
     setTasks(prevTasks => prevTasks.map(task =>
       task.id === id ? {...task, text: newText, priority: newPriority} : task
     ))
   }
   ```

#### Data Flow
1. **Receiving Filtered Tasks**
   - Gets pre-filtered tasks based on search and filter criteria
   - Filters are applied in parent component (App.jsx)

2. **Task Rendering**
   ```jsx
   tasks.map(task => (
     <TaskItem
       key={task.id}
       task={task}
       onToggle={toggleTask}
       onDelete={deleteTask}
       onUpdate={updateTask}
       taskHistory={taskHistory}
       setTaskHistory={setTaskHistory}
     />
   ))
   ```

#### Props
```jsx
{
  tasks: Array,          // Filtered tasks array
  setTasks: Function,    // Tasks state updater
  taskHistory: Array,    // History records
  setTaskHistory: Function  // History state updater
}
```

#### Performance Considerations
- Uses unique `key` prop for efficient React reconciliation
- Handles state updates immutably
- Delegates individual task rendering to TaskItem component

#### TaskItem Integration
- Each task is rendered as a TaskItem component
- Passes necessary callback functions for task manipulation
- Maintains history through parent state

#### Error Handling
- Safely handles empty task arrays
- Preserves task list integrity during updates
- Prevents duplicate IDs through timestamp-based generation
