import React, { useState, useEffect } from 'react'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

export default function CreateReddit({ setOpenCreate, bannerColor }) {
  const [communityContent, setComunityContent] = useState('')

  function handleCommunityChange(e) {
    setComunityContent(e.target.value)
  }

  //creates a new reddit
  async function createCommunity(e) {
    e.preventDefault()

    await setDoc(doc(db, 'stuff', communityContent), {
      reddit: communityContent,
      banner: bannerColor,
    })

    setOpenCreate(false)
  }

  return (
    <div className="flex w-full absolute bg-black/50  h-full justify-center items-center ">
      <form
        className=" w-11/12 sm:w-1/3 min-w-[300px]  h-1/3 bg-white flex flex-col p-4 rounded"
        onSubmit={createCommunity}
      >
        <div className="flex flex-col gap-2">
          <p className="font-medium border-b-2 pb-2">Create a Community</p>
          <label className="font-medium">Name</label>
          <input
            className="border-1 rounded p-1"
            placeholder="r/"
            value={communityContent}
            onChange={handleCommunityChange}
          ></input>
        </div>

        <div className="mt-auto ml-auto flex gap-4">
          <button
            className="text-blue-400 border-2 border-blue-400 rounded-2xl p-1 w-20 font-semibold"
            onClick={() => setOpenCreate(false)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-400 text-white rounded-2xl p-1 w-40 font-semibold"
            type="submit"
          >
            Create a Community
          </button>
        </div>
      </form>
    </div>
  )
}
