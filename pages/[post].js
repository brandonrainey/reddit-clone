import React, { useState, useEffect } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  onSnapshot,
  doc,
  setDoc,
} from 'firebase/firestore'
import { db } from '../firebase'
import { useRouter } from 'next/router'
import { useRedditContext } from '../components/context/reddit'
import Header from '../components/Header'
import Banner from '../components/Banner'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'
import { BsChatLeft } from 'react-icons/bs'
import { useSession, signIn } from 'next-auth/react'
import { BsReddit } from 'react-icons/bs'
import { v4 as uuidv4 } from 'uuid'

export default function Post() {
  const [reddit, setReddit] = useRedditContext()

  const router = useRouter()

  const { data: session } = useSession()

  const { post } = router.query

  const [uniqueId, setUniqueId] = useState(uuidv4())

  const [currentPost, setCurrentPost] = useState()

  const [currentComments, setCurrentComments] = useState([])

  
  const commentRef = collection(db, 'posts', post || 'mypost', 'comments')
 
const [voteComment, setVoteComment] = useState(false)
  

  const postRef = collection(db, 'stuff', reddit, 'posts')

  const [commentContent, setCommentContent] = useState('')

  function handleCommentChange(e) {
    setCommentContent(e.target.value)
  }

  const sendComment = async (e) => {
    e.preventDefault()

    await setDoc(doc(db, 'posts', post, 'comments', uniqueId), {
      content: commentContent,
      user: 'Genlordqt',
      votes: 0,
      id: uniqueId
    })

    setUniqueId(uuidv4())
    setCommentContent('')
  }

  async function upvotePost() {
    const postRef = doc(db, 'stuff', reddit, 'posts', post)

    const postSnap = await getDoc(postRef)

    const votedRef = doc(db, 'posts', post)

    const voteSnap = await getDoc(votedRef)

    const current = session.user.name

    const currentUser = voteSnap.data()[current]

    if (currentUser != 'upvoted') {
      await updateDoc(postRef, {
        votes: postSnap.data().votes + 1,
      })

      await updateDoc(votedRef, {
        [session.user.name]: 'upvoted',
      })
    }
  }

  async function downvotePost() {
    const postRef = doc(db, 'stuff', reddit, 'posts', post)

    const postSnap = await getDoc(postRef)

    const votedRef = doc(db, 'posts', post)

    const voteSnap = await getDoc(votedRef)

    const current = session.user.name

    const currentUser = voteSnap.data()[current]

    

    if (currentUser != 'downvoted') {
      await updateDoc(postRef, {
        votes: postSnap.data().votes - 1,
      })

      await updateDoc(votedRef, {
        [session.user.name]: 'downvoted',
      })
    }
  }

  async function upvoteComment(id) {
    const commentRef = doc(db, 'posts', post, 'comments', id)

    const commentSnap = await getDoc(commentRef)

    await updateDoc(commentRef, {
      votes: commentSnap.data().votes + 1
    })


  }

  useEffect(() => {
    setCurrentComments([])
    
    onSnapshot(commentRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setCurrentComments((currentComments) => [
          ...currentComments,
          doc.data(),
        ])
      })
    })
    console.log('triggerd')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post, uniqueId])

  useEffect(() => {
    onSnapshot(postRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        if (doc.id == post) {
          setCurrentPost(doc.data())
        }
      })
    })
  }, [post])

  return (
    <div className="flex flex-col items-center">
      <Header />
      <Banner reddit={reddit} />
      <div className="flex border-2 w-1/2 h-auto pt-2">
        <div className="flex flex-col items-center w-10">
          <TbArrowBigTop
            className="w-6 h-6 cursor-pointer"
            onClick={() => {
              if (session != undefined) {
                upvotePost()
              } else {
                alert('You Must Be Signed In')
              }
            }}
          />
          <p>{currentPost?.votes}</p>
          <TbArrowBigDown className="w-6 h-6 cursor-pointer" onClick={() => {
              if (session != undefined) {
                downvotePost()
              } else {
                alert('You Must Be Signed In')
              }
            }}/>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-col">
            <p className="pb-2 text-sm text-slate-500">
              Posted by {currentPost?.user}
            </p>
            <p className="font-bold text-xl pb-2">{currentPost?.title}</p>
            <p className="pb-1">{currentPost?.content}</p>
            <div className="flex">
              <div className="flex items-center justify-center gap-2">
                <BsChatLeft className="h-4" />
                <p className="text-slate-400 font-bold text-sm">
                  {currentComments?.length} Comments
                </p>
              </div>
            </div>
          </div>
          <form className="pb-2" onSubmit={sendComment}>
            <p>Comment as {session?.user?.name}</p>
            <textarea
              className="border-2 w-11/12 h-40"
              value={commentContent}
              onChange={handleCommentChange}
            ></textarea>
            <button
              type="submit"
              className="bg-slate-500 text-white font-medium rounded-xl pl-2 pr-2 text-sm h-6"
            >
              Comment
            </button>
          </form>
        </div>
      </div>
      <div className="border-2 w-1/2 h-auto mb-4">
        {currentComments.map((item, index) => (
          <div className="flex flex-col pl-4 pt-4 gap-2 border-b-1">
            <div className="flex pb-2 gap-2 text-sm font-medium">
              <BsReddit className="h-6 w-6" />
              {item?.user}
            </div>
            <div className="indent-6 pb-2">{item?.content}</div>
            <div className="flex gap-1 ml-4 items-center">
              <button onClick={() => {
                upvoteComment(item.id)
                setVoteComment(!voteComment)
              }}>
                <TbArrowBigTop className="w-5 h-5 cursor-pointer" />
              </button>

              <p className="font-medium">{item.votes != 0 ? item.votes : 'vote'}</p>
              <TbArrowBigDown className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
