import React, { useEffect, useState } from 'react'

export default function Banner({ reddit, communities, redditColors }) {

  const [redditIndex, setRedditIndex] = useState(0)

  //finds current index of reddit array-- used for banner color
  useEffect(() => {
    communities.map((item, index) => {
      if (item == reddit) {
        setRedditIndex(index)
      }
    })
  }, [reddit])

  

  return (
    <div className="flex flex-col border-1 h-32 w-full items-center">
      <div className="h-3/4 bg-blue-400 w-full" style={{background: redditColors == undefined ? 'white' : redditColors[redditIndex]}}></div>
      <p className="font-bold text-2xl py-1">r/{reddit}</p>
    </div>
  )
}
