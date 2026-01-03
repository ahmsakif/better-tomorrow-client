import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { PuffLoader } from 'react-spinners'; // Assuming you use react-spinners
import logo from '../../assets/better-tomorrow-logo.png'
import avatar from '../../assets/user.png'
import useAuth from '../../Hooks/useAuth';
import ScrollToTop from '../../Utilities/ScrollToTop';
import { handleFirebaseSuccess } from '../../Utilities/handleFirebaseSuccess';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import ThemeSelector from '../ThemeSwitcher/ThemeSelector';

const Navbar = () => {
    const { user, loading, signOutUser } = useAuth();
    const navigate = useNavigate();

    const handleLogOut = () => {
        signOutUser();
        handleFirebaseSuccess("logout");
        navigate('/');
    };

    // Refined Active Class for a "Pill" effect
    const getActiveClass = ({ isActive }) => 
        `relative px-4 py-2 transition-all duration-300 font-medium font-body rounded-full 
        ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-base-200 text-base-content/80 hover:text-primary'}`;

    const navLinks = (
        <>
            <li><NavLink to="/" className={getActiveClass}>Home</NavLink></li>
            <li><NavLink to="/events" className={getActiveClass}>Upcoming Events</NavLink></li>
            <li><NavLink to="/about" className={getActiveClass}>About Us</NavLink></li>
        </>
    );

    const eventLinks = (
        <>
            <div className="px-4 py-2 text-xs font-bold text-base-content/40 uppercase tracking-widest">Management</div>
            <li><NavLink to="/profile" className="hover:bg-primary/10 rounded-lg">My Profile</NavLink></li>
            <li><NavLink to="/event/create" className="hover:bg-primary/10 rounded-lg">Create Event</NavLink></li>
            <li><NavLink to="/event/manage" className="hover:bg-primary/10 rounded-lg">Manage Events</NavLink></li>
            <li><NavLink to="/event/joined" className="hover:bg-primary/10 rounded-lg">Joined Events</NavLink></li>
            <div className="divider my-1"></div>
            <li><button onClick={handleLogOut} className="text-error hover:bg-error/10 rounded-lg font-semibold">Logout</button></li>
        </>
    );

    return (
        <header className="sticky top-0 z-[999] w-full border-b border-base-200 bg-base-100/80 backdrop-blur-md">
            <div className="max-w-[1536px] mx-auto navbar px-4 lg:px-8 h-20">
                
                {/* Navbar Start: Logo & Mobile Toggle */}
                <div className="navbar-start">
                    <div className="lg:hidden">
                        <label htmlFor="my-drawer-2" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </label>
                    </div>
                    
                    <Link to="/" onClick={() => ScrollToTop()} className="flex items-center gap-3 group transition-transform hover:scale-105">
                        <img src={logo} alt="Logo" className="h-10 w-auto" />
                        <h2 className="hidden sm:block font-heading font-bold text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Better Tomorrow
                        </h2>
                    </Link>
                </div>

                {/* Navbar Center: Desktop Links */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-2">
                        {navLinks}
                    </ul>
                </div>

                {/* Navbar End: Auth & Theme */}
                <div className="navbar-end gap-2">
                    <div className="hidden md:flex items-center mr-2">
                        <ThemeSwitcher />
                    </div>

                    {loading ? (
                        <div className="btn btn-ghost btn-circle animate-pulse bg-base-200">
                             <PuffLoader size={24} color="var(--color-primary)" />
                        </div>
                    ) : user ? (
                        <div className="dropdown dropdown-end dropdown-hover">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-primary/20 hover:border-primary p-0.5 transition-all">
                                <div className="w-10 rounded-full">
                                    <img src={user?.photoURL || avatar} alt="Profile" />
                                </div>
                            </div>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-2xl w-60 border border-base-200 mt-2">
                                {eventLinks}
                            </ul>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary rounded-full px-8 font-heading shadow-md hover:shadow-primary/20 transition-all">
                            Login
                        </Link>
                    )}
                </div>
            </div>

            {/* Sidebar / Drawer Side */}
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <div className="menu p-6 w-80 min-h-full bg-base-100 text-base-content font-body">
                    <div className="flex items-center gap-3 mb-10 px-2">
                        <img src={logo} alt="Logo" className="h-8" />
                        <span className="font-heading font-bold text-xl">Better Tomorrow</span>
                    </div>

                    {user && (
                        <div className="flex flex-col items-center p-6 bg-base-200/50 rounded-3xl mb-6 text-center">
                            <div className="avatar mb-3">
                                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                    <img src={user?.photoURL || avatar} alt="user" />
                                </div>
                            </div>
                            <h3 className="font-bold text-lg">{user?.displayName}</h3>
                            <p className="text-xs text-base-content/60">{user?.email}</p>
                        </div>
                    )}

                    <ul className="space-y-1">
                        {/* Recursive or shared mobile links */}
                        {navLinks}
                        <div className="divider opacity-50"></div>
                        {user && eventLinks}
                    </ul>

                    <div className="mt-auto space-y-4 pt-6">
                        <ThemeSelector />
                        {!user && <Link to="/login" className="btn btn-primary w-full rounded-xl">Login</Link>}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;