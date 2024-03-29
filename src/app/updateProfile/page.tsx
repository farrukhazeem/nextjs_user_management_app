'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Button from '../components/Buttons';

export default function UpdateProfilePage() {
  const router = useRouter();

  const [file, setFile] = useState('');
  const [user, setUser] = useState({
    username: '',
    email: '',
    avatar: ''
  });

  const [formData, setFormData] = useState({
    username: '',
    // fullName: '',
    email: '',
    // city:'',
    // country:''
  });

  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/profile/getUserbyId/${userId}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      const username = json.data.username;
      const email = json.data.email;
      const avatar = json.data.avatar;

      setUser({
        username: username,
        email: email,
        avatar: avatar
      });


    } catch (error) {
    }
  };

  useEffect(() => {

    fetchData();
  }, []);


  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const onCancel = () => {
    router.back();
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.set('file', file);
    const userId = localStorage.getItem("userId");
    const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/updateAvatar/${userId}`, {
      method: "PATCH",
      body: data
    });
    fetchData();

  }
  const updateChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const UpdateSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/profile/updateUser/${userId}`;

      const response = await axios.patch(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      router.push('/profile');
    } catch (error) {
    }


  };

  return (
    <div className="mx-5">
      <h1 className="text-green-600 text-5xl text-center py-10">

        Update your Profile
      </h1>
      <figure className="flex items-start sm:items-center">
        <div className="relative">
          <img
            className="w-16 h-16 rounded-full mr-4"
            src={user && user.avatar ? user.avatar : "/images/default_avatar.png"}
            alt={"user avatar"}
          />
        </div>
        <figcaption>
          <h5 className="text-blue-600 font-semibold text-lg">{user.username}</h5>
        </figcaption>
      </figure>


      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
        />
        <Button
          text='Upload'
          type='submit'
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

        />
      </form>

      <h3 className="font-bold text-blue-500"> Profile Information </h3>

      <form onSubmit={UpdateSubmit}>
        <div className="mb-4">
          <label className="text-blue-600 font-semibold block">Username:</label>
          <input
            className="border rounded-md p-2 w-full"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={updateChange}
          />
        </div>

        <div className="mb-4">
          <label className="text-blue-600 font-semibold block">Email:</label>
          <input
            className="border rounded-md p-2 w-full"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={updateChange}
          />
        </div>
        <div className="mt-5 flex justify-center">
          <div className="flex space-x-4">

            <Button
              text='Update Profile'
              type='submit'
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

            />

            <Button
              text='Cancel'
              onClick={onCancel}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            />

          </div>
        </div>
      </form>


    </div>


  );
}




