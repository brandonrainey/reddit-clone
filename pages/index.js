import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import CreatePost from '../components/CreatePost'
import Header from '../components/Header'
import Posts from '../components/Posts'
import TopReddits from '../components/TopReddits'
import { collection, addDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

export default function Home() {
  const [reddit, setReddit] = useState('stuff')

  const [posts, setPosts] = useState([])

  const colRef = collection(db, reddit)

  useEffect(() => {
    
    onSnapshot(colRef, (snapshot) => {
      setPosts([])
      snapshot.docs.forEach((doc) => {

        setPosts((posts) => [...posts, doc.data()])
      })
      console.log(posts)
    })

    console.log('triggered')
  }, [])

  return (
    <div className="flex flex-col items-center">
      <Header />
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
        <TopReddits />
      </div>
    </div>
  )
}
