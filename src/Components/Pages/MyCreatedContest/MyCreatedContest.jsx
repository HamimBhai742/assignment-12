import React from 'react';
import useContest from '../../../hooks/useContest';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyCreatedContest = () => {
    const [contest] = useContest()
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
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
    return (
        <div className='flex'>
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
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myCreatedContest.map((con, idx) => <tr key={idx}>
                                <th>{idx + 1}</th>
                                <td><img className='w-14 h-14 rounded-lg' src={con.contestImg} alt="" /></td>
                                <td>{con.contestName}</td>
                                <td>{con.deadLine}</td>
                                <td>${con.contestPrice}</td>
                                <td>{con?.status === 'accept' ? <span>Accept</span> : <span>Pending</span>}</td>
                                {/* <td>{con?.comment}</td> */}
                                <td>Btn</td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div>
                {
                    adminComment.map(adc => <>
                        <div className='bg-blue-100 mt-3 w-72  p-3 rounded-lg'>
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