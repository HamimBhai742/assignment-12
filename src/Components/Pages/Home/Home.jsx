import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import PopularContest from './PopularContest/PopularContest';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import useAuth from '../../../hooks/useAuth';
import useAdmin from '../../../hooks/useAdmin';
import useCreator from '../../../hooks/useCreator';
import useContest from '../../../hooks/useContest';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';

const Home = () => {
    const [isAdmin] = useAdmin()
    const [isCreator] = useCreator()
    const { user } = useAuth()
    const [contest] = useContest()
    const axiosPublic = useAxiosPublic()

    const successContest = contest.filter(c => c.status === 'accept')

    const handelSearchBtn = () => {
        const search = document.getElementById('search').value.toLowerCase()
    }

    const { data: popularContest = [] } = useQuery({
        queryKey: ['popular-contest'],
        queryFn: async () => {
            const res = await axiosPublic.get('/popular/contest')
            return res.data
        }
    })
    console.log(popularContest);

    return (
        <div className='mt-28 mx-5 z-10'>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className='bgbnner1 h-[400px] w-full rounded-md relative'>
                <div className='w-96 absolute top-44 left-96'>
                    <label className="input input-bordered flex items-center gap-2">
                        <input id='search' type="text" className="grow" placeholder="Search....." />
                        <button onClick={handelSearchBtn}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg></button>
                    </label>
                </div>
            </div>
            <HeadingTitle value='Popular Contests'></HeadingTitle>
            <div className='grid grid-cols-3 gap-5'>
                {
                    popularContest?.map((con, idx) => <PopularContest con={con} key={idx}></PopularContest>)
                }
            </div>
        </div>
    );
};

export default Home;