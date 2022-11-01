import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import CreatePost from '../components/CreatePost'
import Header from '../components/Header'
import Posts from '../components/Posts'
import TopReddits from '../components/TopReddits'
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
  doc,
} from 'firebase/firestore'
import { db } from '../firebase'
import CreateReddit from '../components/CreateReddit'
import { useRedditContext } from '../components/context/reddit'
import Banner from '../components/Banner'


export default function Home() {
  const {
    reddit,
    setReddit,
    communities,
    setCommunities,
    openCreate,
    setOpenCreate,
  } = useRedditContext()

  const [timeDifference, setTimeDifference] = useState()

  const [timeString, setTimeString] = useState()

  const [posts, setPosts] = useState([])

  const colRef = collection(db, 'stuff')

  const newRef = collection(db, 'stuff', 'reddits', reddit)

  const postRef = collection(db, 'stuff', reddit, 'posts')

  const [date1, setDate1] = useState()

  const date2 = Date.now()

  const [testState, setTestState] = useState('test')

  function getDifferenceInDays(date1, date2) {
    const diffInMs = Math.abs(date2 - date1)
    return diffInMs / (1000 * 60 * 60 * 24)
  }

  function getDifferenceinHours(date1, date2) {
    const diffInMs = Math.abs(date2 - date1)
    return diffInMs / (1000 * 60 * 60)
  }

  function getDifferenceInMinutes(date1, date2) {
    const diffInMs = Math.abs(date2 - date1)
    return diffInMs / (1000 * 60)
  }

  function calculateTime(date1, date2) {
    const minutes = Math.round(getDifferenceInMinutes(date1, date2))

    setTimeDifference(minutes)
    setTimeString('minutes')
    if (minutes > 60) {
      const hours = Math.round(getDifferenceinHours(date1, date2))
      setTimeDifference(hours)
      setTimeString('hours')
      if (hours > 24) {
        const days = Math.round(getDifferenceInDays(date1, date2))
        setTimeDifference(days)
        setTimeString('days')
      }
    }

    return timeDifference
  }

  const q = query(postRef, orderBy('votes', 'desc'))

  //sets array of current reddit's posts
  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      setPosts([])
      snapshot.docs.forEach((doc) => {
        setPosts((posts) => [...posts, doc.data()])
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reddit])

  //sets array of all reddit's on load
  useEffect(() => {
    console.log('setting reddits')
    onSnapshot(colRef, (snapshot) => {
      setCommunities([])
      snapshot.docs.forEach((doc) => {
        setCommunities((communities) => [...communities, doc.data().reddit])
      })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //calculate and sets time difference from post start to current date for each post
  useEffect(() => {
    posts.forEach((item) => {
      const data = calculateTime(item.date, date2)

      const myRef = doc(db, 'stuff', reddit, 'posts', item.id)
      if (data != undefined) {
        updateDoc(myRef, {
          timeDifference: data,
        })
      }
    })
  }, [posts])

  return (
    <div className="flex flex-col items-center min-w-[350px]">
      <Head>
        <meta name="description" content="Reddit Clone by Brandon Rainey." />
        <title>Reddit Clone</title>
      </Head>
      <Header
        communities={communities}
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        testState={testState}
        reddit={reddit}
      />
      {openCreate ? (
        <CreateReddit
          openCreate={openCreate}
          setOpenCreate={setOpenCreate}
          reddit={reddit}
          setReddit={setReddit}
        />
      ) : null}
      <Banner reddit={reddit} />
      <div className="flex w-full  h-screen mt-6 justify-center ">
        <div className="w-full flex flex-col custom:max-w-2xl custom:p-0 small:px-6 ">
          <CreatePost />
          <Posts
            posts={posts}
            setPosts={setPosts}
            reddit={reddit}
            setReddit={setReddit}
            date1={date1}
            timeString={timeString}
          />
        </div>

        <TopReddits
          openCreate={openCreate}
          setOpenCreate={setOpenCreate}
          communities={communities}
          setCommunities={setCommunities}
          reddit={reddit}
        />
      </div>
    </div>
  )
}
