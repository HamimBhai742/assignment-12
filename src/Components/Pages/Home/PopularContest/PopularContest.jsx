import React from 'react';
import { Link } from 'react-router-dom';

const PopularContest = ({ con }) => {
    const { Contest_Name, Participation_Count, Contest_Description, _id } = con
    return (
        <div>
            <div>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center font-inter">
                        <h2 className="card-title">{Contest_Name}</h2>
                        <p>{Contest_Description.slice(0, 66)}....</p>
                        <p>Participation Count: {Participation_Count}</p>
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