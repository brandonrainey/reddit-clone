import Head from 'next/head'
import Image from 'next/image'
import CreatePost from '../components/CreatePost'
import Header from '../components/Header'
import TopReddits from '../components/TopReddits'
import { db} from '../firebase'

export default function Home() {
  
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="flex w-11/12 max-w-3xl h-screen mt-6">
        <div className="w-full flex ">
          <CreatePost />
        </div>
        <TopReddits />
      </div>
    </div>
  )
}
