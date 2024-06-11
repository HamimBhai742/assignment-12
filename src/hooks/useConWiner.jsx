import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useConWiner = () => {
    const axiosPublic = useAxiosPublic()
    const { data: contestWiner = [] } = useQuery({
        queryKey: ['contestWiner'],
        queryFn: async () => {
            const res = await axiosPublic.get('/contest-winer')
            return res.data
        }
    })
    return [contestWiner]
};

export default useConWiner;