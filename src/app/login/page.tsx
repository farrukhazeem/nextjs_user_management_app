'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '../components/Buttons';

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const onLogin = async () => {
        try {
            setLoading(true);
            const login_url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`
            const response = await axios.post(login_url, user);
            const { status, data } = response;

            if (status === 200) {
                const { user, token } = data;
                localStorage.setItem("auth", token);
                localStorage.setItem("userId", user.id);
                router.push('/profile');
            }
        } catch (error: any) {
            setErr(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="py-10 mb-10 text-slate-400 text-5xl">
                {loading ? "We're logging you in..." : 'Login'}
            </h1>

            <input
                className="w-[350px] text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Please Type Your Email..."
            />

            <input
                className="w-[350px] text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Please Type Your Password..."
            />

            {!buttonDisabled ? 'Login Now' && <Button
                text='Login Now'
                type='button'
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={false}
                onClick={onLogin}
            /> : <Button
                text='Login'
                type='button'
                className="bg-blue-400 text-white font-bold py-2 px-4 rounded"
                disabled={true}
            />}

            <div className="mt-10 font-bold text-red-600">{err}</div>

            <Link href="/signup">
                <p className="mt-10">
                    Do not have an account yet?
                    <span className="font-bold text-green-600 ml-2 cursor-pointer underline">
                        Register your free account now
                    </span>
                </p>
            </Link>


        </div>
    );
}