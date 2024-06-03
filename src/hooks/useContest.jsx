import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useContest = () => {
    const axiosPublic = useAxiosPublic()
    const { data: contest = [], refetch } = useQuery({
        queryKey: ['contest'],
        queryFn: async () => {
            const res = await axiosPublic.get('/contest')
            return res.data
        }
    })
    return [contest, refetch]
};

export default useContest;