import React from 'react'
import Image from 'next/image'
import { FaRegUserCircle } from 'react-icons/fa'
import { FiImage, FiLink } from 'react-icons/fi'
import Link from 'next/link'

export default function CreatePost() {
  return (
    <div className="flex items-center w-full border border-gray-300 h-12 gap-3 pl-2 pr-2 rounded">
      <FaRegUserCircle className="h-7 w-7 cursor-pointer shrink-0" />
      <Link href='/makepost'>
        <button className="border border-gray-300 w-full h-8 rounded bg-gray-100 text-left pl-4 text-gray-400 hover:border-black">
          Create Post
        </button>
      </Link>
      
      <FiImage className="h-7 w-7 cursor-pointer shrink-0" />
      <FiLink className="h-7 w-7 cursor-pointer shrink-0" />
    </div>
  )
}
