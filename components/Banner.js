import React from 'react'

export default function Banner({ reddit }) {
  return (
    <div className='flex flex-col border-1 h-32 w-full items-center'>
      <div className='h-3/4 bg-blue-400 w-full'></div>
      <p className='font-bold text-2xl py-1'>r/{reddit}</p>
    </div>
  )
}
