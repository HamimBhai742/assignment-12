import React from 'react';
import { FaArrowRightFromBracket } from 'react-icons/fa6';
import { NavLink, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Dashboard = () => {
    const { logOut, user } = useAuth()
    const handelLogOutBtn = () => {
        logOut()
    }
    return (
        <div className='flex gap-5'>
            <aside id='sidebar' className="flex flex-col fixed w-64 h-screen px-6 py-8 overflow-y-auto text-white font-lato gap-3 bg-slate-900 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <NavLink to='/'>Home</NavLink>
                <NavLink to='/dashboard/my-perticipated'>My Participated</NavLink>
                <NavLink to='/dashboard/my-winning'>My Winning</NavLink>
                <NavLink to='/dashboard/my-profile'>My Profile</NavLink>
                <NavLink to='/dashboard/add-contest'>Add Contest</NavLink>
                <NavLink to='/dashboard/my-created-contest'>My Created Contest</NavLink>
                <NavLink to='/dashboard/contest-submitted'>Contest Submitted</NavLink>
                <NavLink to='/dashboard/manage-users'>Manage User</NavLink>
                <NavLink to='/dashboard/manage-contest'>Manage Contests</NavLink>
                <button onClick={handelLogOutBtn} className='flex gap-2 items-center'>Logout <FaArrowRightFromBracket></FaArrowRightFromBracket></button>
            </aside>

            <div className='ml-64'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;