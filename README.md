

App -> TaskForm -> TaskItem -> TaskHistory
        ↓
     TaskList
        ↓
    Statistics

## State Management with Context API

### Why Context API?

Before implementing Context API, our app faced several challenges:
1. **Prop Drilling**: State was passed through multiple component layers
2. **Complex State Management**: Tasks and history state were managed separately
3. **Scattered Business Logic**: State operations were spread across components

### Implementation

#### 1. Task Context Structure
```jsx
TaskContext/
├── TaskProvider     # Manages global state
├── useTasks        # Custom hook for consuming context
└── State           # Manages:
                    # - tasks
                    # - taskHistory
                    # - task operations
```

#### 2. Data Flow
```
TaskProvider
    │
    ├── Tasks State
    │   └── [tasks, setTasks]
    │
    ├── History State
    │   └── [taskHistory, setTaskHistory]
    │
    └── Operations
        ├── addTask()
        ├── updateTask()
        ├── deleteTask()
        └── toggleTask()
```

#### 3. Before vs After Comparison

**Before:**
```jsx
App
├── tasks, taskHistory state
├── TaskForm (props: tasks, setTasks, taskHistory, setTaskHistory)
├── TaskList (props: tasks, setTasks, taskHistory, setTaskHistory)
│   └── TaskItem (props: tasks, setTasks, taskHistory, setTaskHistory)
└── Statistics (props: tasks)
```

**After:**
```jsx
TaskProvider
└── App
    ├── TaskForm (no props needed)
    ├── TaskList (no props needed)
    │   └── TaskItem (no props needed)
    └── Statistics (no props needed)
```

### Usage Example

```jsx
// Using the context in components
function TaskForm() {
  const { addTask } = useTasks();
  // Direct access to context without props
}

function Statistics() {
  const { tasks } = useTasks();
  // Direct access to tasks without props
}
```

### Benefits

1. **Simplified Component Tree**
   - Eliminated prop drilling
   - Cleaner component interfaces
   - Easier to add new components

2. **Centralized State Management**
   - Single source of truth
   - Predictable state updates
   - Easier debugging

3. **Improved Maintainability**
   - Business logic centralized in context
   - Reduced code duplication
   - Better separation of concerns

### Performance Considerations

1. **Context Splitting**
   - Separate contexts for tasks and history
   - Prevents unnecessary re-renders
   - Better performance optimization

2. **Memoization**
   - Use useMemo for expensive calculations
   - Implement React.memo for pure components
   - Optimize context value updates