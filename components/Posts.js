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
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Posts({ posts, setPosts, reddit }) {
  const router = useRouter()

  const [pressedUp, setPressedUp] = useState(false)

  const [pressedDown, setPressedDown] = useState(false)

  const [postIndex, setPostIndex] = useState()

  const [postNumber, setPostNumber] = useState()

  const [postId, setPostId] = useState()

  const colRef = collection(db, 'posts')

  const { data: session } = useSession()

  async function upvotePost() {
    const docRef = doc(db, 'stuff', reddit, 'posts', postId)

    const votedRef = doc(db, 'posts', postId)

    const voteSnap = await getDoc(votedRef)

    const current = session.user.name

    const currentUser = voteSnap.data()[current]

    

    if (currentUser != 'upvoted') {
      await updateDoc(docRef, {
        votes: posts[postNumber].votes + 1,
      })

      await updateDoc(votedRef, {
        [session.user.name]: 'upvoted',
      })
    }

    setPostId('')
    setPostIndex('')
  }

  async function downvotePost() {
    const docRef = doc(db, 'stuff', reddit, 'posts', postId)

    const votedRef = doc(db, 'posts', postId)

    const voteSnap = await getDoc(votedRef)

    const current = session.user.name

    const currentUser = voteSnap.data()[current]

    

    if (currentUser != 'downvoted') {
      await updateDoc(docRef, {
        votes: posts[postNumber].votes - 1,
      })

      await updateDoc(votedRef, {
        [session.user.name]: 'downvoted',
      })
    }

    setPostId('')
    setPostIndex('')
  }

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc, index) => {
        if (doc.id == postIndex) {
          setPostId(doc.id)
        }
      })
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postIndex])

  useEffect(() => {
    if (pressedUp) {
      upvotePost()
      setPressedUp(false)
    }
    if (pressedDown) {
      downvotePost()
      setPressedDown(false)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId])

  

  return (
    <div className="flex  mt-4 flex-col ">
      {posts.map((item, index) => (
        <div
          className="flex mb-4 border-1 border-gray-300 rounded-sm"
          key={index}
        >
          <div className="flex flex-col items-center bg-gray-50 w-10 self-center">
            <button
              onClick={() => {
                setPostNumber(index)
                setPostIndex(item.id)
                setPressedUp(true)
              }}
            >
              <TbArrowBigTop className="w-6 h-6" />
            </button>

            <p>{item.votes}</p>
            <button
              onClick={() => {
                setPostNumber(index)
                setPostIndex(item.id)
                setPressedDown(true)
              }}
            >
              <TbArrowBigDown className="w-6 h-6" />
            </button>
          </div>
          {/* post */}
          <div className="flex flex-col w-full pl-2">
            {/* reddit */}
            <div className="flex flex-wrap items-center pt-1">
              <p className="mr-2 font-semibold text-sm">r/{reddit}</p>
              <p className="text-sm text-slate-500">
                Posted by u/{item.user} 5 hours ago
              </p>
            </div>
            {/* title */}
            <div>
              <p className="font-bold text-lg">{item.title}</p>
            </div>
            {/* content */}
            <div className="">
              <p className=" pr-8 ">{item.content}</p>
            </div>
            {/* bottom */}

            <div className="flex">
              <div
                className="flex items-center justify-center gap-2 cursor-pointer"
                onClick={() => router.push(`/${item.id}`)}
              >
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
