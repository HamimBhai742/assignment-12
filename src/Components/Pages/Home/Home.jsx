import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import PopularContest from './PopularContest/PopularContest';
import HeadingTitle from '../../HeadingTitle/HeadingTitle';
import useAuth from '../../../hooks/useAuth';
import useAdmin from '../../../hooks/useAdmin';
import useCreator from '../../../hooks/useCreator';
import useContest from '../../../hooks/useContest';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { Helmet } from 'react-helmet';
import useConWiner from '../../../hooks/useConWiner';
import { FaStar } from 'react-icons/fa';
import useUser from '../../../hooks/useUser';

const Home = () => {
    const [isAdmin] = useAdmin()
    const [isCreator] = useCreator()
    const [users] = useUser()
    const { user } = useAuth()
    const [contest] = useContest()
    const axiosPublic = useAxiosPublic()
    const [contestWiner] = useConWiner()
    const [popularContests, setPopularContests] = useState([])

    // const successContest = contest.filter(c => c.status === 'accept')
    const handelSearchBtn = async () => {
        const search = document.getElementById('search').value
        // setSearch(searchss);
        const result = await axiosPublic.get(`/populars/contests?search=${search}`)
        setPopularContests(result.data);

    }

    const { data: popularCon = [] } = useQuery({
        queryKey: ['popularCon'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/popular/contest`)
            setPopularContests(res.data)
            return res.data
        }
    })
    console.log(popularCon);
    console.log(users);
    const creator = users.filter(c => c.role === 'Creator')
    console.log(creator);
    return (
        <div className='md:mt-28 mt-16 md:mx-5 z-10 mx-3'>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <div className='bgbnner1 h-[400px] w-full rounded-md relative'>
                <div className='md:w-96 absolute top-44 md:left-96 left-16'>
                    <label className="input input-bordered flex items-center gap-2 ">
                        <input id='search' type="text" className="grow " placeholder="Search....." />
                        <button onClick={handelSearchBtn}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-5 h-5 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg></button>
                    </label>
                </div>
            </div>
            <HeadingTitle value='Popular Contests'></HeadingTitle>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    popularContests?.map((con, idx) => <PopularContest con={con} key={idx}></PopularContest>)
                }
            </div>
            <div className='mt-8'>
                <HeadingTitle value='Winner Contests'></HeadingTitle>

                {
                    contestWiner.length === 0 ?
                        <div className='text-center font-lato mb-3 '>
                            <h3 className='text-2xl font-semibold'>No winners found yet </h3>

                        </div>
                        :
                        <div className='text-center font-lato mb-3 '>
                            <h3 className='text-2xl font-semibold'>Congratulations </h3>
                            <p>To the winners of the competition</p>
                        </div>
                }
                <div className='grid grid-cols-2 md:grid-cols-5 gap-3'>
                    {
                        contestWiner.map(win => <>
                            <div >
                                <div className='bg-green-100 font-inter rounded-lg space-y-2 p-5 text-center'>
                                    <div className='flex justify-center'>
                                        <img className='w-16  h-16 rounded-full' src={win?.perticipateImg} alt="" />
                                    </div>
                                    <h3 className='font-bold text-xl'>{win?.perticipantUser}</h3>
                                    <p className='text-amber-400 flex gap-1 justify-center'>
                                        <FaStar></FaStar>
                                        <FaStar></FaStar>
                                        <FaStar></FaStar>
                                        <FaStar></FaStar>
                                        <FaStar></FaStar>
                                    </p>
                                    <p>
                                        Thank you for your enthusiasm and hard
                                        work to take part in the math competition
                                    </p>
                                </div>
                            </div>
                        </>)
                    }
                </div>
            </div>

            <div>
                <HeadingTitle value='Best Contest Creator'></HeadingTitle>
                <div className='grid md:grid-cols-3 grid-cols-1 gap-3'>
                    {
                        creator.map(cr => <>
                            <div className='flex gap-3 items-center'>
                                <img className='rounded-lg w-20 h-20' src={cr?.photoUrl} alt="" />
                                <div className='font-inter'>
                                    <p className='font-bold text-lg'>{cr?.name}</p>
                                    <p className='text-sm'>{cr?.email}</p>
                                    <p className='text-green-600 font-medium'>{cr?.role}</p>
                                </div>
                            </div>
                        </>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;