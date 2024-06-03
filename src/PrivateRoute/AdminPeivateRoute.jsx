import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';

const AdminPeivateRoute = ({ children }) => {
    const { user, loding, logOut } = useAuth()
    const [isAdmin, isAdminLoding] = useAdmin()
    const location = useLocation()
    if (loding || isAdminLoding) {
        return <div className="loader mx-auto mt-72"></div>
    }
    if (isAdmin) {
        return children
    }
    logOut()
    return <Navigate to='/login' replace={true}></Navigate>
};

export default AdminPeivateRoute;