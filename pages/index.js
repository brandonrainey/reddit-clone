import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
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

export default function Home() {
  const [reddit, setReddit] = useState('stuff')

  const [posts, setPosts] = useState([])

  const [openCreate, setOpenCreate] = useState(true)

  const colRef = collection(db, reddit)

  const q = query(colRef, orderBy('votes', 'desc'))

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setPosts([])
      snapshot.docs.forEach((doc) => {
        setPosts((posts) => [...posts, doc.data()])
      })
    })
  }, [])

  return (
    <div className="flex flex-col items-center">
      <Header />
      {openCreate ? <CreateReddit openCreate={openCreate} setOpenCreate={setOpenCreate} reddit={reddit} setReddit={setReddit}/> : null}
      
      <div className="flex w-11/12 max-w-3xl h-screen mt-6">
        <div className="w-full flex flex-col">
          <CreatePost />
          <Posts
            posts={posts}
            setPosts={setPosts}
            reddit={reddit}
            setReddit={setReddit}
          />
        </div>
        
        <TopReddits openCreate={openCreate} setOpenCreate={setOpenCreate}/>
      </div>

    </div>
  )
}
