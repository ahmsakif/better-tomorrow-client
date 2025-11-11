import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Header/Navbar';
import Footer from '../Components/Footer/Footer';
import { Toaster } from 'react-hot-toast';

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
            <Footer></Footer>
            <Toaster
              position="top-center"
              reverseOrder={false}
            />
        </div>
    );
};

export default HomeLayout;