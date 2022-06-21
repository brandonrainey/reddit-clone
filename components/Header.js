import React, { useState, useRef, useEffect } from 'react'
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
import Link from 'next/link'

export default function Header() {
  const { data: session } = useSession()

  const [open, setOpen] = useState(null)

  const userMenu = useRef()

  const openMenu = useRef()

  

  

  const closeOpenMenus = (e)=>{
    if(userMenu.current && open && !userMenu.current.contains(e.target) && !openMenu.current.contains(e.target)){
      setOpen(false)
    }
}

  // Do something after component renders
  useEffect(() => {
    document.addEventListener('mousedown', closeOpenMenus);

    // clean up function before running new effect
    return () => {
        document.removeEventListener('mousedown', closeOpenMenus);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])


  return (
    <div className="flex border-b h-14 pt-2 pb-2 w-full">

      <Link href='/'>
        <div className="w-14 h-14 pl-2 pr-2 cursor-pointer">
        <Image
          src="/logo.png"
          layout="fixed"
          width={40}
          height={40}
          objectFit="contain"
          alt='reddit icon'
        />
      </div>
      </Link>
      

      <Link href='/'>
        <div className="h-12 hidden md:inline w-14 mr-4 cursor-pointer">
        <Image
          src="/logoText.png"
          layout="fixed"
          height={40}
          width={56}
          objectFit="contain"
          alt='reddit text'
        />
      </div>
      </Link>
      

      <div className="flex items-center w-14 sm:w-56 hover:outline hover:outline-2 hover:outline-black mr-4 rounded-sm cursor-pointer">
        <div className="flex items-center gap-x-1 ml-1">
          <AiFillHome />
          <p className="hidden sm:inline">Home</p>
        </div>

        <FiChevronDown className="ml-auto" />
      </div>

      <form className="flex w-full mr-2 min-w-search">
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

      <div
        className={`flex w-40 border border-gray-200 rounded justify-center items-center font-semibold mr-2 gap-2 cursor-pointer relative ${session ? 'px-1' : ''} `}
        onClick={() => setOpen(!open)} ref={userMenu}
      >

        <IoLogoReddit className="w-6 h-full hidden sm:inline" />
        <div className='flex flex-col'>
          <p className='truncate text-xs'>{session?.user?.name}</p>
          {session ? (<p className='text-xs text-gray-400'>1 Karma</p>) : null}
          
        </div>
        
        <FiChevronDown />
      </div>
      {open ? (
        <div className="flex absolute border rounded bg-white right-2 top-12 w-48 h-96 shadow justify-center" ref={openMenu}>
          {session ? (
            <div className="flex border-2 border-blue-500 text-blue-500 w-20 text-center justify-center h-8 items-center rounded-2xl mt-12 cursor-pointer" onClick={() => signOut()}>
              Sign Out
            </div>
          ) : (
            <div className="flex border-2 border-blue-500 text-blue-500 w-20 text-center justify-center h-8 items-center rounded-2xl mt-12 cursor-pointer" onClick={() => signIn()}>
              Sign In
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
