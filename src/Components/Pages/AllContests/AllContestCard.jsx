import React from 'react';
import { Link } from 'react-router-dom';

const AllContestCard = ({ contests }) => {
    // console.log(contests);
    const { contestDes, contestImg, _id, contestName, contestPrice, contestTag, deadLine, prizeMoney, taskDetails } = contests
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow rounded-lg">
                <figure><img className='h-[250px] w-full' src={contestImg} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="font-bold text-2xl font-lato">{contestName}</h2>
                    <p className='font-inter font-semibold'>Participants: {contests?.participantsCount || 0}</p>
                    <p className='font-lato text-gray-600'>{contestDes}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/view-details/${_id}`} className="btn hover:bg-cyan-600 bg-cyan-500 text-slate-800 font-inter font-semibold text-lg">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllContestCard;