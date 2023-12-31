
'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const onSignIn =async () => {
        // send to db here for authentication and authorization 

        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            
            router.push('/profile');
            
        } catch (error: any) {
            
        } finally {
            setLoading(false);
        }
       
    }
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-center text-2xl">{loading ? 'Processing' : 'Login'}</h1>
            <hr />
            <label htmlFor='email'>Email</label>
            <input 
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='email'
                type='email'
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder='email'
            />
            <label htmlFor='password'>password</label>
            <input 
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='password'
                type='password'
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder='password'
            />
            <button
                onClick={onSignIn}
                disabled={buttonDisabled}
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>Login</button>
                <Link href="/resetpassword">Reset Password</Link>
                <Link href="/signup">Visit Signup Page</Link>
        </div>
    )
}