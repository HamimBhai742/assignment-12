import React, { useEffect, useState } from 'react';
import useContest from '../../../hooks/useContest';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useUser from '../../../hooks/useUser';
import { FaArrowLeft, FaArrowRight, FaRegComment } from 'react-icons/fa6';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useQuery } from '@tanstack/react-query';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Helmet } from 'react-helmet';

const ManageContest = () => {
    const [contest,reCall] = useContest()
    const [creator, setCreator] = useState()
    const { user } = useAuth()
    const [users] = useUser()
    const axiosSecure = useAxiosSecure()
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPages = Math.ceil(contest?.length / itemsPerPage)
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
    const handelNextBtn = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const { data: contests = [], refetch } = useQuery({
        queryKey: [currentPage, itemsPerPage, 'contests'],
        queryFn: async () => {
            const results = await axiosSecure.get(`/contests?page=${currentPage}&size=${itemsPerPage}`)
            // console.log(results.data);
            return results.data;
        }
    })
    // console.log(contests);

    const handelAproveBtn = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to confirmed this contest!!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Confirm!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/contest/admin/${id}`)
                // console.log(res.data);
                Swal.fire({
                    title: "Confirmed!",
                    text: "Contest accept successfully.",
                    icon: "success"
                });
                refetch()
            }
        });
    }
    const hadelCreatorId = (id) => {
        // console.log(id);
        const findCreator = contest.find(c => c._id === id)
        setCreator(findCreator)
    }
    // console.log(usd);
    const handleSubmitBtn = async (e) => {
        // console.log(usd);
        e.preventDefault()
        const comments = e.target.comment.value
        // console.log(comments);
        const commetAdmin = users.find(u => u.email === user.email)
        // console.log(commetAdmin);
        const currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const currentDate = new Date().toISOString().slice(0, 10).split('-').reverse().join('-')
        const currentDateAndTime = currentTime + ", " + currentDate
        // console.log(currentDateAndTime);
        // console.log(usd);
        const commentInfo = {
            commenterAdmin: commetAdmin.name,
            commenterImg: commetAdmin.photoUrl,
            comment: comments,
            commentDate: currentDateAndTime,
            creatorEmail: creator?.addUserEmail
        }
        // console.log(commentInfo);
        const res = await axiosSecure.post('/comments', commentInfo)
        // console.log(res.data);
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Comment added succcesfully",
                showConfirmButton: false,
                timer: 1500
            });
            e.target.reset()
        }
    }

    const handelContestDeleteBtn = async (id) => {
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
                const result = await axiosSecure.delete(`/contest/admin/${id}`)
                console.log(result.data);
                if (result.data.deletedCount > 0) {
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

    // console.log(typeof count);
    return (
        <div className='ml-16 mt-8'>
            <Helmet>
                <title>Manage Contest</title>
            </Helmet>
            <div className="flex items-center gap-x-3">
                <h2 className="text-2xl text-gray-800 dark:text-white font-lato font-bold">Total Contest</h2>

                <span className="px-3 py-1  text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 font-bold">{contest?.length}</span>
            </div>
            <div className="overflow-x-auto mt-3">
                <table className="table">
                    {/* head */}
                    <thead className='font-inter'>
                        <tr>
                            <th>Sl.</th>
                            <th>Contest Image</th>
                            <th>Contest Name</th>
                            <th>Deadline</th>
                            <th>Contest Price</th>
                            <td>Status</td>
                            <td>Reasons for not accepting</td>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='font-lato'>
                        {
                            contests.map((con, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td><img className='w-14 h-14 rounded-lg' src={con.contestImg} alt="" /></td>
                                <td>{con.contestName}</td>
                                <td>{con.deadLine}</td>
                                <td>${con.contestPrice}</td>
                                <td><button disabled={con?.status === 'accept'} onClick={() => handelAproveBtn(con._id)}>{con?.status === 'accept' ? <span className='bg-green-200 font-semibold px-3 py-2 rounded-full text-green-600'>Confirmed</span> : <span className='bg-rose-200 font-semibold px-3 py-2 rounded-full text-rose-600'>Confirm</span>}</button></td>
                                <td>{/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button disabled={con.status === 'accept'} defaultValue={con._id} className="btn" onClick={() => document.getElementById('my_modal_2').showModal() || hadelCreatorId(con._id)}>Comment <span className='text-xl'><FaRegComment></FaRegComment></span></button>
                                    <dialog id="my_modal_2" className="modal">
                                        <div className="modal-box w-64 font-inter">
                                            <p className="pb-2">Please give me your feedback!</p>
                                            <form onSubmit={handleSubmitBtn}>
                                                <textarea name='comment' className="textarea textarea-bordered" placeholder="Comment"></textarea>
                                                {/* <input {...register("sname")} type="text" /> */}
                                                {/* <button className='btn'>Submit</button> */}
                                                <input type="submit" className='btn mt-3 ml-28 font-semibold btn-primary' value="Comment" />
                                            </form>
                                        </div>
                                        <form method="dialog" className="modal-backdrop">
                                            <button>close</button>
                                        </form>
                                    </dialog></td>
                                <td><button onClick={() => handelContestDeleteBtn(con._id)} className='text-2xl'><RiDeleteBin6Line></RiDeleteBin6Line></button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
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
                    <option value="5">5 / Page</option>
                    <option value="10">10 / Page</option>
                    <option value="20">20 / Page</option>
                    <option value="30">50 / Page</option>
                </select>

            </div>
        </div >
    );
};

export default ManageContest;