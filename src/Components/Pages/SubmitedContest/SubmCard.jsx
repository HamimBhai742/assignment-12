import React from 'react';
import useContest from '../../../hooks/useContest';
import Swal from 'sweetalert2';
import useSubmit from '../../../hooks/useSubmit';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const SubmCard = ({ sm, reCall }) => {
    const [contest] = useContest()
    const axiosSecure = useAxiosSecure()
    const [submitContest] = useSubmit()
    const handelSelectWiner = async (id, winerId) => {
        const finWinCon = contest.find(c => c._id === id)
        const dd = finWinCon?.deadLine.split('/')[0]
        const mm = finWinCon?.deadLine.split('/')[1]
        const yy = finWinCon?.deadLine.split('/')[2]
        const deadLi = yy + "-" + mm + "-" + dd
        const deadLins = new Date(deadLi)
        const currDates = new Date()
        // if (currDates <= deadLins) {
        //     Swal.fire({
        //         icon: "error",
        //         title: "Oops...",
        //         text: "You cannot declare a winner. Because your contest deadline is not over!",
        //     });
        //     return
        // }
        const flterSecelt = submitContest.filter(w => w.contestId === id)
        // console.log(flterSecelt);
        const findWiner = submitContest.find(f => f._id === winerId)
        // console.log(findWiner);
        const winerSelect = {
            perticipantUserEmail: findWiner?.perticipantUserEmail,
            perticipantUser: findWiner?.perticipantUser,
            perticipateImg: findWiner?.perticipateImg,
            contestsId: findWiner?.contestId,

        }
        const res = await axiosSecure.post(`/contest-winer?id=${id}`, winerSelect)
        // console.log(res.data);
        reCall()
    }
    return (
        <div>
            <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-light text-gray-600 dark:text-gray-400">{sm?.deadlines}</span>
                    <button onClick={() => handelSelectWiner(sm?.contestId, sm._id)} className='btn btn-accent font-inter font-bold'>Declare Win</button>
                </div>

                <div className="mt-2">
                    <a href="#" className="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" role="link">{sm?.title}</a>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos enim reprehenderit nisi, accusamus delectus nihil quis facere in modi ratione libero!</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline" tabIndex="0" role="link">Read more</a>

                    <div className="flex items-center">
                        <img className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src={sm?.perticipateImg} alt="avatar" />
                        <a className="font-bold text-gray-700 cursor-pointer dark:text-gray-200" tabIndex="0" role="link">{sm?.perticipantUser}</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubmCard;