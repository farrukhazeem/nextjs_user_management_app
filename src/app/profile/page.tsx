'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Button from '../components/Buttons';

export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        email: '',
        avatar: ''
    });

    const logoutTheUser = async () => {
        try {
            localStorage.removeItem("auth");
            localStorage.removeItem("userId");
            router.push('/login');
        } catch (error: any) {
            console.log('Ups! We could not logout the user', error.message);
        }
    };

    useEffect(() => {
        const userId = localStorage.getItem("userId");
        const url = `${process.env.NEXT_PUBLIC_API_URL}/api/profile/getUserbyId/${userId}`;

        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const json = await response.json();
                const { username, email, avatar } = json.data;
                setUser({ username, email, avatar });
            } catch (error) {
            }
        };

        fetchData();
    }, []);

    return (
        <div className="mx-5">
            <div className="my-5 flex justify-end">
                <Button
                    text='Logout'
                    type='button'
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    onClick={logoutTheUser}
                />
            </div>
            <h1 className="text-green-600 text-5xl text-center py-10">
                Your Profile
            </h1>
            <div>
                <div className="profile">
                    <div className="mb-4">
                        <label className="text-blue-600 font-semibold block">Avatar:</label>
                        <img src={user && user.avatar ? user.avatar : "/images/default_avatar.png"} alt="Avatar" className="w-16 h-16 rounded-full mt-1" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="text-blue-600 font-semibold block">Username:</label>
                        <input type="text" id="username" value={user.username} readOnly className="border rounded-md p-2 w-full" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="text-blue-600 font-semibold block">Email:</label>
                        <input type="email" id="email" value={user.email} readOnly className="border rounded-md p-2 w-full" />
                    </div>
                </div>
                <div className="mt-5 flex justify-center">
                    <Button
                        text='Edit'
                        type='button'
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => router.push('/updateProfile')}
                    />
                </div>
            </div>
        </div>
    );
}
