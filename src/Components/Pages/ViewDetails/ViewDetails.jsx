import React, { useEffect, useState } from 'react';
import useContest from '../../../hooks/useContest';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import usePayData from '../../../hooks/usePayData';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

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

  const { data: contestWiner = [] } = useQuery({
    queryKey: [],
    queryFn: async () => {
      const res = await axiosPublic.get('/contest-winer')
      return res.data
    }
  })
  console.log(contestWiner);
  const ff = contestWiner.find(s => s.contestsId === id)
  console.log(ff,'gggggggggggggggggggg');

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
    <div className='mt-28 flex mx-5 gap-5'>

      <img src={findContest?.contestImg} className='rounded-lg' alt="" />
      <div className='font-inter'>
        <h3 className='font-lato text-3xl font-bold'>{findContest?.contestName}</h3>
        <p>{findContest?.contestDes}</p>
        <p><span className='font-semibold'>Participants:</span> {findContest?.participantsCount || 0}</p>
        <p><span className='font-semibold'>Prize:</span> {findContest?.prizeMoney}</p>
        <p><span className='font-semibold'>Deadline:</span> {findContest?.deadLine}</p>
        <button onClick={() => handelRegistration(findContest?._id)} className='btn btn-accent'>Registration</button>
      </div>
    </div>
  );
};

export default ViewDetails;