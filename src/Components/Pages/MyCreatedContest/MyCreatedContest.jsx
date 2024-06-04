import React from 'react';
import useContest from '../../../hooks/useContest';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { MdDelete } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyCreatedContest = () => {
    const [contest, refetch] = useContest()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const myCreatedContest = contest.filter(c => c.addUserEmail === user?.email)
    console.log(contest);
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
                    refetch()
                }
            }
        });
    }
    return (
        <div className='flex mx-5 gap-5 mt-8'>
            <div className="overflow-x-auto">
                <div className="flex items-center gap-x-3 mb-5">
                    <h2 className="text-2xl text-gray-800 dark:text-white font-lato font-bold">Total My Created Contest</h2>

                    <span className="px-3 py-1  text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 font-bold">{myCreatedContest?.length}</span>
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