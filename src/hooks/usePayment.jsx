import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const usePayment = () => {
    const axiosPublic = useAxiosPublic()
    const { data: payment = [] } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosPublic.get('/payment')
            return res.data
        }
    })
    return [payment]
};

export default usePayment;