import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/better-tomorrow-logo.png'
import ScrollToTop from '../../Utilities/ScrollToTop';
import useAuth from '../../Hooks/useAuth';
import { handleFirebaseSuccess } from '../../Utilities/handleFirebaseSuccess';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import avatar from '../../assets/user.png'


const Navbar = () => {

    const {
        user, loading, signOutUser
    } = useAuth()

    const handleLogOut = () => {
        signOutUser()
        handleFirebaseSuccess("logout")
    }

    const getActiveClass = ({ isActive }) => {
        return (
            isActive
                ? 'border-b-4 border-primary py-0.5'
                : 'border-b-4 border-transparent py-0.5'
        )
    }

    const navLinks = <>
        <li><NavLink to="/" className={getActiveClass}>Home</NavLink></li>
        <li><NavLink to="/events" className={getActiveClass}>Upcoming Events</NavLink></li>
        {
            user
                ? (
                    <>
                        <li><NavLink to="/profile">My Profile</NavLink></li>
                    </>
                )
                : ""
        }
    </>

    const eventLinks = <>
        {
            user
                ? (
                    <>
                        <li><NavLink to="/profile">My Profile</NavLink></li>
                        <li><NavLink to="/event/create">Create Event</NavLink></li>
                        <li><NavLink to="/event/manage">Manage Events</NavLink></li>
                        <li><NavLink to="/event/joined">Joined Events</NavLink></li>
                    </>
                )
                : ""
        }
    </>

    return (
        <div className=' bg-base-100  shadow-sm sticky top-0 z-[999]'>
            <nav className="navbar max-w-[1536px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 ">
                <div className="navbar-start">
                    <Link to="/" onClick={() => ScrollToTop()}  >
                        <div className='flex items-center gap-2 '>
                            <img
                                src={logo}
                                alt="Logo"
                                className='h-10'
                            />
                            <h2 className=' font-bold text-xl bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent ' >Better Tomorrow</h2>
                        </div>
                    </Link>
                </div>
                <div className="navbar-center hidden md:flex">
                    <ul className="flex items-center gap-8 font-medium *:hover:border-b-4 *:hover:border-primary *:border-transparent transition-all duration-200 ease-in-out ">
                        {/* <li className='relative hover:border-2 border-[#632EE3] hover:px-4 py-1 rounded-sm transition-all duration-100 ease-in-out' >
                            <NavLink to='/'>Home</NavLink>
                        </li>
                        <li className='relative hover:border-2 border-[#632EE3] hover:px-4 py-1 rounded-sm transition-all duration-100 ease-in-out ' >
                            <NavLink to='/apps' >Apps</NavLink>
                        </li>
                        <li className='relative hover:border-2 border-[#632EE3] hover:px-4 py-1 rounded-sm transition-all duration-100 ease-in-out ' >
                            <NavLink to='/installed-app' >Installation</NavLink>
                        </li> */}
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        {
                            loading ? (
                                <div role="button" className=" w-12 h-12 md:mr-5 rounded-full overflow-hidden border-3  bg-transparent flex justify-center items-center border-primary">
                                    <PuffLoader size={30} color='#ff6f61' />
                                </div>
                            ) : user
                                ? (
                                    <div className="dropdown dropdown-end">
                                        <div tabIndex={0} role="button" className=" w-12 h-12 md:mr-5 rounded-full overflow-hidden bg-white">
                                            <img src={user?.photoURL || avatar} alt={user?.displayName} title={user?.displayName} className=' object-cover object-center w-full h-full scale-125 ' />
                                        </div>
                                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                            {eventLinks}
                                        </ul>
                                    </div>)
                                : null
                        }
                    </div>
                    {
                        user
                            ? <button onClick={handleLogOut} className="btn btn-accent hidden md:block "> Logout</button>
                            : <Link to="/login" className="btn btn-primary "> Login</Link>
                    }
                    <div className='ml-3 hidden md:block'>
                        <ThemeSwitcher></ThemeSwitcher>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;