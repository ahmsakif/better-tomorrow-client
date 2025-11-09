import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../Layout/HomeLayout';
import Home from '../Pages/Home/Home';
import AuthLayout from '../Layout/AuthLayout';
import Error404 from '../Pages/Error404/Error404';
import ForgotPassword from '../Pages/Authentication/ForgotPassword';
import Register from '../Pages/Authentication/Register';
import Login from '../Pages/Authentication/Login';

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        hydrateFallbackElement: <p>Loading wait load nek</p>,
        children: [
            {
                index: true,
                Component: Home,
            }
        ]
    },
    {
        path: '/auth',
        Component: AuthLayout,
        hydrateFallbackElement: <p>Auth load nitese ubaa</p>,
        children: [
            {
                path: 'login',
                Component: Login,
            },
            {
                path: 'register',
                Component: Register,
            },
            {
                path: 'forgot-password',
                Component: ForgotPassword,
            }
        ]
    },
    {
        path: '/*',
        Component: Error404,
    }
])

export default router;