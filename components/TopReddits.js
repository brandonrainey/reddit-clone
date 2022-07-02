import React from 'react'
import { FiChevronUp } from 'react-icons/fi'
import { BsReddit } from 'react-icons/bs'
import { useRedditContext } from './context/reddit'

export default function TopReddits({
  openCreate,
  setOpenCreate,
  communities,
  setCommunities,
}) {
  const [reddit, setReddit] = useRedditContext()

  return (
    <div className="hidden w-60 border-1 border-gray-300 h-96 ml-12 custom:flex flex-col rounded ">
      <div className="h-20 border-1 w-full flex items-end pb-2 pl-2 font-semibold text-lg">Top Communities</div>

      {communities.map((item, index) => (
        <div
          className="w-full border-1 h-12 flex items-center pr-2 pl-2 gap-3"
          key={index}
        >
          <p>{index + 1}</p>
          {/* <FiChevronUp className="shrink-0" /> */}
          <BsReddit className="w-7 h-7 shrink-0" />
          <p className="truncate">r/{item}</p>
          <button
            className="ml-auto border-1 rounded-2xl pl-3 pr-3 bg-blue-400 text-white font-medium"
            onClick={() => setReddit(item)}
          >
            View
          </button>
        </div>
      ))}

      <div className="flex justify-center pt-3">
        <button
          className="bg-blue-400 text-white w-44 p-2 rounded-3xl text-base font-medium"
          onClick={() => setOpenCreate(!openCreate)}
        >
          Create a Community
        </button>
      </div>
    </div>
  )
}
