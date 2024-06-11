import React, { useState } from 'react';
import useContest from '../../../hooks/useContest';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Helmet } from 'react-helmet';

const MyCreatedContest = () => {
    const [contest, reCall] = useContest()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const myContest = contest.filter(c => c.addUserEmail === user?.email)
    // const [myCon, setMyCon] = useState(myContest)
    // console.log(contest);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPages = Math.ceil(myContest?.length / itemsPerPage)
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

    const { data: myCreatedContest = [], refetch } = useQuery({
        queryKey: [currentPage, itemsPerPage, 'myCreatedContest'],
        queryFn: async () => {
            const results = await axiosSecure.get(`/my-contests/${user?.email}?page=${currentPage}&size=${itemsPerPage}`)
            // console.log(results.data);
            return results.data;
        }
    })

    console.log(myCreatedContest);

    const { data: adminComment = [] } = useQuery({
        queryKey: ["adminComment"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/comments/${user?.email}`)
            return res.data
        }
    })
    console.log(adminComment);
    const handelEditBtn = (id) => {
        console.log(id);
        navigate(`/dashboard/update-contest/${id}`)
    }
    const handelDeleteBtn = async (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You want to be delete this contest!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/my-contest/${id}`)
                console.log(res.data);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Contest deleted successfully.",
                        icon: "success"
                    });
                    reCall()
                    refetch()
                }
            }
        });
    }
    return (
        <div className='flex mx-5 gap-5 mt-8'>
             <Helmet>
                <title>My Created Contest</title>
            </Helmet>
            <div className="overflow-x-auto">
                <div className="flex items-center gap-x-3 mb-5">
                    <h2 className="text-2xl text-gray-800 dark:text-white font-lato font-bold">Total My Created Contest</h2>

                    <span className="px-3 py-1  text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 font-bold">{myContest?.length}</span>
                </div>
                <table className="table">
                    {/* head */}
                    <thead className='font-inter text-slate-800'>
                        <tr>
                            {/* <th>Sl.</th> */}
                            <th>Contest Image</th>
                            <th>Contest Name</th>
                            <th>Deadline</th>
                            <th>Contest Price</th>
                            <td className='text-center'>Status</td>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody className='font-lato'>
                        {
                            myCreatedContest.map((con, idx) => <tr key={idx}>
                                {/* <th>{idx + 1}</th> */}
                                <td><img className='w-14 h-14 rounded-lg' src={con.contestImg} alt="" /></td>
                                <td>{con.contestName}</td>
                                <td>{con.deadLine}</td>
                                <td className='text-center'>${con.contestPrice}</td>
                                <td>{con?.status === 'accept' ? <span className='bg-blue-100 text-blue-600 font-semibold px-3 py-2 rounded-full'>Accepted</span> : <span className='bg-pink-100 text-pink-600 font-semibold px-3 py-2 rounded-full'>Pending</span>}</td>
                                {/* <td>{con?.comment}</td> */}
                                <td><button onClick={() => handelEditBtn(con._id)} disabled={con?.status !== 'accept'} className='text-xl'><FaEdit></FaEdit></button></td>
                                <td><button onClick={() => handelDeleteBtn(con._id)} disabled={con?.status !== 'accept'} className='text-xl'><MdDelete></MdDelete></button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
                <div className='text-center flex gap-5 items-center justify-center my-5'>
                    <button onClick={handelPrevBtn}><div className='text-xl flex items-center justify-center border-[2px] hover:bg-blue-500 border-blue-500 w-10 h-10 rounded-full'><IoIosArrowBack></IoIosArrowBack></div></button>
                    <div className='flex gap-3 '>
                        {
                            pages?.map(page => <button onClick={() => setCurrentPage(page)} className={currentPage === page ? 'rounded-full w-10 h-10 border-[2px] border-blue-500 px-3 bg-blue-500 font-semibold' : 'border-[2px] border-blue-500 w-10 h-10 rounded-full '} key={page}>{page + 1}</button>)
                        }
                    </div>
                    <button onClick={handelNextBtn}><span className='text-xl flex items-center justify-center border-[2px] hover:bg-blue-500 border-blue-500 w-10 h-10 rounded-full'><IoIosArrowForward></IoIosArrowForward></span></button>
                    <select onChange={handelSelectedBtn} defaultValue={itemsPerPage} className=' border-2 h-10 w-28 font-medium font-inter border-slate-600 rounded-lg px-1' id="">
                        <option value="5">5 / Page</option>
                        <option value="10">10 / Page</option>
                        <option value="20">20 / Page</option>
                        <option value="30">50 / Page</option>
                    </select>

                </div>
            </div>
            <div className='mt-24'>
                {
                    adminComment.map(adc => <>
                        <div className='bg-blue-100 mt-3 w-64  px-3 py-2 rounded-lg'>
                            <div className='flex gap-3 items-start'>
                                <img className='w-10 h-10 rounded-full' src={adc?.commenterImg} alt="" />
                                <div>
                                    <h5 className='text-sm'>{adc.commenterAdmin}</h5>
                                    <p className='text-sm'>{adc.commentDate}</p>
                                </div>
                            </div>
                            <p className='mt-2 font-lato'>{adc.comment}</p>
                        </div>
                    </>)
                }
            </div>

        </div>
    );
};

export default MyCreatedContest;