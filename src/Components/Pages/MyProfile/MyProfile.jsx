import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import useUser from '../../../hooks/useUser';
import useAuth from '../../../hooks/useAuth';
import { MdEdit } from 'react-icons/md';
import { GrEdit } from 'react-icons/gr';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const MyProfile = () => {
    const { user, updateUserProfile } = useAuth()
    const [users, reUse] = useUser()
    console.log(users);
    const myPro = users.find(us => us.email === user?.email)
    const [edit, setEdit] = useState(false)
    const handeleEditBtn = () => {
        setEdit(!edit)
    }
    console.log(edit);
    const axiosPublic = useAxiosPublic()
    const { register, handleSubmit } = useForm()
    const onSubmit = async (data) => {
        console.log(data);
        updateUserProfile(data.name, data.photourl)
        const updateUsers = {
            name: data.name,
            photoUrl: data.photourl,
            address: data.address
        }
        const res = await axiosPublic.patch(`/users/${user?.email}`, updateUsers)
        console.log(res.data);
        setEdit(false)
        reUse()
    }
    console.log(user.displayName);
    console.log(user.photoURL);
    return (
        <div>
            <Helmet>
                <title>My Profile</title>
            </Helmet>
            <div className="max-w-md p-8 sm:flex sm:space-x-6 bg-blue-100 dark:bg-gray-50 dark:text-gray-800">
                <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                    <img src={myPro?.photoUrl} alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold">{myPro?.name}</h2>
                        <span className="text-sm dark:text-gray-600">{myPro?.email}</span>
                    </div>
                    <div className="space-y-1">
                        <p>
                            {
                                myPro?.address
                            }
                        </p>
                    </div>
                </div>
                <button onClick={handeleEditBtn} className={edit?'text-2xl text-blue-700':'text-2xl'}>
                    <GrEdit></GrEdit>
                </button>
            </div>
            {edit && <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-inter font-bold text-gray-600 dark:text-gray-200">Name</label>
                    <input {...register('name', { required: true })} placeholder='Your Name' className="block h-12 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 border-gray-300" type="text" />
                    <label className="block mb-2 text-sm font-inter font-bold text-gray-600 dark:text-gray-200">Photo URL</label>
                    <input {...register('photourl', { required: true })} placeholder='Your Photo Url' className="block h-12 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 border-gray-300" type="url" />
                    <label className="block mb-2 text-sm font-inter font-bold text-gray-600 dark:text-gray-200">Address</label>
                    <input {...register('address', { required: true })} placeholder='Your Address' className="block h-12 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 border-gray-300" type="text" />
                </div>
                <div className="mt-6">
                    <button className="w-full bg-sky-600 px-6 py-3 font-inter font-bold tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-purple-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                        Update
                    </button>
                </div>
            </form>}
        </div>
    );
};

export default MyProfile;