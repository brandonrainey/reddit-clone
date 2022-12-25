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
import { useRedditContext } from '../components/context/reddit'
import { useRouter } from 'next/router'

export default function Header({}) {
  const { data: session } = useSession()

  const {
    reddit,
    setReddit,
    communities,
    setOpenCreate,
  } = useRedditContext()

  const router = useRouter()

  const [open, setOpen] = useState(null)

  const userMenu = useRef()

  const openMenu = useRef()

  const homeList = useRef()

  const homeButton = useRef()

  const [homeMenu, setHomeMenu] = useState(null)

  const closeOpenMenus = (e) => {
    if (
      userMenu.current &&
      open &&
      !userMenu.current.contains(e.target) &&
      !openMenu.current.contains(e.target)
    ) {
      setOpen(false)
    }

    if (
      homeButton.current &&
      homeMenu &&
      !homeButton.current.contains(e.target) &&
      !homeList.current.contains(e.target)
    ) {
      setHomeMenu(false)
    }
  }

  //closes menus when clicked outside
  useEffect(() => {
    document.addEventListener('mousedown', closeOpenMenus)

    return () => {
      document.removeEventListener('mousedown', closeOpenMenus)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, homeMenu])

  return (
    <header className="flex border-b h-14 pt-2 pb-2 w-full  bg-white">
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
      <nav
        className="flex items-center w-14 sm:w-56 hover:outline hover:outline-1 hover:outline-black mr-4 rounded-sm cursor-pointer relative"
        onClick={() => setHomeMenu(!homeMenu)}
        ref={homeButton}
      >
        {homeMenu ? (
          <div
            className="absolute w-56 h-auto border-1 top-10 bg-white  flex flex-col rounded"
            ref={homeList}
          >
            <p className="pb-4 text-gray-700 font-semibold pl-2 pt-2">
              Communites
            </p>
            <div className="flex flex-col w-full">
              <div
                className="flex gap-2 pl-2 py-1 mb-1 hover:bg-blue-100"
                onClick={() => {
                  setOpenCreate(true)
                  router.push('/')
                }}
              >
                <AiOutlinePlus className="h-6 w-6" />
                <p>Create a Community</p>
              </div>
              {communities?.map((item, index) => (
                <div
                  className="hover:bg-blue-100 py-1 pl-4 tracking-wide "
                  onClick={() => {
                    setReddit(item)
                    setHomeMenu(false)
                    router.push(`/`)
                  }}
                  key={index}
                >
                  r/{item}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div className="flex items-center gap-x-1 ml-1">
          <AiFillHome />
          <p className="sm:flex hidden font-medium">{`${
            reddit ? `r/${reddit}` : 'Home'
          }`}</p>
        </div>

        <FiChevronDown className="ml-auto" />
      </nav>

      {/* search */}
      <form className="flex w-full mr-2 min-w-search hover:border-blue-500 group">
        <div className="flex h-full w-10 border-t-1 border-b-1 border-l-1 border-grey-600 group-hover:border-blue-500 justify-center items-center rounded-tl rounded-bl bg-blue-50" >
          <BsSearch className="h-6 w-5" />
        </div>

        <input
          className="w-full bg-blue-50  border-t-1 border-r-1  border-b-1 border-grey-600 group-hover:border-blue-500 rounded-tr rounded-br focus:outline-0 rounded-none focus:outline-none"
          placeholder={`Search`}
          disabled={true}
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
          <BsMegaphone
            className={`w-7 h-7 bg-gray-200 rounded-full p-1 cursor-pointer ${
              session ? 'hidden' : null
            }`}
          />
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

        {session ? (
          <div className={`flex flex-col `}>
            <p className="truncate text-xs">{session?.user?.name}</p>
            {session ? <p className="text-xs text-gray-400">1 Karma</p> : null}
          </div>
        ) : null}

        <FiChevronDown />
      </div>
      {open ? (
        <div
          className="flex absolute border-1 rounded bg-white right-2 top-14 w-48 h-40 shadow justify-center z-20"
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
    </header>
  )
}
