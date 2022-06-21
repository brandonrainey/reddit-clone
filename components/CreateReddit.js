import React, { useEffect, useState } from 'react'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'

export default function CreateReddit({ openCreate, setOpenCreate }) {

  const [communityContent, setComunityContent] = useState('')

  function handleCommunityChange(e) {
    setComunityContent(e.target.value)
  }

  async function createCommunity(e) {
    e.preventDefault()

    await setDoc(doc(db, 'stuff', communityContent), {'reddit': communityContent})

    setOpenCreate(false)
  }


  return (
    <div className="flex w-full absolute bg-black/50  h-full justify-center items-center ">
      <form className="w-1/3 h-1/3 bg-white flex flex-col p-4 rounded" onSubmit={createCommunity}>
        <div className="flex flex-col gap-2" >
          <p className="font-medium border-b-2 pb-2">Create a Community</p>
          <label className="font-medium">Name</label>
          <input className="border rounded p-1" placeholder="r/" value={communityContent} onChange={handleCommunityChange}></input>
        </div>

        <div className="mt-auto ml-auto flex gap-4">
          <button className="text-blue-400 border-2 border-blue-400 rounded-2xl p-1 w-20 font-semibold" onClick={() => setOpenCreate(false)}>
            Cancel
          </button>
          <button className="bg-blue-400 text-white rounded-2xl p-1 w-40 font-semibold" type='submit'>
            Create a Community
          </button>
        </div>
      </form>
    </div>
  )
}
