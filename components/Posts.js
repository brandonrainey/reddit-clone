import React, { useEffect, useState } from 'react'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'
import { BsChatLeft } from 'react-icons/bs'
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Posts({ posts, setPosts, reddit }) {
  const [pressedUp, setPressedUp] = useState(false)

  const [pressedDown, setPressedDown] = useState(false)

  const [postIndex, setPostIndex] = useState()

  const [postId, setPostId] = useState()

  const colRef = collection(db, reddit)

  const { data: session } = useSession()

  

  async function upvotePost() {
    const docRef = doc(db, reddit, postId)

    const votedRef = doc(db, 'posts', postId)

    const voteSnap = await getDoc(votedRef)

    const current = session.user.name

    const currentUser = voteSnap.data()[current]

    if (currentUser != 'upvoted') {
      await updateDoc(docRef, {
        votes: posts[postIndex].votes + 1,
      })

      await updateDoc(votedRef, {
        [session.user.name]: 'upvoted',
      })
    }
  }

  async function downvotePost() {
    const docRef = doc(db, reddit, postId)

    const votedRef = doc(db, 'posts', postId)

    const voteSnap = await getDoc(votedRef)

    const current = session.user.name

    const currentUser = voteSnap.data()[current]

    if (currentUser != 'downvoted') {
      await updateDoc(docRef, {
        votes: posts[postIndex].votes - 1,
      })

      await updateDoc(votedRef, {
        [session.user.name]: 'downvoted',
      })
    }
  }

  useEffect(() => {
    console.log(postIndex)
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc, index) => {
        if (index == postIndex) {
          setPostId(doc.id)
        }
      })
    })
  }, [postIndex])

  useEffect(() => {
    console.log(postIndex)
    if (pressedUp) {
      upvotePost()
    }
    if (pressedDown) {
      downvotePost()
    }

    
  }, [postId])

  return (
    <div className="flex  mt-4 flex-col">
      {posts.map((item, index) => (
        <div
          className="flex mb-4 border border-gray-300 rounded-sm"
          key={index}
        >
          <div className="flex flex-col items-center bg-gray-50 w-10 pt-2">
            <button
              onClick={() => {
                setPostIndex(index)
                setPressedUp(true)
              }}
            >
              <TbArrowBigTop className="w-6 h-6" />
            </button>

            <p>{item.votes}</p>
            <button
              onClick={() => {
                setPostIndex(index)
                setPressedDown(true)
              }}
            >
              <TbArrowBigDown className="w-6 h-6" />
            </button>
            
          </div>
          {/* post */}
          <div className="flex flex-col w-full pl-2">
            {/* reddit */}
            <div className="flex">
              <p>r/{reddit}</p>
              <p>Posted by u/{item.user} 5 hours ago</p>
            </div>
            {/* title */}
            <div>
              <p className="font-bold">{item.title}</p>
            </div>
            {/* content */}
            <div className="">
              <p className="truncate pr-8">{item.content}</p>
            </div>
            {/* bottom */}
            <div className="flex">
              <div className="flex items-center justify-center gap-2">
                <BsChatLeft className="" />
                <p>Comments</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
