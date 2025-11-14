import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../Layout/HomeLayout';
import Home from '../Pages/Home/Home';

import ForgotPassword from '../Pages/Authentication/ForgotPassword';
import Register from '../Pages/Authentication/Register';
import Login from '../Pages/Authentication/Login';
import LoginPage from '../Pages/Authentication/Login';
import Events from '../Pages/Events/Events';
import CreateEvent from '../Components/CreateEvent/CreateEvent';
import ManageEvents from '../Components/ManageEvents/ManageEvents';
import JoinedEvents from '../Components/JoinedEvents/JoinedEvents';
import EventDetails from '../Pages/Events/EventDetails';
import ProgressTracker from './ProgressTracker';
import Profile from '../Components/Profile/Profile';
import PrivateRoute from './PrivateRoute';
import Error404 from '../Pages/ErrorPages/Error404';
import NotFound from '../Pages/ErrorPages/NotFound';

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        hydrateFallbackElement: <p>Loading.......</p>,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'events',
                Component: Events,
            },
            {
                path: 'event/create',
                element: <PrivateRoute><CreateEvent></CreateEvent></PrivateRoute>
            },
            {
                path: 'event/manage',
                element: <PrivateRoute><ManageEvents></ManageEvents></PrivateRoute>
            },
            {
                path: 'event/joined',
                element: <PrivateRoute><JoinedEvents></JoinedEvents></PrivateRoute>
            },
            {
                path: 'profile',
                element: <PrivateRoute><Profile></Profile></PrivateRoute>
            },
            {
                path: 'event/details/:id',
                Component: EventDetails,
                errorElement: <NotFound></NotFound>,
            },
        ]
    },
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/register',
        Component: Register,
    },
    {
        path: '/forgot-password',
        Component: ForgotPassword,
    },
    {
        path: '/*',
        Component: Error404,
    },
    {
        path: '/progress',
        Component: ProgressTracker,
    },
])

export default router;