import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';

const useUser = () => {
    const { data: users = [], refetch: reUse } = useQuery({
        queryKey: ["Users"],
        queryFn: async () => {
            const res = await axios.get('http://localhost:5000/users')
            return res.data;
        }
    })
    return [users, reUse]
};

export default useUser;