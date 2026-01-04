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
import Profile from '../Components/Profile/Profile';
import PrivateRoute from './PrivateRoute';
import Error404 from '../Pages/ErrorPages/Error404';
import AboutPage from '../Pages/About/AboutPage';
import DashboardLayout from '../Layout/DashboardLayout';
import ImpactOverview from '../Components/ImpactOverview/ImpactOverview';
import Blogs from '../Pages/Blogs/Blogs';
import WriteBlog from '../Components/WriteBlog/WriteBlog';
import BlogDetails from '../Pages/Blogs/BlogDetails';
import Privacy from '../Pages/LegalPages/Privacy';
import Terms from '../Pages/LegalPages/Terms';

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        children: [
            { index: true, Component: Home },
            { path: 'events', Component: Events },
            { path: 'event/details/:id', Component: EventDetails },
            { path: 'blogs', Component: Blogs },
            { path: 'blog/:id', Component: BlogDetails },
            { path: 'about', Component: AboutPage },
            { path: 'privacy', Component: Privacy },
            { path: 'terms', Component: Terms },
        ]
    },
    {
        // New Root Dashboard Route
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                index: true, // This is /dashboard
                element: <ImpactOverview />
            },
            {
                path: 'joined', // This is /dashboard/joined
                element: <JoinedEvents />
            },
            {
                path: 'manage', // This is /dashboard/manage
                element: <ManageEvents />
            },
            {
                path: 'create', // This is /dashboard/create
                element: <CreateEvent />
            },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'write-blog',
                element: <WriteBlog />
            }
        ]
    },
    { path: '/login', Component: Login },
    { path: '/register', Component: Register },
    { path: '/forgot-password', Component: ForgotPassword },
    { path: '/*', Component: Error404 },
])

export default router;