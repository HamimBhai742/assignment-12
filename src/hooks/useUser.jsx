import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';

const useUser = () => {
    const axiosPublic=useAxiosPublic()
    const { data: users = [], refetch: reUse } = useQuery({
        queryKey: ["Users"],
        queryFn: async () => {
            const res = await axiosPublic.get('/users')
            return res.data;
        }
    })
    return [users, reUse]
};

export default useUser;