import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import useSubmit from '../../../hooks/useSubmit';
import useAuth from '../../../hooks/useAuth';
import usePayment from '../../../hooks/usePayment';
import MyPerticipantsCard from './MyPerticipantsCard';

const MyPerticipated = () => {
    const { user } = useAuth()
    const [payment] = usePayment()
    const myPerticipants = payment.filter(my => my.email === user?.email)
    console.log(myPerticipants);
    const [submitContest] = useSubmit()
    console.log(submitContest);
    const myPerticipant = submitContest.filter(mys => mys.perticipantUserEmail === user?.email)
    console.log('myprr', myPerticipant);
    const [selected, setSelected] = useState()
    const handelSortingBtn = (e) => {
        setSelected(e.target.value)
    }
    console.log(selected);
    if (selected === 'My Upcoming Contest') {
        const no = myPerticipant.sort((a, b) => (a.sortByDates < b.sortByDates) ? -1 : (a.sortByDates ) ? 1 : 0);
    }
    // else if (selected === 'Yes') {
    //     const yes = myCrafts.sort((a, b) => (a.customization < b.customization) ? 1 : (a.customization > b.customization) ? -1 : 0);
    // }
    return (
        <div>
            <Helmet>
                <title>My Perticipants </title>
            </Helmet>
            <div className='my-8 flex justify-center font-inter'>
                <select onChange={handelSortingBtn} className="select select-bordered w-full max-w-xs">
                    <option disabled selected>Sort By</option>
                    <option>My Upcoming Contest</option>
                </select>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                {
                    myPerticipant.map((myPer, idx) => <MyPerticipantsCard key={idx} myPer={myPer}></MyPerticipantsCard>)
                }
            </div>
        </div>
    );
};

export default MyPerticipated;