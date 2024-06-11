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

const ViewDetails = () => {
  const [contest, refetch] = useContest()
  const { user } = useAuth()
  const { id } = useParams()
  const [payHistory] = usePayData()
  const axiosPublic = useAxiosPublic()
  const findContest = contest.find(c => c._id === id)
  const navigate = useNavigate()
  const dd = findContest?.deadLine.split('/')[0]
  const mm = findContest?.deadLine.split('/')[1]
  const yy = findContest?.deadLine.split('/')[2]
  const deadLi = yy + "-" + mm + "-" + dd
  const deadLins = new Date(deadLi)
  const currDates = new Date()
  const [contestWiner] = useConWiner()
  // const { data: contestWiner = [] } = useQuery({
  //   queryKey: [],
  //   queryFn: async () => {
  //     const res = await axiosPublic.get('/contest-winer')
  //     return res.data
  //   }
  // })

  console.log(contestWiner);
  const winer = contestWiner.find(s => s.contestsId === id)
  // console.log(ff, 'gggggggggggggggggggg');

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

    navigate(`/payment/${id}`)
  }
  return (
    <div className='mt-28 flex flex-col mx-5 gap-5'>
      <Helmet>
        <title>View Details</title>
      </Helmet>
      <img src={findContest?.contestImg} className='rounded-lg' alt="" />
      <div className='font-inter'>
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