import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import logo from '../../assets/better-tomorrow-logo.png'
import ScrollToTop from '../../Utilities/ScrollToTop';
import useAuth from '../../Hooks/useAuth';
import { handleFirebaseSuccess } from '../../Utilities/handleFirebaseSuccess';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import avatar from '../../assets/user.png'
import ThemeSelector from '../ThemeSwitcher/ThemeSelector';


const Navbar = () => {

    const {
        user, loading, signOutUser
    } = useAuth()
    const navigate = useNavigate()

    const handleLogOut = () => {
        signOutUser()
        handleFirebaseSuccess("logout")
        navigate('/')
    }

    const getActiveClass = ({ isActive }) => {
        return (
            isActive
                ? 'border-b-4 border-primary py-0.5'
                : 'border-b-4 border-transparent py-0.5'
        )
    }
    const getSidebarActiveClass = ({ isActive }) => {
        return (
            isActive
                ? 'bg-base-300 py-1'
                : ' py-1 space-y-1'
        )
    }

    const navLinks = <>
        <li><NavLink to="/" className={getActiveClass}>Home</NavLink></li>
        <li><NavLink to="/events" className={getActiveClass}>Upcoming Events</NavLink></li>
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

    const sidebarLinks = <>
        {
            user
                ? (
                    <>
                        <li><NavLink className={getSidebarActiveClass} to="/profile">My Profile</NavLink></li>
                    </>
                )
                : ""
        }
        <li><NavLink to="/" className={getSidebarActiveClass}>Home</NavLink></li>
        <li><NavLink to="/events" className={getSidebarActiveClass}>Upcoming Events</NavLink></li>
        {
            user
                ? (
                    <>
                        <li><NavLink className={getSidebarActiveClass} to="/event/create">Create Event</NavLink></li>
                        <li><NavLink className={getSidebarActiveClass} to="/event/manage">Manage Events</NavLink></li>
                        <li><NavLink className={getSidebarActiveClass} to="/event/joined">Joined Events</NavLink></li>
                    </>
                )
                : ""
        }
    </>

    return (
        <div className=' bg-base-100  shadow-sm sticky top-0 z-[999]'>
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <nav className="navbar max-w-[1536px] mx-auto px-4 sm:px-5 md:px-6 lg:px-8 ">
                <div className="navbar-start">

                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>

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
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-8 font-medium *:hover:border-b-4 *:hover:border-primary *:border-transparent transition-all duration-200 ease-in-out ">
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
                    <div className='ml-3 hidden lg:block'>
                        <ThemeSwitcher></ThemeSwitcher>
                    </div>
                </div>

            </nav>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>

                <div className="menu bg-base-200 min-h-full w-80 p-4">
                    <div className=''>
                    </div>
                    {
                        loading ? (
                            <div role="button" className=" w-12 h-12 md:mr-5 rounded-full overflow-hidden border-3  bg-transparent flex justify-center items-center border-primary">
                                <PuffLoader size={30} color='#ff6f61' />
                            </div>
                        ) : user
                            ? (<>
                                <div className="overflow-hidden w-full h-60 mb-2 bg-base-100/60 flex flex-col justify-center items-center rounded-2xl ">
                                    <div className=' rounded-full w-25 h-25 mb-8 '>
                                        <img src={user?.photoURL || avatar} alt={user?.displayName} title={user?.displayName} className=' object-cover object-center w-full h-full rounded-full scale-125 ' />
                                    </div>
                                    <p className='text-lg font-semibold'>{user?.displayName}</p>
                                </div>

                            </>)
                            : null
                    }
                    {/* Sidebar content here */}
                    <ul>
                        {sidebarLinks}
                        <ThemeSelector></ThemeSelector>
                    </ul>
                    {
                        user?
                        (<button onClick={handleLogOut} className="btn btn-sm bg-accent mt-10"> Logout</button>)
                        : (<Link to="/login" className="btn btn-primary btn-sm mt-10 "> Login</Link>)
                    }
                    
                </div>
            </div>
        </div>
    );
};

export default Navbar;