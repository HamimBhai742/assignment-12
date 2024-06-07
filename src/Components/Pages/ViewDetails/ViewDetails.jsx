import React from 'react';
import useContest from '../../../hooks/useContest';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import usePayData from '../../../hooks/usePayData';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';

const ViewDetails = () => {
  const [contest, refetch] = useContest()
  const { user } = useAuth()
  const { id } = useParams()
  const [payHistory] = usePayData()
  const axiosPublic = useAxiosPublic()
  const findContest = contest.find(c => c._id === id)
  const navigate = useNavigate()
  const handelRegistration = (id) => {
    const findPay = payHistory.find(pay => pay.contestId === id)
    console.log(findPay);
    navigate(`/payment/${id}`)
  }
  return (
    <div className='mt-28'>
      <h3>{findContest?.contestName}</h3>
      <img src={findContest?.contestImg} alt="" />
      <p>Participants: {findContest?.participantsCount || 0}</p>
      <p>{findContest?.contestDes}</p>
      <p>{findContest?.prizeMoney}</p>
      <button onClick={() => handelRegistration(findContest?._id)} className='btn btn-accent'>Registration</button>
    </div>
  );
};

export default ViewDetails;