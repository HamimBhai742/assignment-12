import React from 'react';
import useContest from '../../../hooks/useContest';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const ViewDetails = () => {
  const [contest, refetch] = useContest()
  const { id } = useParams()
  const axiosPublic = useAxiosPublic()
  const findContest = contest.find(c => c._id === id)
  console.log(findContest);
  let count = findContest?.participantsCount || 0
  const handelParticipantsCountBtn = async () => {
    count++
    console.log(count);
    const res = await axiosPublic.patch(`/contest/${id}`, { count })
    console.log(res.data);
    refetch()
  }
  return (
    <div className='mt-28'>
      <p>Participants: {findContest?.participantsCount || 0}</p>
      <button onClick={handelParticipantsCountBtn} className='btn btn-accent'>Registration</button>
    </div>
  );
};

export default ViewDetails;