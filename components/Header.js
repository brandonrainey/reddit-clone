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

export default function Header({ reddit }) {
  const { data: session } = useSession()

  const [open, setOpen] = useState(null)

  const userMenu = useRef()

  const openMenu = useRef()

  const [homeMenu, setHomeMenu] = useState()

  const closeOpenMenus = (e) => {
    if (
      userMenu.current &&
      open &&
      !userMenu.current.contains(e.target) &&
      !openMenu.current.contains(e.target)
    ) {
      setOpen(false)
    }
  }

  // Do something after component renders
  useEffect(() => {
    document.addEventListener('mousedown', closeOpenMenus)

    // clean up function before running new effect
    return () => {
      document.removeEventListener('mousedown', closeOpenMenus)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <div className="flex border-b h-14 pt-2 pb-2 w-full ">
      <Link href="/">
        <div className="flex w-14 h-full pl-2 pr-2 cursor-pointer items-center">
          <Image
            src="/logo.png"
            layout="fixed"
            width={32}
            height={32}
            objectFit="contain"
            alt="reddit icon"
          />
        </div>
      </Link>

      <Link href="/">
        <div className="h-12 hidden md:inline w-14 mr-4 cursor-pointer">
          <Image
            src="/logoText.png"
            layout="fixed"
            height={40}
            width={56}
            objectFit="contain"
            alt="reddit text"
          />
        </div>
      </Link>

      {/* home */}
      <div className="flex items-center w-14 sm:w-56 hover:outline hover:outline-1 hover:outline-black mr-4 rounded-sm cursor-pointer relative" onClick={() => setHomeMenu(!homeMenu)}>

        {homeMenu ? (<div className='absolute w-56 h-64 border-1 top-10 bg-white'>

        </div>) : null}
        
        <div className="flex items-center gap-x-1 ml-1">
          <AiFillHome />
          <p className="sm:flex hidden ">{`${
            reddit ? `r/${reddit}` : 'Home'
          }`}</p>
        </div>

        <FiChevronDown className="ml-auto" />
      </div>

      {/* search */}
      <form className="flex w-full mr-2 min-w-search hover:border-blue-500 group">
        <div className="flex h-full w-10 border-t-1 border-b-1 border-l-1 border-grey-600 group-hover:border-blue-500 justify-center items-center rounded-tl rounded-bl bg-blue-50">
          <BsSearch className="h-6 w-5" />
        </div>

        <input
          className="w-full bg-blue-50  border-t-1 border-r-1  border-b-1 border-grey-600 group-hover:border-blue-500 rounded-tr rounded-br focus:outline-0"
          placeholder="Search Reddit"
        />
      </form>

      <div className="flex mr-2">
        <div className=" h-full items-center gap-4 pr-2 hidden sm:flex">
          <BsArrowUpRightCircle className="w-5 h-5 cursor-pointer" />
          <BsFilterCircle className="w-5 h-5 cursor-pointer" />
          <BiVideoRecording className="w-5 h-5 cursor-pointer" />
        </div>
        <div className="h-full border-l-half border-grey-700 hidden sm:flex"></div>
        <div className="flex h-full items-center gap-4 pl-2">
          <BsChatDots className="w-5 h-5 cursor-pointer" />
          <FiBell className="w-5 h-5 cursor-pointer" />
          <AiOutlinePlus className="w-5 h-5 cursor-pointer" />
          <BsMegaphone className="w-7 h-7 bg-gray-200 rounded-full p-1 cursor-pointer" />
        </div>
      </div>

      <div
        className={`flex w-40 border-1 border-gray-200 rounded justify-center items-center font-semibold mr-2 gap-2 cursor-pointer relative ${
          session ? 'px-1' : ''
        } `}
        onClick={() => setOpen(!open)}
        ref={userMenu}
      >
        <IoLogoReddit className="w-6 h-full hidden sm:inline" />
        <div className={`${session ? 'flex' : 'hidden'} flex-col`}>
          <p className="truncate text-xs">{session?.user?.name}</p>
          {session ? <p className="text-xs text-gray-400">1 Karma</p> : null}
        </div>

        <FiChevronDown />
      </div>
      {open ? (
        <div
          className="flex absolute border-1 rounded bg-white right-2 top-14 w-48 h-60 shadow justify-center"
          ref={openMenu}
        >
          {session ? (
            <div
              className="flex border-2 border-blue-500 text-blue-500 w-20 text-center justify-center h-8 items-center rounded-2xl mt-12 cursor-pointer"
              onClick={() => signOut()}
            >
              Sign Out
            </div>
          ) : (
            <div
              className="flex border-2 border-blue-500 text-blue-500 w-20 text-center justify-center h-8 items-center rounded-2xl mt-12 cursor-pointer"
              onClick={() => signIn()}
            >
              Sign In
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}
