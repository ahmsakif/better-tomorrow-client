import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/better-tomorrow-logo.png'
import { IoLogoGithub, IoLogOut, IoLogOutOutline, IoSettingsOutline, IoTrailSignOutline } from "react-icons/io5";
import ScrollToTop from '../../Utilities/ScrollToTop';
import { FaSignOutAlt } from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';
import { handleFirebaseSuccess } from '../../Utilities/handleFirebaseSuccess';


const Navbar = () => {

    const {
        user, loading, signOutUser
    } = useAuth()

    const handleLogOut = () => {
        signOutUser()
        handleFirebaseSuccess("logout")
    }

    return (
        <div className=' bg-base-100  shadow-sm sticky top-0 z-[999] '>
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
                    <ul className="flex items-center gap-8 font-medium ">
                        <li className='relative hover:border-2 border-[#632EE3] hover:px-4 py-1 rounded-sm transition-all duration-100 ease-in-out' >
                            <NavLink to='/'>Home</NavLink>
                        </li>
                        <li className='relative hover:border-2 border-[#632EE3] hover:px-4 py-1 rounded-sm transition-all duration-100 ease-in-out ' >
                            <NavLink to='/apps' >Apps</NavLink>
                        </li>
                        <li className='relative hover:border-2 border-[#632EE3] hover:px-4 py-1 rounded-sm transition-all duration-100 ease-in-out ' >
                            <NavLink to='/installed-app' >Installation</NavLink>
                        </li>
                    </ul>
                </div>
                <div className="navbar-end">
                    <div className="dropdown dropdown-end">
                        {
                            loading ? (
                                <div role="button" className=" w-12 h-12 mr-5 rounded-full overflow-hidden border-3  bg-transparent flex justify-center items-center border-primary">
                                    <PuffLoader size={30} color='#ff6f61' />
                                </div>
                            ) : user
                                ? (<div role="button" className=" w-12 h-12 mr-5 rounded-full overflow-hidden bg-white">
                                    <img src={user?.photoURL || avatar} alt={user?.displayName} title={user?.displayName} className=' object-cover object-center w-full h-full scale-125 ' />
                                </div>)
                                : null
                        }
                    </div>
                    {
                        user
                            ? <button onClick={handleLogOut} className="btn btn-accent "> Logout</button>
                            : <Link to="/login" className="btn btn-primary "> Login</Link>
                    }
                </div>
            </nav>
        </div>
    );
};

export default Navbar;