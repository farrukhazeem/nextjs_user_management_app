import Link from 'next/link';
import Button from './components/Buttons';

export default function Home() {
	return (
		<div className="h-screen flex flex-col justify-center items-center">
			<h1 className="text-7xl break-words">
				This is
				<span className="text-4xl text-slate-400 ml-4">Landing Page</span>
			</h1>
			<h3 className="my-10 text-2xl font-bold">Farrukh Azeem, March 2024</h3>
			<Link href="/signup">
				<Button
					text='Signup'
					type='button'
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				/>
			</Link>
		</div>
	);
}