import React from 'react'
import { FiChevronUp } from 'react-icons/fi'
import { BsReddit } from 'react-icons/bs'

export default function TopReddits({ openCreate, setOpenCreate }) {
  return (
    <div className="hidden w-3/5 border border-gray-300 h-96 ml-12 sm:flex flex-col rounded">
      <div className="h-24 border w-full">Top Communities</div>
      <div className="w-full border h-12 flex items-center pr-2 pl-2 gap-3">
        <p>1</p>
        <FiChevronUp />
        <BsReddit className="w-7 h-7" />
        <p>r/stuff</p>
        <button className="ml-auto border rounded-2xl pl-3 pr-3 bg-blue-400 text-white">
          Join
        </button>
      </div>
      <div className="flex justify-center mt-auto mb-6">
        <button className="bg-blue-400 text-white w-44 p-2 rounded-3xl text-base" onClick={() => setOpenCreate(!openCreate)}>
          Create a Community
        </button>
      </div>
    </div>
  )
}
