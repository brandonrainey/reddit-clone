import React, { useEffect, useState } from 'react'

import { useRedditContext } from '../components/context/reddit'

export default function Banner({ reddit }) {
  

  const { communities, redditColors, redditIndex, setRedditIndex } = useRedditContext()

  //finds current index of reddit array-- used for banner color
  useEffect(() => {
    console.log('runs')
    if (communities) {
      communities.map((item, index) => {
        if (item == reddit) {
          setRedditIndex(index)
        }
      })
    }
  }, [reddit, communities])

  return (
    <div className="flex flex-col h-32 w-full items-center">
      <div
        className="h-3/4  w-full"
        style={{
          background:
            redditColors == undefined ? null : redditColors[redditIndex],
        }}
      ></div>
      <p className="font-bold text-2xl py-1">r/{reddit}</p>
    </div>
  )
}
