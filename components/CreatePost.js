import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import { FiImage, FiLink } from 'react-icons/fi'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'

export default function CreatePost() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center w-full border-1 border-gray-300 h-12 gap-3 p-2 rounded-md mt-4 bg-white">
      <FaRegUserCircle className="h-7 w-7 cursor-pointer shrink-0" />

      {session ? (
        <Link href={`/makepost`}>
          <button className="border-1 border-gray-300 w-full h-8 rounded bg-blue-50 text-left pl-4 text-gray-400 hover:border-blue-500">
            Create Post
          </button>
        </Link>
      ) : (
        <button
          className="border-1 border-gray-300 w-full h-8 rounded bg-blue-50 text-left pl-4 text-gray-400 hover:border-blue-500"
          onClick={() => signIn()}
        >
          Create Post
        </button>
      )}

      <FiImage className="h-7 w-7 cursor-pointer shrink-0" />
      <FiLink className="h-7 w-7 cursor-pointer shrink-0" />
    </div>
  )
}
