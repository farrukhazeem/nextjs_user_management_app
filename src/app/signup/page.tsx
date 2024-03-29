'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Button from '../components/Buttons';

export default function SignUpPage() {
	const router = useRouter();

	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
	});
	const [err, setErr] = useState('');
	const [buttonDisabled, setButtonDisabled] = useState(false);

	const [loading, setLoading] = useState(false);

	const onSignUp = async () => {
		try {
			setLoading(true);
			const signup_url = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`
			const response = await axios.post(signup_url, user);
			console.log('signup okay', response.data);
			router.push('/login');
		} catch (error: any) {
			setErr(error.response.data.error);

			console.log('Failed to sign up the user', error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (
			user.username.length > 0 &&
			user.email.length > 0 &&
			user.password.length > 0
		) {
			setButtonDisabled(false);
		} else {
			setButtonDisabled(true);
		}
	}, [user]);

	return (
		<div className="flex flex-col items-center justify-center min-h-screen py-2">
			<h1 className="py-10 mb-10 text-slate-400 text-5xl">
				{loading ? 'Processing...' : 'Register Your Account'}

			</h1>

			<input
				className="w-[350px] text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
				id="username"
				type="text"
				value={user.username}
				onChange={(e) => setUser({ ...user, username: e.target.value })}
				placeholder="Your Username..."
			/>

			<input
				className="w-[350px] text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
				id="email"
				type="text"
				value={user.email}
				onChange={(e) => setUser({ ...user, email: e.target.value })}
				placeholder="Your Email..."
			/>

			<input
				className="w-[350px] text-slate-800 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
				id="password"
				type="password"
				value={user.password}
				onChange={(e) => setUser({ ...user, password: e.target.value })}
				placeholder="Your Password..."
			/>
			{!buttonDisabled ? 'Register My Account Now' && <Button
				text='Register My Account Now'
				type='button'
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				disabled={false}
				onClick={onSignUp}
			/> : <Button
				text='Register'
				type='button'
				className="bg-blue-400 text-white font-bold py-2 px-4 rounded"
				disabled={true}
			/>}

			<div className="mt-10 font-bold text-red-600">{err}</div>

			<Link href="/login">
				<p className="mt-10 text-slate-500">
					Do you have a free account already?{' '}
					<span className="font-bold text-green-600 ml-2 cursor-pointer underline">
						Login to your account
					</span>
				</p>
			</Link>


		</div>
	);
}