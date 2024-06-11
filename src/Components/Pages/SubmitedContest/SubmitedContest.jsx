import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Helmet } from 'react-helmet';
import SubmCard from './SubmCard';
import useSubmit from '../../../hooks/useSubmit';

const SubmitedContest = () => {
    const axiosSecure = useAxiosSecure()
    // const { data: submitContest = [], refetch } = useQuery({
    //     queryKey: ['submitContest'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get('/submited-contest')
    //         return res.data
    //     }
    // })
    const [submitContest] = useSubmit()
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPages = Math.ceil(submitContest?.length / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()]

    const handelSelectedBtn = e => {
        const val = parseInt(e.target.value)
        setItemsPerPage(val)
        setCurrentPage(0)
    }

    const handelPrevBtn = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    // console.log('eeeeeeeeeeee',myCreatedContest);

    const handelNextBtn = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const { data: subContest = [], refetch: reCall } = useQuery({
        queryKey: [currentPage, itemsPerPage, 'subContest'],
        queryFn: async () => {
            const results = await axiosSecure.get(`/submited-contest?page=${currentPage}&size=${itemsPerPage}`)
            // console.log(results.data);
            return results.data;
        }
    })

    console.log(submitContest);
    const handelWinerbtn = async (id, winerId) => {
        const filterWiner = submitContest.filter(s => s.contestId === id)
        console.log(filterWiner);
        const findWiner = submitContest.find(f => f._id === winerId)
        console.log(findWiner);
        const winerSelect = {
            perticipantUserEmail: findWiner?.perticipantUserEmail,
            perticipantUser: findWiner?.perticipantUser,
            perticipateImg: findWiner?.perticipateImg,
            contestsId: findWiner?.contestId

        }
        const res = await axiosSecure.post(`/contest-winer?id=${id}`, winerSelect)
        console.log(res.data);
        reCall()
        // if (res.data.insertedId) {
        //     const result = await axiosSecure.delete(`/contest-winer/${id}`)
        //     console.log(result.data);

        // }
    }
    return (
        <div className='m-5 '>
            <Helmet>
                <title>Submitted Contest</title>
            </Helmet>

            <div className='grid grid-cols-2 gap-5'>
                {
                    subContest.map((sm, idx) => <SubmCard reCall={reCall} sm={sm} key={idx}></SubmCard>)
                }
            </div>
            <div className='text-center flex gap-5 items-center justify-center my-5'>
                <button onClick={handelPrevBtn}><div className='text-xl flex items-center justify-center border-[2px] hover:bg-blue-500 border-blue-500 w-10 h-10 rounded-full'><IoIosArrowBack></IoIosArrowBack></div></button>
                <div className='flex gap-3 '>
                    {
                        pages?.map(page => <button onClick={() => setCurrentPage(page)} className={currentPage === page ? 'rounded-full w-10 h-10 border-[2px] border-blue-500 px-3 bg-blue-500 font-semibold' : 'border-[2px] border-blue-500 w-10 h-10 rounded-full '} key={page}>{page + 1}</button>)
                    }
                </div>
                <button onClick={handelNextBtn}><span className='text-xl flex items-center justify-center border-[2px] hover:bg-blue-500 border-blue-500 w-10 h-10 rounded-full'><IoIosArrowForward></IoIosArrowForward></span></button>
                <select onChange={handelSelectedBtn} defaultValue={itemsPerPage} className=' border-2 h-10 w-28 font-medium font-inter border-slate-600 rounded-lg px-1' id="">
                    <option value="6">6/ Page</option>
                    <option value="10">10 / Page</option>
                    <option value="20">20 / Page</option>
                    <option value="30">50 / Page</option>
                </select>

            </div>
        </div>
    );
};

export default SubmitedContest;