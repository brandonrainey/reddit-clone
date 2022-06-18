import React from 'react'
import Image from 'next/image'
import { FaRegUserCircle } from 'react-icons/fa'
import { FiImage, FiLink } from 'react-icons/fi'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function CreatePost() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center w-full border border-gray-300 h-12 gap-3 p-2 rounded ">
      <FaRegUserCircle className="h-7 w-7 cursor-pointer shrink-0" />

      {session ? (<Link href={`/makepost`}>
        <button className="border border-gray-300 w-full h-8 rounded bg-gray-100 text-left pl-4 text-gray-400 hover:border-black">
          Create Post
        </button>
      </Link>) : (<button className="border border-gray-300 w-full h-8 rounded bg-gray-100 text-left pl-4 text-gray-400 hover:border-black" onClick={() => signIn()}>
          Create Post
        </button>)}

      




      
      <FiImage className="h-7 w-7 cursor-pointer shrink-0" />
      <FiLink className="h-7 w-7 cursor-pointer shrink-0" />
    </div>
  )
}
