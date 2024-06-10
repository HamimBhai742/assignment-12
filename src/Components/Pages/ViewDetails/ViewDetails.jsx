import React, { useEffect, useState } from 'react';
import useContest from '../../../hooks/useContest';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import usePayData from '../../../hooks/usePayData';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import { format, setSeconds } from 'date-fns';
import { DatePicker } from 'antd';

const ViewDetails = () => {
  const [contest, refetch] = useContest()
  const { user } = useAuth()
  const { id } = useParams()
  const [payHistory] = usePayData()
  const axiosPublic = useAxiosPublic()

  // const [timeLeft, setTimeLeft] = useState({});
  const findContest = contest.find(c => c._id === id)
  var deadLin = new Date(findContest?.deadLine).getTime()
  const navigate = useNavigate()
  // const dd = findContest?.deadLine.split('/')[0]
  // const mm = findContest?.deadLine.split('/')[1]
  // const yy = findContest?.deadLine.split('/')[2]
  // const deadLi = yy + "-" + mm + "-" + dd
  // console.log(deadLi);
  // const deadLinDate = findContest?.deadLine
  // console.log(deadLinDate);

  // const [deadline, setDeadline] = useState(deadLin);
  // console.log(ddd,'hhh');

  // console.log(findContest?.deadLine);
  // // console.log(currDate);
  var [deadline,setDeadline]=useState(deadLin)
  // var vvvv = parseInt(deadLin)
  console.log(deadLin);
  var currDate = new Date().getTime()
  // var cccc = parseInt(currDate)
  // console.log(currDate);


  // console.log(differance);
  // const [seconds, setSeconds] = useState(seconds)
  var differance = deadline - currDate
  setDeadline(differance)
  const timer = setInterval(() => {
    var days = Math.floor(differance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((differance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    var minutes = Math.floor((differance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((differance % (1000 * 60)) / 1000)
    // console.log(seconds);
  
    var result = document.getElementById('dead').innerHTML = days + 'd' + hours + 'h' + minutes + 'm' + seconds + 's';
    // console.log(result);
    // setSeconds(seconds)
    // console.log(days, hours, minutes, seconds);
  }, 1000);
  // console.log(seconds);

  // const handleDateChange = (date) => {
  //   setDeadline(date);
  // };


  // console.log(date);
  // console.log(deadLinDate);
  // console.log(cuDa);
  // const formattedData = {
  //   ...date,
  //   cuDate: format(date, 'dd/MM/yyyy'),
  // };
  // const cDate = formattedData.cuDate
  // console.log(cDate);
  // const [currentDate, setCurrentDate] = useState()
  // useEffect(() => {

  // }, [])
  const handelRegistration = (id) => {
    const findPay = payHistory.find(pay => pay.contestId === id)
    // console.log(object);
    if (currDate >= deadLin) {
      // console.log(currDate);
      // console.log(deadLinDate);
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
        <p id='dead'></p>
        <button onClick={() => handelRegistration(findContest?._id)} className='btn btn-accent'>Registration</button>
      </div>
    </div>
  );
};

export default ViewDetails;