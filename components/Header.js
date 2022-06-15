import React, { useState } from 'react'
import Image from 'next/image'
import { AiFillHome, AiOutlinePlus } from 'react-icons/ai'
import { FiChevronDown, FiBell } from 'react-icons/fi'
import {
  BsSearch,
  BsArrowUpRightCircle,
  BsFilterCircle,
  BsChatDots,
  BsMegaphone,
} from 'react-icons/bs'
import { BiVideoRecording } from 'react-icons/bi'
import { IoLogoReddit } from 'react-icons/io'
import { signIn, signOut, useSession } from 'next-auth/react'

export default function Header() {
  const {data : session} = useSession()

  const [open, setOpen] = useState(false)

  return (
    <div className="flex border-b h-14 pt-2 pb-2 w-full">
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

      <div className="flex items-center w-14 sm:w-56 hover:outline hover:outline-2 hover:outline-black mr-4 rounded-sm cursor-pointer">
        <div className="flex items-center gap-x-1 ml-1">
          <AiFillHome />
          <p className="hidden sm:inline">Home</p>
        </div>

        <FiChevronDown className="ml-auto" />
      </div>

      <form className="flex w-full mr-2">
        <div className="flex h-full w-10 border border-r-0 border-black bg-white justify-center items-center rounded-tl rounded-bl">
          <BsSearch className="h-6 w-5" />
        </div>

        <input
          className="w-full bg-white border border-l-0 border-black rounded-tr rounded-br focus:outline-0"
          placeholder="Search Reddit"
        />
      </form>

      <div className="flex mr-2">
        <div className=" h-full items-center gap-4 pr-2 hidden sm:flex">
          <BsArrowUpRightCircle className="w-6 h-6 cursor-pointer" />
          <BsFilterCircle className="w-6 h-6 cursor-pointer" />
          <BiVideoRecording className="w-6 h-6 cursor-pointer" />
        </div>
        <div className="h-full border-x border-black hidden sm:inline"></div>
        <div className="flex h-full items-center gap-4 pl-2">
          <BsChatDots className="w-6 h-6 cursor-pointer" />
          <FiBell className="w-6 h-6 cursor-pointer" />
          <AiOutlinePlus className="w-6 h-6 cursor-pointer" />
          <BsMegaphone className="w-8 h-8 bg-gray-200 rounded-full p-1 cursor-pointer" />
        </div>
      </div>

      <div className="flex w-40 border border-gray-200 rounded justify-center items-center font-semibold mr-2 gap-2 cursor-pointer relative" onClick={() => setOpen(!open)}>
        <IoLogoReddit className="w-6 h-full hidden sm:inline" />
        <FiChevronDown />
      </div>
      {open ? (<div className='absolute border rounded bg-gray-600 right-2 top-12 w-48 h-96'>
        {session ? (<div className='bg-blue-400' onClick={() => signOut()}>Sign Out</div>) : (<div className='bg-blue-400' onClick={() => signIn()}>Sign In</div>)}
        
      </div>) : null}
      
    </div>
  )
}
