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
  setDoc,
  onSnapshot,
} from 'firebase/firestore'
import { db } from '../firebase'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IconContext } from 'react-icons'

export default function Posts({ posts, setPosts, reddit, timeString }) {
  const router = useRouter()

  const [pressedUp, setPressedUp] = useState(false)

  const [pressedDown, setPressedDown] = useState(false)

  const [postIndex, setPostIndex] = useState()

  const [postNumber, setPostNumber] = useState()

  const [postId, setPostId] = useState()

  const colRef = collection(db, 'posts')

  const { data: session } = useSession()

  const [allPosts, setAllPosts] = useState([])

  const [voteColor, setVoteColor] = useState([])

  

  async function upvotePost() {
    const current = session.user.name

    const docRef = doc(db, 'stuff', reddit, 'posts', postId)

    const votedRef = doc(db, 'posts', postId)

    const votedRef2 = doc(db, 'posts', postId, current, 'voteData')

    const voteSnap = await getDoc(votedRef)

    const currentUser = voteSnap.data()[current]

    if (currentUser != 'upvoted') {
      await updateDoc(docRef, {
        votes: posts[postNumber].votes + 1,
      })

      await updateDoc(votedRef, {
        [session.user.name]: 'upvoted',
      })

      await setDoc(votedRef2, {
        vote: 'upvoted',
        color: 'orange',
      })
    }

    setPostId('')
    setPostIndex('')
  }

  async function downvotePost() {
    const current = session.user.name

    const docRef = doc(db, 'stuff', reddit, 'posts', postId)

    const votedRef = doc(db, 'posts', postId)

    const votedRef2 = doc(db, 'posts', postId, current, 'voteData')

    const voteSnap = await getDoc(votedRef)

    const currentUser = voteSnap.data()[current]

    if (currentUser != 'downvoted') {
      await updateDoc(docRef, {
        votes: posts[postNumber].votes - 1,
      })

      await updateDoc(votedRef, {
        [session.user.name]: 'downvoted',
      })

      await setDoc(votedRef2, {
        vote: 'downvoted',
        color: 'blue',
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

  // collects ids of all posts
  useEffect(() => {
    const colorRef = collection(db, 'posts')

    onSnapshot(colorRef, (snapshot) => {
      setAllPosts([])
      snapshot.docs.forEach((doc) => {
        setAllPosts((allPosts) => [...allPosts, doc.id])
      })
    })
  }, [])

  // maps through all post ids, making a ref for each to snapshot the votedata for each post into state
  useEffect(() => {

    const currentUser = session?.user?.name
    setVoteColor([])
    posts.map((item) => {
      allPosts.map((item2) => {
        if (item.id == item2) {
          const rref = collection(db, 'posts', item2, currentUser)

          onSnapshot(rref, (snapshot) => {
            
            snapshot.docs.forEach((doc) => {
              setVoteColor((voteColor) => [...voteColor, doc.data()])
            })
          })
        }
      })
    })
  }, [reddit, posts, postIndex])

  return (
    <div className="flex  mt-4 flex-col ">
      {posts.map((item, index) => (
        <div
          className="flex mb-4 border-1 border-gray-300 rounded-sm"
          key={index}
        >
          <div className="flex flex-col items-center bg-gray-50 w-10 self-center">
            <IconContext.Provider
              value={{
                color: `${
                  voteColor[index]?.vote == 'upvoted' ? voteColor[index]?.color : ''
                }`,
              }}
            >
              <button
                onClick={() => {
                  setPostNumber(index)
                  setPostIndex(item.id)
                  setPressedUp(true)
                }}
              >
                <TbArrowBigTop className={`w-6 h-6 ${
                  voteColor[index]?.vote == 'upvoted' ? 'bg-orange-100' : ''
                } rounded`} />
              </button>
            </IconContext.Provider>

            <p>{item.votes}</p>

            <IconContext.Provider
              value={{
                color: `${
                  voteColor[index]?.vote == 'downvoted'
                    ? voteColor[index]?.color
                    : ''
                }`,
              }}
            >
              <button
                onClick={() => {
                  setPostNumber(index)
                  setPostIndex(item.id)
                  setPressedDown(true)
                }}
              >
                <TbArrowBigDown className={`w-6 h-6 ${
                  voteColor[index]?.vote == 'downvoted' ? 'bg-blue-100' : ''
                } rounded`} />
              </button>
            </IconContext.Provider>
          </div>
          {/* post */}
          <div className="flex flex-col w-full pl-2 cursor-pointer" onClick={() => router.push(`/${item.id}`)}>
            {/* reddit */}
            <div className="flex flex-wrap items-center pt-1">
              <p className="mr-2 font-semibold text-sm">r/{reddit}</p>

              <p className="text-sm text-slate-500">
                Posted by u/{item.user} {item.timeDifference} {timeString} ago
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
