import React from 'react';
import useUser from './useUser';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useCreator = () => {
    const { user } = useAuth()
    const [users] = useUser()
    // const findCurrentLogInfo = users.find(u => u.email === user?.email)
    // if (findCurrentLogInfo) {
    //     findCurrentLogInfo.role = 'Admin'
    //     return [findCurrentLogInfo]
    // }
    const { data: isCreator, isPending: isCreatorLoding } = useQuery({
        queryKey: [user?.email, 'isCreator'],
        queryFn: async () => {
            const res = await users.find(u => u.email === user?.email)
            console.log(res);
            const roleCheak = res.role === 'Creator'
            console.log(roleCheak);
            return roleCheak
        }
    })
    return [isCreator,isCreatorLoding]
};

export default useCreator;