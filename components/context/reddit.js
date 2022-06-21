import { useState, createContext, useContext } from 'react'

const RedditContext = createContext()

export function RedditProvider({ children }) {
  const [reddit, setReddit] = useState('reddit1')

  return (
    <RedditContext.Provider value={[reddit, setReddit]}>
      {children}
    </RedditContext.Provider>
  )
}

export function useRedditContext() {
  return useContext(RedditContext)
}
