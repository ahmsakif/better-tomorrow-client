import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Header/Navbar';

const HomeLayout = () => {

    useEffect(() => {
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual"
        }

        window.scrollTo(0, 0);
    },[])

    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            Footer
        </div>
    );
};

export default HomeLayout;