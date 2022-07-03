import React, { useEffect, useState } from 'react'
import { collection, addDoc, setDoc, doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import Header from '../components/Header'
import { FiChevronDown } from 'react-icons/fi'
import { v4 as uuidv4 } from 'uuid'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRedditContext } from '../components/context/reddit'
import { useRouter } from 'next/router'

export default function MakePost() {
  const [reddit, setReddit] = useRedditContext()

  const router = useRouter()

  const { data: session } = useSession()

  const colRef = collection(db, 'stuff')

  const voteRef = collection(db, 'posts')

  const [postContent, setPostContent] = useState('')

  const [titleContent, setTitleContent] = useState('')

  const [uniqueId, setUniqueId] = useState(uuidv4())

  const [redditMenuOpen, setRedditMenuOpen] = useState(false)

  const [redditList, setRedditList] = useState([])

  const [postReddit, setPostReddit] = useState()

  const postDate = Date.now()

  function handlePostChange(e) {
    setPostContent(e.target.value)
  }

  function handleTitleChange(e) {
    setTitleContent(e.target.value)
  }

  const sendPost = async (e) => {
    e.preventDefault()

    await setDoc(doc(db, 'stuff', postReddit || reddit, 'posts', uniqueId), {
      title: titleContent,
      content: postContent,
      id: uniqueId,
      user: session?.user?.name,
      votes: 0,
      date: postDate,
      timeDifference: ''
    })

    setDoc(doc(db, 'posts', uniqueId), {})
    setUniqueId(uuidv4())
    setPostReddit(undefined)
  }

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      setRedditList([])
      snapshot.docs.forEach((doc) => {
        setRedditList((redditList) => [...redditList, doc.data().reddit])
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex flex-col items-center bg-blue-100">
      <Header />
      <div className="flex w-11/12 max-w-3xl h-screen mt-6 flex-col ">
        <div className=" flex items-center relative border-1 w-52 bg-white p-1 text-left mb-2 shadow font-medium text-gray-700 cursor-pointer " onClick={() => setRedditMenuOpen(!redditMenuOpen)}>
          <p>{postReddit ? `r/${postReddit}` : 'Choose Reddit'}</p>
          <FiChevronDown className='ml-auto'/>
        </div>
        {redditMenuOpen ? (
          <div className="bg-white w-52 absolute top-28 shadow border-x-1 border-b-1 h-auto" >
            {redditList.map((item, index) => (
              <p className='pb-1 pl-2 hover:bg-blue-100 cursor-pointer' onClick={() => {
                setPostReddit(item)
                setRedditMenuOpen(false)
              }} key={index}>r/{item}</p>
            ))}
          </div>
        ) : null}

        <div className="w-full border-2 border-grey h-1/2 bg-white shadow">
          <form onSubmit={sendPost} className="flex flex-col p-4">
            <input
              placeholder="Title "
              className="border-1 h-10 mb-2 rounded pl-2"
              onChange={handleTitleChange}
              value={titleContent}
            ></input>
            <textarea
              className="w-full h-72 border-1 mb-8 rounded max-h-72 min-h-custom pl-2 pt-2"
              placeholder="Text(optional)"
              onChange={handlePostChange}
              value={postContent}
            ></textarea>

            <button
              type="submit"
              className="border-1 bg-gray-500 w-16 p-1 rounded-3xl ml-auto hover:bg-gray-400 text-white font-medium"
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
