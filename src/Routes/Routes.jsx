import { createBrowserRouter } from 'react-router-dom';
import Home from '../Components/Pages/Home/Home';
import Root from '../Layout/Root/Root';
import Login from '../Components/Pages/Login/Login';
import Register from '../Components/Pages/Register/Register';
import AllContests from '../Components/Pages/AllContests/AllContests';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import Dashboard from '../Layout/Dashboard/Dashboard';
import ViewDetails from '../Components/Pages/ViewDetails/ViewDetails';
import MyProfile from '../Components/Pages/MyProfile/MyProfile';
import MyPerticipated from '../Components/Pages/MyPerticipated/MyPerticipated';
import ManageUser from '../Components/Pages/ManageUser/ManageUser';
import AdminPeivateRoute from '../PrivateRoute/AdminPeivateRoute';
import AddContest from '../Components/Pages/AddContest/AddContest';
import MyCreatedContest from '../Components/Pages/MyCreatedContest/MyCreatedContest';
import CreatorPrivateRoute from '../PrivateRoute/CreatorPrivateRoute';
import ManageContest from '../Components/Pages/ManageContest/ManageContest';
import UpdateContest from '../Components/Pages/UpdateContest/UpdateContest';
import Payment from '../Components/Pages/Payment/Payment';
import Error from '../Components/Pages/Error/Error';
import SubmitedContest from '../Components/Pages/SubmitedContest/SubmitedContest';
import PayHistory from '../Components/Pages/PayHistory/PayHistory';
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement:<Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/all-contests',
                element: <AllContests></AllContests>
            },
            {
                path: '/view-details/:id',
                element: <PrivateRoute><ViewDetails></ViewDetails></PrivateRoute>
            },
            {
                path:'/payment/:id',
                element:<Payment></Payment>
            },
            {
                path:'/pay-history',
                element:<PayHistory></PayHistory>
            }
        ]

    },
    {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'my-perticipated',
                element: <MyPerticipated></MyPerticipated>
            },
            {
                path: 'manage-users',
                element: <AdminPeivateRoute><ManageUser></ManageUser></AdminPeivateRoute>
            },
            {
                path: 'manage-contest',
                element: <AdminPeivateRoute><ManageContest></ManageContest></AdminPeivateRoute>
            },
            {
                path: 'add-contest',
                element: <CreatorPrivateRoute><AddContest></AddContest></CreatorPrivateRoute>
            },
            {
                path: 'my-created-contest',
                element: <CreatorPrivateRoute><MyCreatedContest></MyCreatedContest></CreatorPrivateRoute>
            },
            {
                path: 'update-contest/:id',
                element: <UpdateContest></UpdateContest>
            },
            {
                path:'submited-contest',
                element:<CreatorPrivateRoute><SubmitedContest></SubmitedContest></CreatorPrivateRoute>
            }
        ]
    }
]);
export default router;