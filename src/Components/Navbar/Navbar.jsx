import React from 'react';
import img11 from '../../assets/Black Gold Elegant Initial Name Beauty and Spa Logo.png'
import useAuth from '../../hooks/useAuth';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const { logOut, user } = useAuth()
    const handelLogOutBtn = () => {
        logOut()
    }
    return (
        <div className='fixed top-0 z-50'>
            <nav className="relative bg-white shadow dark:bg-gray-800 w-screen font-inter">
                <div className="container px-6 py-4 mx-auto">
                    <div className="lg:flex lg:items-center lg:justify-between">
                        <div className=" flex items-center gap-3">
                            <img className='w-16 h-16 rounded-full' src={img11} alt="" />
                            <h3 className='text-4xl font-bold font-cinzel'>Contest Carze</h3>
                        </div>
                        <div className="absolute inset-x-0 z-20 w-full px-6 py-2 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                            <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                                <NavLink to='/' className="px-3 py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform  lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Home</NavLink>
                                <NavLink to='/all-contests' className="px-3 py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">All
                                    contests</NavLink>
                                <NavLink to='/' className="px-3 py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform  lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Random Item</NavLink>
                                <NavLink to='/' className="px-3 py-1 mx-3 mt-2 text-gray-700 transition-colors duration-300 transform  lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Experts</NavLink>
                            </div>

                            <div>
                                {user ? <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-12 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={user?.photoURL} />
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
    );
};

export default Navbar;