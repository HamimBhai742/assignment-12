import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSubmit = () => {
    const axiosSecure = useAxiosSecure()
    const { data: submitContest = [], refetch } = useQuery({
        queryKey: ['submitContest'],
        queryFn: async () => {
            const res = await axiosSecure.get('/submited-contest')
            return res.data
        }
    })
    return [submitContest, refetch]
};

export default useSubmit;