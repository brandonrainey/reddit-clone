import React, { useEffect, useState } from 'react'
import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { db } from '../firebase'
import Header from '../components/Header'

import { v4 as uuidv4 } from 'uuid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRedditContext } from '../components/context/reddit'

export default function MakePost() {
  

  const [reddit, setReddit] = useRedditContext()

  const { data: session } = useSession()

  const colRef = collection(db, 'stuff')

  const voteRef = collection(db, 'posts')

  const [postContent, setPostContent] = useState('')

  const [titleContent, setTitleContent] = useState('')

  const [uniqueId, setUniqueId] = useState(uuidv4())

  function handlePostChange(e) {
    setPostContent(e.target.value)
  }

  function handleTitleChange(e) {
    setTitleContent(e.target.value)
  }

  const sendPost = async (e) => {
    e.preventDefault()

    await setDoc(doc(db, 'stuff', reddit, 'posts', uniqueId), {
      title: titleContent,
      content: postContent,
      id: uniqueId,
      user: session?.user?.name,
      votes: 0,
    })

    setDoc(doc(db, 'posts', uniqueId), {})
    setUniqueId(uuidv4())
  }

  console.log(reddit)

  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex w-11/12 max-w-3xl h-screen mt-6 flex-col">
        <div>Choose Reddit</div>
        <div className="w-full border-2 border-black h-1/2">
          <form onSubmit={sendPost} className="flex flex-col p-4">
            <input
              placeholder="Title "
              className="border h-10 mb-2 rounded"
              onChange={handleTitleChange}
              value={titleContent}
            ></input>
            <input
              className="w-full h-56 border mb-8 rounded"
              placeholder="Text(optional)"
              onChange={handlePostChange}
              value={postContent}
            ></input>

            <button
              type="submit"
              className="border bg-gray-600 w-16 p-1 rounded-3xl ml-auto"
              onClick={() => router.push('/')}
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
