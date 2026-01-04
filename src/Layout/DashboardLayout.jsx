import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router';
import { motion } from 'framer-motion';
import logo from '../assets/better-tomorrow-logo.png';
import useAuth from '../Hooks/useAuth';
import {
  IoStatsChartOutline,
  IoCalendarClearOutline,
  IoSettingsOutline,
  IoAddCircleOutline,
  IoPersonOutline,
  IoArrowBackOutline,
  IoLogOutOutline,
  IoReaderOutline
} from "react-icons/io5";
import { Toaster } from 'react-hot-toast';

const DashboardLayout = () => {
  const { user, signOutUser } = useAuth();

  const menuItems = [
    { label: "Overview", path: "/dashboard", icon: <IoStatsChartOutline /> },
    { label: "Joined", path: "/dashboard/joined", icon: <IoCalendarClearOutline /> },
    { label: "Manage", path: "/dashboard/manage", icon: <IoSettingsOutline /> },
    { label: "Create", path: "/dashboard/create", icon: <IoAddCircleOutline /> },
    { label: "Profile", path: "/dashboard/profile", icon: <IoPersonOutline /> },
    { label: "Write Blog", path: "/dashboard/write-blog", icon: <IoReaderOutline /> },
  ];

  return (
    <div className="flex h-screen bg-base-200/50 overflow-hidden">

      {/* --- SIDEBAR: Always Visible Rail --- */}
      <aside className="h-full bg-base-100 border-r border-base-200 transition-all duration-500 ease-in-out 
        w-20 lg:w-72 flex flex-col items-center lg:items-start group">

        {/* Logo Section */}
        <div className="py-8 px-4 lg:px-8 w-full">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-10 h-10 min-w-[40px] group-hover:rotate-12 transition-transform duration-500" />
            <span className="hidden lg:block font-heading font-black text-xl italic bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent truncate">
              Better Tomorrow
            </span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 w-full px-3 lg:px-6 space-y-2 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-4 py-4 rounded-2xl transition-all duration-300 relative group/link
                ${isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/20'
                  : 'text-base-content/40 hover:bg-base-200 hover:text-primary'}`
              }
            >
              {/* Icon Container */}
              <div className="w-full lg:w-auto flex justify-center lg:pl-4">
                <span className="text-2xl">{item.icon}</span>
              </div>

              {/* Label: Hidden on small screens, shown on Large */}
              <span className="hidden lg:block font-heading font-bold text-sm tracking-wide">
                {item.label}
              </span>

              {/* Tooltip for small screens (Optional) */}
              <div className="lg:hidden absolute left-20 bg-secondary text-white px-4 py-2 rounded-xl text-xs font-bold opacity-0 group-hover/link:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl whitespace-nowrap uppercase tracking-widest">
                {item.label}
              </div>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer: User & Back */}
        <div className="p-4 lg:p-6 w-full border-t border-base-200 space-y-4">
          <Link to="/" className="flex items-center gap-4 text-base-content/30 hover:text-primary transition-colors group/back py-2">
            <div className="w-full lg:w-auto flex justify-center lg:pl-2">
              <IoArrowBackOutline className="text-2xl" />
            </div>
            <span className="hidden lg:block text-xs font-bold uppercase tracking-widest">Exit Portal</span>
          </Link>

          <div className="flex items-center gap-3 p-2 lg:bg-base-200/50 rounded-2xl">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full border border-primary/20">
                <img src={user?.photoURL} alt="User" />
              </div>
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-xs font-black truncate">{user?.displayName}</p>
              <p className="text-[10px] opacity-40 uppercase tracking-tighter">Volunteer</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative">
        {/* Subtle Background Decorations for Bento feel */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />

        <div className="p-6 lg:p-12 relative z-10">
          {/* Dashboard Header Bar */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-1">
                Command Center
              </h2>
              <div className="h-1 w-12 bg-primary/20 rounded-full" />
            </div>

            {/* Quick Action Button for Mobile-friendly look */}
            <button
              onClick={() => signOutUser()}
              className="btn btn-ghost btn-circle text-error/40 hover:text-error hover:bg-error/5"
            >
              <IoLogOutOutline className="text-2xl" />
            </button>
          </div>

          <Outlet />
        </div>
      </main>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  );
};

export default DashboardLayout;