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
  // console.log(findContest);
  // let count = findContest?.participantsCount || 0
  // const handelParticipantsCountBtn = async () => {
  //   count++
  //   console.log(count);
  //   const res = await axiosPublic.patch(`/contest/${id}`, { count })
  //   console.log(res.data);
  //   refetch()
  // }
  // const { contestDes, contestImg, contestName, contestPrice, contestTag, deadLine, prizeMoney, status, taskDetails, _id } = findContest
  console.log(payHistory);
  const navigate = useNavigate()
  const handelRegistration = (id) => {
    const findPay = payHistory.find(pay => pay.contestId === id)
    console.log(findPay,'hhhhhhhh');
    // console.log(user?.email,'cccccccuuuuuuuuuuuu');
    // console.log(findPay?.email,'gggggggguuuuuu');
    // if (findPay?.email === user?.email) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "You have already registration",
    //   });
    //   return
    // }
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