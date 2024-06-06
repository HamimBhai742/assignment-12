import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import axios from 'axios';
import useUser from '../../../hooks/useUser';
import Swal from 'sweetalert2';

const Login = () => {
    const [users] = useUser()
    const [showPass, setShowPass] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { loginUser, googleLogin, user } = useAuth()
    const navigate = useNavigate()
    // const [errors, setError] = useState(errors)
    const onSubmit = async (data) => {
        console.log(data);
        loginUser(data.email, data.password)
            .then(res => {
                console.log(res.user);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You have been succcessfully login",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Incorrect your email or password!",
                });
            })
    }
    const loginWithGoogle = () => {
        googleLogin()
            .then(async (res) => {

                console.log(res.user.email);
                const cheaker = users.find(user => user.email === res.user?.email)
                console.log(cheaker);
                console.log(users);
                const usersInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    photoUrl: res.user?.photoURL,
                    status: "Active",
                    role: "User"
                }
                if (!cheaker) {
                    console.log(usersInfo);
                    const res = await axios.post('http://localhost:5000/users', usersInfo)
                    console.log(res.data);

                }
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "You have been succcessfully login",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
    }
    console.log(user);
    const handelShowPass = () => {
        setShowPass(!showPass)
    }
    return (
        <div className='mt-28'>
            <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-[1170px]">
                <div className="hidden bg-cover lg:block lg:w-[650px] relative bbgg">
                    <div className='text-center absolute top-44 left-28'>
                        <h3 className='text-4xl font-bold font-cinzel '>Hi, Welcome Back !</h3>
                        <div>
                            <p className='font-poppins mt-3'>Don't  have an account?</p>
                            <Link to='/register'><button className='text-slate-900 font-semibold border-slate-800 border-2 py-3 px-5 rounded-lg font-inter mt-2'>Sing Up</button></Link>
                        </div>
                    </div>
                </div>
                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2 bg-sky-100">
                    {/* <div className="flex justify-center mx-auto">
                        <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt="" />
                    </div> */}
                    <p className="mt-3 text-4xl text-center font-bold font-cinzel">
                        Sing In
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* <div className="mt-4">
                            <label className="block mb-2 text-sm font-inter font-bold text-gray-600 dark:text-gray-200">Name</label>
                            <input {...register('name', { required: true })} id="LoggingEmailAddress" className="block w-full h-12 px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 border-gray-300" type="text" />
                            {errors.name && <span className='text-[red] font-inter'>This field is required</span>}
                        </div> */}
                        <div className="mt-4">
                            <label className="block mb-2 text-sm font-inter font-bold text-gray-600 dark:text-gray-200">Email</label>
                            <input {...register('email', { required: true })} placeholder='Your email' className="block h-12 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 border-gray-300" type="email" />
                        </div>
                        <div className="mt-4 relative">
                            <label className="block mb-2 text-sm font-inter font-bold text-gray-600 dark:text-gray-200">Password</label>
                            <input {...register('password', { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, minLength: 6, maxLength: 12 })} placeholder='Your password' className="block h-12 w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 border-gray-300" type={showPass ? 'text' : 'password'} />
                            <span className='text-xl absolute top-10 right-5' onClick={handelShowPass}>{showPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</span>
                        </div>
                        {/* <div className="mt-4">
                            <label className="block mb-2 text-sm font-inter font-bold text-gray-600 dark:text-gray-200">Photo URL</label>
                            <input {...register('photo')} id="LoggingEmailAddress" className="block w-full px-4 py-2 h-12 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 border-gray-300" type="url" />
                        </div> */}

                        <div className="mt-6">
                            <button className="w-full bg-sky-600 px-6 py-3 font-inter font-bold tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-purple-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                                Sign In
                            </button>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <span className="w-1/5 border-slate-400 border-b dark:border-gray-600 md:w-1/4"></span>
                            <p className="text-xs text-gray-500 font-inter uppercase dark:text-gray-400 hover:underline">or login with social</p>
                            <span className="w-1/5 border-b border-slate-400 dark:border-gray-600 md:w-1/4"></span>
                        </div>
                        <button onClick={loginWithGoogle} className="flex w-full items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border border-slate-400 rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <div className="px-4 py-2">
                                <svg className="w-6 h-6" viewBox="0 0 40 40">
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                                    <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                                    <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                                    <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                                </svg>

                            </div>

                            <span className="w-5/6 px-4 py-3 font-bold text-center font-poppins">Sign in with Google</span>
                        </button>

                    </form>
                    {/* <div className="flex items-center justify-between mt-4">
                        <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                        <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or login
                            with email</a>

                        <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Login;