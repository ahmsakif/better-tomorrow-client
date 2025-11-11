import React from 'react';
import logo from '../../assets/better-tomorrow-logo.png'
import { FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Link } from 'react-router';
import ScrollToTop from '../../Utilities/ScrollToTop';

const Footer = () => {
    return (
        <div className='relative bg-green-950 py-20'>
            <div className='md:flex max-w-[1536px] mx-auto px-4 gap-20'>
                {/* left */}
                <div className='flex-1 '>
                    <div className='flex items-center gap-6 mb-6'>
                        <img className='w-14' src={logo} alt="" />
                        <p className='text-white font-semibold text-3xl bg-g fro '>Better Tomorrow</p>
                    </div>
                    <p className=' text-gray-100 mb-4'>"Better Tomorrow" is a community platform dedicated to positive change. Discover, create, and join local social service events like clean-up drives and tree plantations. It's the easiest way to find volunteer opportunities and make a difference in your neighborhood.</p>

                    <div className='flex gap-5 p-4 mb-2' >
                        <a
                            href="https://www.instagram.com/_ddhrubb_/"
                            target='_blank'
                            className=' group flex items-center space-x-2 transition-all '>

                            <div className=' hover:bg-linear-to-r from-primary to-secondary p-3 hover:text-white rounded-full transition-transform text-gray-400 duration-300 group-hover:scale-125 ' >
                                <FaInstagram className='' />
                            </div>
                        </a>
                        <a
                            href="https://www.facebook.com/ahm.sakif24/"
                            target='_blank'
                            className=' group flex items-center space-x-2 transition-all '>

                            <div className='text-gray-400 hover:bg-linear-to-r from-primary to-secondary p-3 hover:text-white rounded-full transition-transform duration-300 group-hover:scale-125 ' >
                                <FaFacebook />
                            </div>
                        </a>
                        <a
                            href="https://www.linkedin.com/in/sakif-ahmed-9b50881a9/"
                            target='_blank'
                            className=' group flex items-center space-x-2 transition-all '>

                            <div className='text-gray-400 hover:bg-linear-to-r from-primary to-secondary p-3 hover:text-white rounded-full transition-transform duration-300 group-hover:scale-125 ' >
                                <FaLinkedinIn />
                            </div>
                        </a>
                        <a
                            href="https://github.com/bitvotion"
                            target='_blank'
                            className=' group flex items-center space-x-2 transition-all '>

                            <div className='text-gray-400 hover:bg-linear-to-r from-primary to-secondary p-3 hover:text-white rounded-full transition-transform duration-300 group-hover:scale-125 ' >
                                <IoLogoGithub />
                            </div>
                        </a>
                    </div>
                    <div>
                        <button onClick={() => ScrollToTop()} className='btn bg-transparent border-primary text-primary hover:bg-primary hover:text-primary-content active:translate-y-0.5 '> <MdKeyboardDoubleArrowUp className='text-xl' />   Back To Top</button>
                    </div>
                </div>
                {/* Right */}
                <div className='flex-1 flex mt-5 md:0 text-gray-300'>
                    <div className='flex-1'>
                        <h2 className=' text-2xl font-medium text-gray-200 mb-6'>Site Map</h2>
                        <ul className='*:mb-2 text-gray-400 *:hover:text-gray-300 *:hover:underline'>
                            <li><Link>Homepage</Link></li>
                            <li><Link>About</Link></li>
                            <li><Link>Events</Link></li>
                            <li><Link>Gallery</Link></li>
                            <li><Link>Blogs</Link></li>
                            <li><Link>Contact</Link></li>
                            <li><Link>Portal</Link></li>
                        </ul>
                    </div>
                    <div className='flex-1'>
                        <h2 className=' text-2xl font-medium text-gray-200 mb-6'>Legal</h2>
                        <ul className='*:mb-2 text-gray-400 *:hover:text-gray-300 *:hover:underline'>
                            <li><Link>Privacy</Link></li>
                            <li><Link>Terms of Services</Link></li>
                            <li><Link>Lawyer's Corners</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='absolute bottom-0 w-full bg-gray-950 py-1'>
                <p className='text-gray-200 text-center'> &copy; 2025 All rights reserve. Better Tomorrow.</p>
            </div>
        </div>
    );
};

export default Footer;