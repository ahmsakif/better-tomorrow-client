import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { PuffLoader } from 'react-spinners';
import logo from '../../assets/better-tomorrow-logo.png';
import avatarPlaceholder from '../../assets/user.png';
import useAuth from '../../Hooks/useAuth';
import ScrollToTop from '../../Utilities/ScrollToTop';
import { handleFirebaseSuccess } from '../../Utilities/handleFirebaseSuccess';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import ThemeSelector from '../ThemeSwitcher/ThemeSelector';
import { IoChevronDownOutline, IoLogOutOutline } from "react-icons/io5";

const Navbar = () => {
  const { user, loading, signOutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOutUser();
    handleFirebaseSuccess("logout");
    navigate('/');
  };

  // Pill-style active link class
  const getActiveClass = ({ isActive }) =>
    `relative px-5 py-2 transition-all duration-300 font-bold font-heading rounded-full text-sm uppercase tracking-widest
    ${isActive ? 'bg-primary/10 text-primary' : 'hover:bg-base-200 text-base-content/60 hover:text-primary'}`;

  // Public Links
  const navLinks = (
    <>
      <li><NavLink to="/" end className={getActiveClass}>Home</NavLink></li>
      <li><NavLink to="/events" className={getActiveClass}>Events</NavLink></li>
      <li><NavLink to="/blogs" className={getActiveClass}>Blogs</NavLink></li>
      <li><NavLink to="/about" className={getActiveClass}>About</NavLink></li>
    </>
  );

  // Dashboard Sub-links for the Profile Dropdown
  const userDropdownLinks = (
    <>
      <div className="px-4 py-2 text-[10px] font-black text-base-content/30 uppercase tracking-[0.2em]">Account Management</div>
      <li><NavLink to="/dashboard/profile" className="hover:bg-primary/10 rounded-xl py-3 px-4 transition-colors">My Profile</NavLink></li>
      <li><NavLink to="/dashboard/joined" className="hover:bg-primary/10 rounded-xl py-3 px-4 transition-colors">Joined Initiatives</NavLink></li>
      <li><NavLink to="/dashboard/manage" className="hover:bg-primary/10 rounded-xl py-3 px-4 transition-colors">Manage My Events</NavLink></li>
      <li><NavLink to="/dashboard/create" className="hover:bg-primary/10 rounded-xl py-3 px-4 transition-colors">Post New Event</NavLink></li>
      <div className="divider my-1 opacity-50"></div>
      <li>
        <button onClick={handleLogOut} className="text-error hover:bg-error/10 rounded-xl py-3 px-4 font-bold flex items-center justify-between">
          Logout <IoLogOutOutline className="text-lg" />
        </button>
      </li>
    </>
  );

  return (
    <header className="sticky top-0 z-[999] w-full border-b border-base-200 bg-base-100/80 backdrop-blur-md">
      <div className="max-w-[1536px] mx-auto navbar px-4 lg:px-8 h-20">
        
        {/* Navbar Start: Logo & Mobile Toggle */}
        <div className="navbar-start">
          <div className="lg:hidden">
            <label htmlFor="my-drawer-nav" className="btn btn-ghost btn-circle text-base-content">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </label>
          </div>
          
          <Link to="/" onClick={() => ScrollToTop()} className="flex items-center gap-3 group">
            <img src={logo} alt="Logo" className="h-10 w-auto group-hover:rotate-12 transition-transform duration-500" />
            <h2 className="hidden sm:block font-heading font-black text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent italic tracking-tighter">
              Better Tomorrow
            </h2>
          </Link>
        </div>

        {/* Navbar Center: Main Navigation */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2">
            {navLinks}
          </ul>
        </div>

        {/* Navbar End: Auth, Dashboard & Theme */}
        <div className="navbar-end gap-3">
          <div className="hidden md:flex items-center">
            <ThemeSwitcher />
          </div>

          {loading ? (
            <div className="w-10 h-10 flex items-center justify-center">
              <PuffLoader size={24} color="#10b981" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-3">
              {/* 1. Profile Dropdown */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="group flex items-center gap-2 p-1 rounded-full border border-base-200 hover:border-primary/40 transition-all cursor-pointer">
                  <div className="w-9 h-9 rounded-full border-2 border-primary/20 p-0.5 overflow-hidden">
                    <img src={user?.photoURL || avatarPlaceholder} alt="User" className="w-full h-full rounded-full object-cover" />
                  </div>
                  <IoChevronDownOutline className="text-base-content/30 group-hover:text-primary transition-colors mr-1" />
                </div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow-2xl bg-base-100 rounded-[2rem] w-64 border border-base-200 mt-4 animate-in fade-in zoom-in duration-300">
                  {userDropdownLinks}
                </ul>
              </div>

              {/* 2. Standalone Dashboard Button (Placed Right after Profile) */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link 
                  to="/dashboard" 
                  className="btn btn-primary btn-sm rounded-xl px-6 h-11 min-h-0 font-heading font-bold uppercase text-[14px] tracking-widest shadow-lg shadow-primary/20"
                >
                  Dashboard
                </Link>
              </motion.div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary rounded-full px-10 font-black tracking-widest uppercase text-xs shadow-lg shadow-primary/10">
              Login
            </Link>
          )}
        </div>
      </div>

      {/* --- Mobile Drawer Interface --- */}
      <input id="my-drawer-nav" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side">
        <label htmlFor="my-drawer-nav" className="drawer-overlay"></label>
        <div className="menu p-8 w-80 min-h-full bg-base-100 text-base-content font-body">
          <div className="flex items-center gap-3 mb-12">
            <img src={logo} alt="Logo" className="h-8" />
            <span className="font-heading font-black text-xl italic">Better Tomorrow</span>
          </div>

          {user && (
            <div className="flex flex-col items-center p-8 bg-base-200 rounded-[2.5rem] mb-8 text-center">
              <div className="avatar mb-4">
                <div className="w-20 h-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                  <img src={user?.photoURL || avatarPlaceholder} alt="User" className="rounded-full" />
                </div>
              </div>
              <h3 className="font-heading font-bold text-xl">{user?.displayName}</h3>
              <p className="text-[10px] text-primary font-black uppercase tracking-widest mt-1">Impact Maker</p>
            </div>
          )}

          <ul className="space-y-2">
            {navLinks}
            {user && (
              <>
                <div className="divider opacity-30 my-6 text-[10px] uppercase font-bold tracking-widest">Management</div>
                <li>
                  <Link to="/dashboard" className="bg-primary/10 text-primary font-black rounded-xl py-4 mb-2">
                    Open Dashboard
                  </Link>
                </li>
                {userDropdownLinks}
              </>
            )}
          </ul>

          <div className="mt-auto pt-10">
            <ThemeSelector />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;