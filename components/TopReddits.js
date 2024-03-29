import React from 'react'
import { BsReddit } from 'react-icons/bs'
import { useRedditContext } from './context/reddit'

export default function TopReddits({}) {
  const {
    setReddit,
    communities,
    openCreate,
    setOpenCreate,
    redditColors,
    redditIndex
  } = useRedditContext()

  console.log(redditColors)

  return (
    <div className="hidden w-60 border-1 border-gray-300 max-h-[45%] ml-12 custom:flex flex-col rounded-md mt-4 bg-white">
      <div className="h-20 border-b-1 w-full flex items-end pb-2 pl-2 font-semibold text-lg">
        Top Communities
      </div>

      {communities.map((item, index) => (
        <div
          className="w-full border-b-1 h-12 flex items-center pr-2 pl-2 gap-3"
          key={index}
        >
          <p>{index + 1}</p>
          <BsReddit className="w-7 h-7 shrink-0" />
          <p className="truncate">r/{item}</p>
          <button
            className={`ml-auto border-1 rounded-2xl pl-3 pr-3 text-white font-medium`}
            onClick={() => setReddit(item)}
            aria-label="view reddit"
            style={{background: redditColors[redditIndex]}}
          >
            View
          </button>
        </div>
      ))}

      <div className="flex justify-center mt-7">
        <button
          className="bg-blue-400 text-white w-44 p-2 rounded-3xl text-base font-medium "
          onClick={() => setOpenCreate(!openCreate)}
          aria-label="create reddit"
          style={{background: redditColors[redditIndex]}}
        >
          Create a Community
        </button>
      </div>
    </div>
  )
}
