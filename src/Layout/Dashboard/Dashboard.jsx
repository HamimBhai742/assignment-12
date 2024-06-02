import React from 'react';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex gap-5'>
            <aside id='sidebar' className="flex flex-col w-64 h-screen px-6 py-8 overflow-y-auto text-white font-lato gap-3 bg-slate-900 border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
                <NavLink to='/dashboard/my-perticipated'>My Participated</NavLink>
                <NavLink to='/dashboard/my-winning'>My Winning</NavLink>
                <NavLink to='/dashboard/my-profile'>My Profile</NavLink>
                <NavLink to='/dashboard/add-contest'>Add Contest</NavLink>
                <NavLink to='/dashboard/my-created-contest'>My Created Contest</NavLink>
                <NavLink to='/dashboard/contest-submitted'>Contest Submitted</NavLink>
                <NavLink to='/dashboard/manage-user'>Manage User</NavLink>
                <NavLink to='/dashboard/manage-contest'>Manage Contests</NavLink>
            </aside>

            <div>
                hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
            </div>
        </div>
    );
};

export default Dashboard;