'use client'

import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Profile() {
  const [data, setData ] = useState();
  const router = useRouter();
  const onLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      router.push('/login')
    } catch (error: any) {
      console.log(error.message)
    }    
  }
  const getUserDetails = async () => {
      const res = await axios.get('/api/users/getCookieData');
      console.log(res.data);
      setData(res.data.data._id)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2"> 
        <h1>Profile</h1>
        <hr />
        <p>Profile page</p>
        <h2>{data ? ( <Link href={`/profile/${data}`}>GetData</Link>) : "Data has not arrived yet"}</h2>
        <hr />
        <button onClick={onLogout}className='bg-blue-500 mt-4 hover: bg-blue-700 text-black font-bold py-2 px-4 rounded'>
            LogOut
        </button>
        <button onClick={getUserDetails}className='bg-blue-500 mt-4 hover: bg-blue-700 text-black font-bold py-2 px-4 rounded'>
            Display logged in user
        </button>
    </div>
  )
}

export default Profile