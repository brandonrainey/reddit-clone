import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState, useContext } from 'react'
import CreatePost from '../components/CreatePost'
import Header from '../components/Header'
import Posts from '../components/Posts'
import TopReddits from '../components/TopReddits'
import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore'
import { db } from '../firebase'
import CreateReddit from '../components/CreateReddit'
import { useRedditContext } from './context/reddit'

export default function Home() {
  const [reddit, setReddit] = useRedditContext()

  

  const [communities, setCommunities] = useState([])

  const [posts, setPosts] = useState([])

  const [openCreate, setOpenCreate] = useState(false)

  const colRef = collection(db, 'stuff')

  const newRef = collection(db, 'stuff', 'reddits', reddit)

  const postRef = collection(db, 'stuff', reddit, 'posts')

  

  const q = query(postRef, orderBy('votes', 'desc'))

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setPosts([])
      snapshot.docs.forEach((doc) => {
        setPosts((posts) => [...posts, doc.data()])
      })
    })
  }, [reddit])

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      setCommunities([])
      snapshot.docs.forEach((doc) => {
        setCommunities((communities) => [...communities, doc.data().reddit])
      })
    })
  }, [])

  


  return (
    <div className="flex flex-col items-center">
      <Header />
      {openCreate ? <CreateReddit openCreate={openCreate} setOpenCreate={setOpenCreate} reddit={reddit} setReddit={setReddit}/> : null}
      
      <div className="flex w-full  h-screen mt-6 justify-center ">
        <div className="w-full flex flex-col custom:max-w-2xl custom:p-0 px-6 ">
          <CreatePost />
          <Posts
            posts={posts}
            setPosts={setPosts}
            reddit={reddit}
            setReddit={setReddit}
          />
        </div>
        
        <TopReddits openCreate={openCreate} setOpenCreate={setOpenCreate} communities={communities} setCommunities={setCommunities}/>
      </div>

    </div>
  )
}
