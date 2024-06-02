import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user, loding } = useAuth()
    const location = useLocation()
    if (loding) {
        return <div className="loader mx-auto mt-72"></div>
    }
    if (user) {
        return children
    }
    return <Navigate to='/login' state={location.pathname}></Navigate>
};

export default PrivateRoute;