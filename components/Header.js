import React from 'react'
import Image from 'next/image'
import { AiFillHome } from 'react-icons/ai'
import { FiChevronDown } from 'react-icons/fi'
import { BsSearch } from 'react-icons/bs'

export default function Header() {
  return (
    <div className="flex bg-gray-300 h-14 pt-2 pb-2">
      <div className="w-14 h-14 pl-2 pr-2">
        <Image
          src="/logo.png"
          layout="fixed"
          width={40}
          height={40}
          objectFit="contain"
        />
      </div>
      <div className="h-12 hidden md:inline w-14 mr-4">
        <Image
          src="/logoText.png"
          layout="fixed"
          height={40}
          width={56}
          objectFit="contain"
        />
      </div>

      <div className="flex items-center w-14 sm:w-56 hover:outline hover:outline-2 hover:outline-black mr-4 rounded-sm">
        <div className="flex items-center gap-x-1 ml-1">
          <AiFillHome />
          <p className="hidden sm:inline">Home</p>
        </div>

        <FiChevronDown className="ml-auto" />
      </div>

      <form className="flex w-full mr-2">
        <div className="flex h-full w-10 border-2 border-r-0 border-black bg-white justify-center items-center rounded-tl rounded-bl">
          <BsSearch className="h-6 w-5" />
        </div>

        <input
          className="w-full bg-white border-2 border-l-0 border-black rounded-tr rounded-br focus:outline-0"
          placeholder="Search Reddit"
        />
      </form>

      <div>
        <div>
          <img />
          <img />
          <img />
        </div>
        <div>
          <img />
          <img />
          <img />
        </div>
        <div></div>
      </div>
    </div>
  )
}
