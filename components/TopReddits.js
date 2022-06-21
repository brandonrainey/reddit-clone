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
    <div className="hidden w-60 border border-gray-300 h-96 ml-12 custom:flex flex-col rounded ">
      <div className="h-20 border w-full flex items-end pb-2 pl-2 font-semibold text-lg">Top Communities</div>

      {communities.map((item, index) => (
        <div
          className="w-full border h-12 flex items-center pr-2 pl-2 gap-3"
          key={index}
        >
          <p>{index + 1}</p>
          <FiChevronUp className="shrink-0" />
          <BsReddit className="w-7 h-7 shrink-0" />
          <p className="truncate">r/{item}</p>
          <button
            className="ml-auto border rounded-2xl pl-3 pr-3 bg-blue-400 text-white"
            onClick={() => setReddit(item)}
          >
            Join
          </button>
        </div>
      ))}

      <div className="flex justify-center pt-3">
        <button
          className="bg-blue-400 text-white w-44 p-2 rounded-3xl text-base"
          onClick={() => setOpenCreate(!openCreate)}
        >
          Create a Community
        </button>
      </div>
    </div>
  )
}
