'use client'
import Link from 'next/link';
import React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ResetPasswordPage() {
    
    
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        username: "",
        password: "",
        verifyPassword: "",
    });
    
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false)
    
    const [token, setToken] = useState("")
    const onSubmit =async () => {
        try {
            setLoading(true);
            // verify if passwords are matched
            
            const response = await axios.post("/api/users/resetpassword", {...user, token});

            router.push("/login");   
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }     
    }
    useEffect(() => {
        const urlToken = window.location.href.split('=')[1];
        setToken(urlToken || "");
    }, [])
    useEffect(() => {
        if((user.email.length > 0 && user.username.length > 0) || (user.password.length > 0 && user.verifyPassword.length > 0)){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2"> 
        <h1 className="text-center text-2xl">{ !loading ? "Reset Password" : "Processing..."}</h1>
        <hr />
            { token.length > 0 ? (
                    <>
                    <label htmlFor='password'>password</label>
                        <input 
                            className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                            id='password'
                            type='password'
                            value={user.password}
                            onChange={(e) => setUser({...user, password: e.target.value})}
                            placeholder='password'
                        />
                    <label htmlFor='password'>Verify Password</label>
                    <input 
                        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                        id='verifyPassword'
                        type='password'
                        value={user.verifyPassword}
                        onChange={(e) => setUser({...user, verifyPassword: e.target.value})}
                        placeholder='verify password'
                    />
                    </>
            ) : (
                <>
                <label htmlFor='username'>Username</label>
            <input 
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='username'
                type='text'
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder='username'
            />
            <label htmlFor='email'>Email</label>
            <input 
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
                id='email'
                type='email'
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder='email'
            />
            </>
            )}
            <button
                onClick={onSubmit}
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'>{buttonDisabled ? "No signup" : "Reset Password"}</button>
        </div>
    )
}