import React from 'react';
import useAuth from './useAuth';
import useUser from './useUser';
import { useQuery } from '@tanstack/react-query';

const useUserRole = () => {
    const { user } = useAuth()
    const [users] = useUser()
    // const findCurrentLogInfo = users.find(u => u.email === user?.email)
    // if (findCurrentLogInfo) {
    //     findCurrentLogInfo.role = 'Admin'
    //     return [findCurrentLogInfo]
    // }
    const { data: isUser } = useQuery({
        queryKey: [user?.email, 'isUser'],
        queryFn: async () => {
            const res = await users.find(u => u.email === user?.email)
            const roleCheak = res.role === 'User'
            return roleCheak
        }
    })
    return [isUser]
};

export default useUserRole;