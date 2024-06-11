import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const PayHistory = () => {
    const axiosPublic = useAxiosPublic()
    // const { data: payHistory = [] } = useQuery({
    //     queryKey: ['payHistory'],
    //     queryFn: async () => {
    //         const res = await axiosPublic.get('/payment')
    //         return res.data
    //     }
    // })
    console.log(payHistory);
    return (
        <div>

        </div>
    );
};

export default PayHistory;