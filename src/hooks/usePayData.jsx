import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const usePayData = () => {
    const axiosPublic = useAxiosPublic()
    const { data: payHistory } = useQuery({
        queryKey: ['payHistory'],
        queryFn: async () => {
            const res = await axiosPublic.get('/payment')
            return res.data
        }
    })
    return [payHistory]
};

export default usePayData;