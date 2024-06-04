import React from 'react';
import { Link } from 'react-router-dom';

const AllContestCard = ({ contests }) => {
    console.log(contests);
    const { contestDes, contestImg, _id, contestName, contestPrice, contestTag, deadLine, prizeMoney, taskDetails } = contests
    return (
        <div>
            <div className="card card-compact w-96 bg-base-100 shadow rounded-lg">
                <figure><img className='h-[250px] w-full' src={contestImg} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">{contestName}</h2>
                    <p>Participants: {contests?.participantsCount || 0}</p>
                    <p>{contestDes}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/view-details/${_id}`} className="btn btn-primary">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllContestCard;