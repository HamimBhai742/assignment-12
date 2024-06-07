import React from 'react';
import { Link } from 'react-router-dom';

const PopularContest = ({ con }) => {
    console.log(con);
    const { contestName, contestDes, _id, participantsCount ,contestImg} = con
    return (
        <div>
            <div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="">
                        <img src={contestImg} alt="Shoes" className="rounded-t-xl h-72 w-full" />
                    </figure>
                    <div className="card-body items-center text-center font-inter">
                        <h2 className="card-title">{contestName}</h2>
                        <p>{contestDes?.slice(0, 66)}....</p>
                        <p>Participation Count: {participantsCount || 0}</p>
                        <div className="card-actions ">
                            <Link to={`/view-details/${_id}`} className="btn btn-accent">View Deatails</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularContest;