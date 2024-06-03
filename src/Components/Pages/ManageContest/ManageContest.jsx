import React, { useState } from 'react';
import useContest from '../../../hooks/useContest';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { TfiCommentsSmiley } from 'react-icons/tfi';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import useUser from '../../../hooks/useUser';
import { FaRegComment } from 'react-icons/fa6';

const ManageContest = () => {
    // const { register, handleSubmit, control, reset } = useForm()
    const [contest, refetch] = useContest()
    const [usd, setUsd] = useState()
    console.log(contest);
    const { user } = useAuth()
    const [users] = useUser()
    const axiosSecure = useAxiosSecure()
    const handelAproveBtn = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to be delete this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.patch(`/contest/admin/${id}`)
                // console.log(res.data);
                Swal.fire({
                    title: "Deleted!",
                    text: "User deleted successfully.",
                    icon: "success"
                });
                refetch()
            }
        });
    }
    const hadel = (id) => {
        console.log(id);
        const us = contest.find(c => c._id === id)
        // console.log(us);
        setUsd(us)
    }
    // const onSubmit = async (data) => {
    //     console.log(data);
    // }
    console.log(usd);
    const handleSubmitBtn = async (e) => {
        // console.log(usd);
        e.preventDefault()
        const comments = e.target.comment.value
        // console.log(comments);
        const commetAdmin = users.find(u => u.email === user.email)
        console.log(commetAdmin);
        const currentTime = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        const currentDate = new Date().toISOString().slice(0, 10).split('-').reverse().join('-')
        const currentDateAndTime = currentTime + ", " + currentDate
        console.log(currentDateAndTime);
        console.log(usd);
        const commentInfo = {
            commenterAdmin: commetAdmin.name,
            commenterImg: commetAdmin.photoUrl,
            comment: comments,
            commentDate: currentDateAndTime,
            creatorEmail: usd?.addUserEmail
        }
        console.log(commentInfo);
        const res = await axiosSecure.post('/comments', commentInfo)
        console.log(res.data);
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

    // console.log(id);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
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
                    <tbody>
                        {
                            contest.map((con, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td><img className='w-14 h-14 rounded-lg' src={con.contestImg} alt="" /></td>
                                <td>{con.contestName}</td>
                                <td>{con.deadLine}</td>
                                <td>${con.contestPrice}</td>
                                <td><button onClick={() => handelAproveBtn(con._id)}>{con?.status === 'accept' ? <span>Confirmed</span> : <span>Confirm</span>}</button></td>
                                <td>{/* Open the modal using document.getElementById('ID').showModal() method */}
                                    <button disabled={con.status === 'accept'} defaultValue={con._id} className="btn" onClick={() => document.getElementById('my_modal_2').showModal() || hadel(con._id)}>Comment <span className='text-xl'><FaRegComment></FaRegComment></span></button>
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
                                <td>Btn</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ManageContest;