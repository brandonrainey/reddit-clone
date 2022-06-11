import React, { useEffect } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase'

export default function makePost() {

    const colRef = collection(db, 'users')

    const sendPost = async (e) => {
        e.preventDefault()
        await addDoc(colRef, {
            idk: 'stuffff',
            idc: 'more sutff'
        })
        
    }

    


  return (
    <form onSubmit={sendPost}>
        <input className='w-40'></input>
        <button type='submit' className='border'>Submit</button>
    </form>
  )
}
