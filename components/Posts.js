import React, { useEffect, useState } from 'react'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'
import { BsChatLeft } from 'react-icons/bs'
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc, 
} from 'firebase/firestore'
import { db } from '../firebase'

export default function Posts({ posts, setPosts, reddit }) {
  const [pressed, setPressed] = useState(false)

  const [postIndex, setPostIndex] = useState()

  const [postId, setPostId] = useState()

  const colRef = collection(db, reddit)

  async function upvotePost() {
    const docRef = doc(db, reddit, postId)

    await updateDoc(docRef, {
      votes: posts[postIndex].votes + 1,
    })
  }

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      snapshot.docs.forEach((doc, index) => {
        if (index == postIndex) {
          setPostId(doc.id)
        }
      })
    })
  }, [postIndex])

  useEffect(() => {
    if (pressed) {
      upvotePost()
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
                setPressed(true)
              }}
            >
              <TbArrowBigTop className="w-6 h-6" />
            </button>

            <p>{item.votes}</p>
            <TbArrowBigDown className="w-6 h-6" />
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
            <div>
              <p>{item.content}</p>
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
