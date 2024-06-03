import React from 'react';
import useContest from '../../../hooks/useContest';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { TfiCommentsSmiley } from 'react-icons/tfi';

const ManageContest = () => {
    const [contest, refetch] = useContest()
    console.log(contest);
    const axiosSecure = useAxiosSecure()
    const handelAproveBtn = async (id) => {
        console.log(id);
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

        // console.log(res.data);
        // refetch()
    }
    const ha=()=>{
        const bb=document.getElementById("ll").value
        console.log(bb);
    }
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
                                    <button className="text-2xl" onClick={() => document.getElementById('my_modal_1').showModal()}><TfiCommentsSmiley></TfiCommentsSmiley></button>
                                    <dialog id="my_modal_1" className="modal">
                                        <div className="modal-box w-80 py-2">
                                            <p className="pt-3">Please give me your feedback!</p>
                                            <div className="modal-action">
                                                <form method="dialog">
                                                    <div className='ml-14'>
                                                        <textarea id='ll' className="textarea textarea-bordered w-64 " placeholder="Comment"></textarea>
                                                    </div>
                                                    {/* if there is a button in form, it will close the modal */}
                                                    <div className='flex gap-3 ml-36'>
                                                        <button className="btn mt-4 btn-info">Cancel</button>
                                                        <button onClick={ha}  className="btn mt-4 btn-primary font-semibold">Submit</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </dialog>
                                </td>
                                <td>Btn</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageContest;