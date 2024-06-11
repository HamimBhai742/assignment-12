import React from 'react';

const MyPerticipantsCard = ({ myPer }) => {
    return (
        <div className='mx-5'>
            <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center gap-10 font-inter">
                    <span className="text-sm font-light text-gray-600 dark:text-gray-400"><span className='text-black font-semibold'>Deadline:</span> {myPer?.deadlines}</span>
                    <p><span className='font-semibold'>Payment Status:</span> <span className='text-green-600'>Complete</span></p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <img className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block" src={myPer?.perticipateImg} alt="avatar" />
                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">{myPer?.perticipantUser}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPerticipantsCard;