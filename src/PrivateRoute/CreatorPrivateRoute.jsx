import React from 'react';
import useAuth from '../hooks/useAuth';
import useCreator from '../hooks/useCreator';
import { Navigate } from 'react-router-dom';

const CreatorPrivateRoute = ({children}) => {
    const { user, loding, logOut } = useAuth()
    const [isCreator,isCreatorLoding] = useCreator()
    // const location = useLocation()
    if (loding || isCreatorLoding) {
        return <div className="loader mx-auto mt-72"></div>
    }
    if (user && isCreator) {
        return children
    }
    logOut()
    return <Navigate to='/login' replace={true}></Navigate>
};

export default CreatorPrivateRoute;