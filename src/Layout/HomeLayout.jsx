import React from 'react';
import { Outlet } from 'react-router';

const HomeLayout = () => {
    return (
        <div>
            Navbar
            <Outlet></Outlet>
            Footer
        </div>
    );
};

export default HomeLayout;