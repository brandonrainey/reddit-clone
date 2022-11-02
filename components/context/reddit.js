import { useState, createContext, useContext } from 'react'

const RedditContext = createContext()

export function RedditProvider({ children }) {
  const [reddit, setReddit] = useState('anime')
  const [communities, setCommunities] = useState([])
  const [redditColors, setRedditColors] = useState([])
  const [openCreate, setOpenCreate] = useState(false)

  return (
    <RedditContext.Provider
      value={{
        reddit,
        setReddit,
        communities,
        setCommunities,
        openCreate,
        setOpenCreate,
        redditColors,
        setRedditColors,
      }}
    >
      {children}
    </RedditContext.Provider>
  )
}

export function useRedditContext() {
  return useContext(RedditContext)
}
