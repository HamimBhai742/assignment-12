import React from 'react';
import useUser from './useUser';
import useAuth from './useAuth';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user } = useAuth()
    const [users] = useUser()
    const { data: isAdmin, isPending: isAdminLoding } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            const res = await users.find(u => u.email === user?.email)
            const roleCheak = res.role === 'Admin'
            return roleCheak
        }
    })
    return [isAdmin, isAdminLoding]

};

export default useAdmin;