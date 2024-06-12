import React, { useEffect, useState } from 'react';
import useContest from '../../../hooks/useContest';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import usePayData from '../../../hooks/usePayData';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet';
import trophee from '../../../assets/ddddddddddddddddd.png'
import useConWiner from '../../../hooks/useConWiner';
import useUser from '../../../hooks/useUser';
import useAdmin from '../../../hooks/useAdmin';
import useCreator from '../../../hooks/useCreator';

const ViewDetails = () => {
  const [contest, refetch] = useContest()
  const { user } = useAuth()
  const { id } = useParams()
  const [users] = useUser()
  const [payHistory] = usePayData()
  const axiosPublic = useAxiosPublic()
  const [isAdmin] = useAdmin()
  const [isCreator] = useCreator()
  const findContest = contest.find(c => c._id === id)
  const navigate = useNavigate()
  const dd = findContest?.deadLine.split('/')[0]
  const mm = findContest?.deadLine.split('/')[1]
  const yy = findContest?.deadLine.split('/')[2]
  const deadLi = yy + "-" + mm + "-" + dd
  const deadLins = new Date(deadLi)
  const currDates = new Date()
  const [contestWiner] = useConWiner()
  const findCurrentUser = users.find(cu => cu?.email === user?.email)
  console.log(findCurrentUser);
  const winer = contestWiner.find(s => s.contestsId === id)
  const handelRegistration = (id) => {
    const findPay = payHistory.find(pay => pay.contestId === id)
    if (currDates >= deadLins) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Deadline is over not available!",
      });
      return
    }


    if (findCurrentUser?.status === 'Block') {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You may not participate in any contests.Because you have been blocked",
      });
      return
    }

    if (isCreator) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You may not participate in any contests. Because you are the creator",
      });
      return
    }

    if (isAdmin) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You may not participate in any contests. Because you are the admin",
      });
      return
    }



    navigate(`/payment/${id}`)
  }
  console.log(isAdmin);
  console.log(isCreator);
  return (
    <div className='md:mt-28 flex flex-col md:mx-5 gap-5 mt-16 mx-3'>
      <Helmet>
        <title>View Details</title>
      </Helmet>
      <img src={findContest?.contestImg} className='rounded-lg md:h-[800px] h-[500px]' alt="" />
      <div className='font-inter space-y-2'>
        <h3 className='font-lato text-3xl font-bold'>{findContest?.contestName}</h3>
        <p>{findContest?.contestDes}</p>
        <p><span className='font-semibold'>Participants:</span> {findContest?.participantsCount || 0}</p>
        <p><span className='font-semibold'>Prize:</span> {findContest?.prizeMoney}</p>
        {winer && <div className='flex my-3 gap-3 items-center'>
          <div className='relative'>
            <img className='w-16 h-16 rounded-full' src={winer?.perticipateImg} alt="" />
            <img className='w-8 h-8 absolute -top-2 -left-1  border-2 bg-white p-1 border-green-600 rounded-full' src={trophee} alt="" />
          </div>
          <h3 className='font-lato text-3xl font-bold'>{winer?.perticipantUser}</h3>
        </div>}
        <p><span className='font-semibold'>Deadline:</span> {currDates >= deadLins ? 'Not available' : findContest?.deadLine}</p>
        <button onClick={() => handelRegistration(findContest?._id)} className='btn btn-accent'>Registration</button>
      </div>
    </div>
  );
};

export default ViewDetails;