import { useState, useEffect } from 'react'

// Understanding useLocalStorage Hook Flow:

// 1. Initial Mount Flow:
// - useState initializer runs FIRST and ONCE
// - Component body runs SECOND 
// - useEffect runs THIRD after render
// - Return statement creates connection between hook state and component state

// 2. State Update Flow:
// - When setTasks called in component, it triggers setValue internally
// - React updates value automatically (they point to same state)
// - Component re-renders
// - useEffect runs with new value
// - New value saved to localStorage

// 3. Key Points:
// - useState initializer runs only once on mount
// - Return statement is crucial for state connection
// - key doesn't need to be in dependency array (constant)
// - useEffect runs only when value changes
// - No need to manually sync localStorage - useEffect handles it

// 4. useEffect runs last
// - useEffect runs after DOM is updated
// - Its is a side effect

export function useLocalStorage(key) {
    console.log(key)
  // Initialize state with a function to avoid running localStorage logic on every render
  const [value, setValue] = useState(() => {
    // only run once when the component is mounted
    const saved = localStorage.getItem(key)
    console.log('1. useState initializer runs')
    
    return saved ? JSON.parse(saved) : []
  })
  console.log('2. Component is mounted')
  // Effect runs whenever key or value changes
  useEffect(() => {
    console.log('3. useEffect runs')
    // Save the current value to localStorage
    // Convert value to string using JSON.stringify since localStorage only stores strings
    localStorage.setItem(key, JSON.stringify(value))
  }, [value])  // Dependencies array - effect runs when these values change

  // Return current value and setter function (like useState)
  return [value, setValue]
} 