import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useAuth from './useAuth';

const useContest = () => {
    const axiosPublic = useAxiosPublic()
    const { user } = useAuth()
    const { data: contest = [], refetch: reCall } = useQuery({
        queryKey: ['contest'],
        queryFn: async () => {
            const res = await axiosPublic.get('/contest')
            return res.data
        }
    })
    return [contest, reCall]
};

export default useContest;