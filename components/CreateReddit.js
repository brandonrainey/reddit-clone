import React from 'react'

export default function CreateReddit({ openCreate, setOpenCreate }) {
  return (
    <div className="flex w-full absolute bg-black/50  h-full justify-center items-center ">
      <div className="w-1/3 h-1/3 bg-white flex flex-col p-4 rounded">
        <div className="flex flex-col gap-2">
          <p className="font-medium border-b-2 pb-2">Create a Community</p>
          <label className="font-medium">Name</label>
          <input className="border rounded p-1" placeholder="r/"></input>
        </div>

        <div className="mt-auto ml-auto flex gap-4">
          <button className="text-blue-400 border-2 border-blue-400 rounded-2xl p-1 w-20 font-semibold" onClick={() => setOpenCreate(false)}>
            Cancel
          </button>
          <button className="bg-blue-400 text-white rounded-2xl p-1 w-40 font-semibold">
            Create a Community
          </button>
        </div>
      </div>
    </div>
  )
}
