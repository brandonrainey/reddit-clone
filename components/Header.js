import React from 'react'
import Image from 'next/image'

export default function Header() {
  return (
    <div className='flex bg-gray-300 h-14'>
        <div className='p-2 w-14 h-14'>
            <Image src='/logo.png' layout='responsive' width={48} height={48} objectFit='contain'/>
        </div>
        <div className='h-12 md:w-14'>
           <Image src='/logoText.png' layout='responsive' height={48} width={48} objectFit='contain'/> 
        </div>
        
        <div>
            
        </div>
        <input></input>
        <div>
            <div>
                <img/>
                <img/>
                <img/> 
            </div>
            <div>
                <img/>
                <img/>
                <img/> 
            </div>
            <div>

            </div>
        </div>
    </div>
  )
}
