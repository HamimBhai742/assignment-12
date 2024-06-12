import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import usePayment from '../../../hooks/usePayment';
import { CgKey } from 'react-icons/cg';
import useAuth from '../../../hooks/useAuth';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const PayHistory = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const [payment] = usePayment()
    console.log(payment);
    const payHis = payment.filter(ph => ph?.email === user?.email)
    console.log(payHis);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(0)
    const numberOfPages = Math.ceil(payHis?.length / itemsPerPage)
    const pages = [...Array(numberOfPages).keys()]
    const handelSelectedBtn = e => {
        const val = parseInt(e.target.value)
        setItemsPerPage(val)
        setCurrentPage(0)
    }

    const handelPrevBtn = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }
    const handelNextBtn = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1)
        }
    }

    const { data: perPagePayHis = [], refetch } = useQuery({
        queryKey: [currentPage, itemsPerPage, 'perPageUser'],
        queryFn: async () => {
            const results = await axiosPublic.get(`/payment/${user?.email}?page=${currentPage}&size=${itemsPerPage}`)
            console.log(results.data);
            return results.data;
        }
    })
    console.log(perPagePayHis);
    return (
        <div className='md:mt-28 mt-16 max-sm:mx-3'>
            <div className="flex items-center gap-x-3 justify-center">
                <h2 className="text-2xl text-gray-800 dark:text-white font-lato font-bold">Total Payment</h2>

                <span className="px-3 py-1  text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400 font-bold">{payHis?.length}</span>
            </div>
            <table className="table-auto mx-auto  lg:w-[1170px] bg-white rounded-t-xl shadow mt-6">
                <thead>
                    <tr className=" text-gray-700 font-inter text-sm leading-normal">
                        <th className="py-3 text-center px-6 bg-slate-300 rounded-tl-lg">Sl.</th>
                        <th className="py-3 text-center px-6 bg-slate-300">Email</th>
                        <th className="py-3 text-center px-6 bg-slate-300">Date</th>
                        <th className="py-3 text-center px-6 bg-slate-300">Price</th>
                        <th className="py-3 text-center px-6 bg-slate-300">Transaction ID</th>
                        <th className="py-3 text-center px-6 bg-slate-300 rounded-tr-lg ">Status</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-lato">
                    {
                        perPagePayHis.map((pay, idx) => <tr key={idx} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 font-bold">{idx + 1}</td>
                            <td className='text-center'>{pay?.email}</td>
                            <td className='text-center'>{pay?.date}</td>
                            <td className='text-center'>${pay?.price}</td>
                            <td className='text-center'>{pay?.transactionId}</td>
                            <td className='text-center'>{pay?.status}</td>
                        </tr>)
                    }
                </tbody>
            </table>
            <div className='text-center flex gap-5 items-center justify-center my-5'>
                <button onClick={handelPrevBtn}><div className='text-xl flex items-center justify-center border-[2px] hover:bg-blue-500 border-blue-500 w-10 h-10 rounded-full'><IoIosArrowBack></IoIosArrowBack></div></button>
                <div className='flex gap-3 '>
                    {
                        pages?.map(page => <button onClick={() => setCurrentPage(page)} className={currentPage === page ? 'rounded-full w-10 h-10 border-[2px] border-blue-500 px-3 bg-blue-500 font-semibold' : 'border-[2px] border-blue-500 w-10 h-10 rounded-full '} key={page}>{page + 1}</button>)
                    }
                </div>
                <button onClick={handelNextBtn}><span className='text-xl flex items-center justify-center border-[2px] hover:bg-blue-500 border-blue-500 w-10 h-10 rounded-full'><IoIosArrowForward></IoIosArrowForward></span></button>
                <select onChange={handelSelectedBtn} defaultValue={itemsPerPage} className=' border-2 h-10 w-28 font-medium font-inter border-slate-600 rounded-lg px-1' id="">
                    <option value="5">5 / Page</option>
                    <option value="10">10 / Page</option>
                    <option value="20">20 / Page</option>
                    <option value="30">50 / Page</option>
                </select>

            </div>
        </div>
    );
};

export default PayHistory;