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
const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
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
                path:'my-perticipated',
                element:<MyPerticipated></MyPerticipated>
            },
            {
                path:'manage-users',
                element:<ManageUser></ManageUser>
            }
        ]
    }
]);
export default router;