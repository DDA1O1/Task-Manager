import { useState, useEffect } from 'react'

export function useLocalStorage(key) {
    console.log(key)
  // Initialize state with a function to avoid running localStorage logic on every render
  const [value, setValue] = useState(() => {
    // only run once when the component is mounted
    const saved = localStorage.getItem(key)
    
    
    return saved ? JSON.parse(saved) : []
  })
  console.log(value)
  // Effect runs whenever key or value changes
  useEffect(() => {
    // Save the current value to localStorage
    // Convert value to string using JSON.stringify since localStorage only stores strings
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])  // Dependencies array - effect runs when these values change

  // Return current value and setter function (like useState)
  return [value, setValue]
} 