import React from 'react';
import { createBrowserRouter } from 'react-router';
import HomeLayout from '../Layout/HomeLayout';
import Home from '../Pages/Home/Home';
import AuthLayout from '../Layout/AuthLayout';
import Error404 from '../Pages/Error404/Error404';
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

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        hydrateFallbackElement: <p>Loading wait load nek</p>,
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
                Component: CreateEvent,
            },
            {
                path: 'event/manage',
                Component: ManageEvents,
            },
            {
                path: 'event/joined',
                Component: JoinedEvents,
            },
            {
                path: 'profile',
                Component: JoinedEvents,
            },
            {
                path: 'event/details/:id',
                Component: EventDetails,
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