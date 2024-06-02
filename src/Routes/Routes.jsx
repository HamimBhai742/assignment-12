import { createBrowserRouter } from 'react-router-dom';
import Home from '../Components/Pages/Home/Home';
import Root from '../Layout/Root/Root';
import Login from '../Components/Pages/Login/Login';
import Register from '../Components/Pages/Register/Register';
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
            }
        ]

    },
]);
export default router;