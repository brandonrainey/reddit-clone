import Head from 'next/head'
import Image from 'next/image'
import CreatePost from '../components/CreatePost'
import Header from '../components/Header'
import TopReddits from '../components/TopReddits'


export default function Home() {
  return (
    <div className='flex flex-col items-center'>

      <Header />
      <div className='flex border-2 border-red-600 w-3/5 h-screen mt-6'>
        <div className='w-full flex '>
          <CreatePost />
        </div>
        <TopReddits />
      </div>
    </div>
  )
}
