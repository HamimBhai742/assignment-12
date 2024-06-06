import React, { useEffect, useState } from 'react';
import img11 from '../../assets/Black Gold Elegant Initial Name Beauty and Spa Logo.png'
import useAuth from '../../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';
import { theme } from 'antd';

const Navbar = () => {
    const { logOut, user } = useAuth()
    const handelLogOutBtn = () => {
        logOut()
    }
    const [prevScroll, setPrevScroll] = useState(0)
    const [show, setShow] = useState(true)
    const handelCurretScrol = () => {
        const currentScroll = window.scrollY
        setShow(prevScroll > currentScroll || currentScroll < 50);
        setPrevScroll(currentScroll);
    }

    useEffect(() => {
        window.addEventListener('scroll', handelCurretScrol)
        return () => {
            window.removeEventListener('scroll', handelCurretScrol)
        };
    }, [prevScroll, show]);

    const [them, setThem] = useState(true)
    useEffect(() => {
        const ffff = localStorage.getItem('theme')
        setThem(ffff)
    }, [])
    const handelgg = () => {
        setThem(!them)
        localStorage.setItem('theme', them)
        console.log(them);
    }
    if (them) {
        document.querySelector('html').setAttribute('data-theme', 'dark')
    }
    else {
        localStorage.removeItem('theme', them)
        document.querySelector('html').setAttribute('data-theme', 'light')
    }
    return (
        <div className={`${show ? 'active' : 'hidden'}`}>
            <div className='fixed top-0 z-50'>
                <nav className="relative bg-white shadow dark:bg-gray-800 w-screen font-inter">
                    <div className="container px-6 py-4 mx-auto">
                        <div className="lg:flex lg:items-center lg:justify-between">
                            <div className=" flex items-center gap-3">
                                <img className='w-16 h-16 rounded-full' src={img11} alt="" />
                                <h3 className='text-4xl text-black font-bold font-cinzel'>Contest Carze</h3>
                            </div>
                            <div className="absolute inset-x-0 z-20 w-full px-6 py-2 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                                <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                                    <NavLink to='/' className="px-3 py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform  lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Home</NavLink>
                                    <NavLink to='/all-contests' className="px-3 py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">All
                                        contests</NavLink>
                                    <NavLink to='/' className="px-3 py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform  lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Random Item</NavLink>
                                    <NavLink to='/' className="px-3 py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform  lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Experts</NavLink>
                                </div>
                                <div className='mx-6'>
                                    <label onChange={handelgg} className="swap swap-rotate">

                                        {/* this hidden checkbox controls the state */}
                                        <input type="checkbox" className="theme-controller" value="synthwave" />

                                        {/* sun icon */}


                                        {/* moon icon */}
                                        {them ? <svg className=" text-orange-700 w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg> : <svg className=" fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>}

                                    </label>
                                </div>
                                <div>
                                    {user ? <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button">
                                            <div>
                                                <img className="w-14 h-14 rounded-full" src={user?.photoURL} />
                                            </div>
                                        </div>
                                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                            {/* <li>
                                            <a className="justify-between">
                                                Profile
                                                <span className="badge">New</span>
                                            </a>
                                        </li> */}
                                            <li><Link to='/dashboard'>Dashboard</Link></li>
                                            {/* <li><a>Logout</a></li> */}
                                            <li><button className='' onClick={handelLogOutBtn}>Logout</button></li>
                                        </ul>
                                    </div> : <Link to='/login'><button className='btn btn-accent '>Sign In</button></Link>}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                {/* <img classNameName='w-16 h-16 rounded-full' src={user?.photoURL} alt="" /> */}

            </div>
        </div>
    );
};

export default Navbar;