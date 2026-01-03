import React from 'react';
import { motion } from 'framer-motion';
import logo from '../../assets/better-tomorrow-logo.png';
import { FaFacebook, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { IoLogoGithub } from 'react-icons/io';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Link } from 'react-router';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: <FaInstagram />, url: "https://www.instagram.com/_ddhrubb_/" },
        { icon: <FaFacebook />, url: "https://www.facebook.com/ahm.sakif24/" },
        { icon: <FaLinkedinIn />, url: "https://www.linkedin.com/in/sakif-ahmed-9b50881a9/" },
        { icon: <IoLogoGithub />, url: "https://github.com/ahmsakif" }
    ];

    return (
        <footer className='relative bg-[#06221a] pt-24 pb-12 overflow-hidden'>
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>

            <div className='max-w-[1536px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16'>
                
                {/* Left Column: Brand & Mission */}
                <div className='lg:col-span-5'>
                    <div className='flex items-center gap-4 mb-8'>
                        <img className='w-12 h-12 object-contain' src={logo} alt="Logo" />
                        <span className='text-white font-heading text-3xl font-black tracking-tight'>
                            Better<span className='text-primary'>Tomorrow</span>
                        </span>
                    </div>
                    
                    <p className='text-white/60 font-body text-lg leading-relaxed mb-8 max-w-md'>
                        A personal project dedicated to empowering communities through collective action. 
                        Building a bridge between willing volunteers and local social initiatives.
                    </p>

                    <div className='flex gap-4 mb-10'>
                        {socialLinks.map((social, idx) => (
                            <motion.a
                                key={idx}
                                href={social.url}
                                target='_blank'
                                rel="noreferrer"
                                whileHover={{ y: -5, scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className='w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/50 transition-colors text-xl'
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToTop} 
                        className='btn btn-outline border-white/20 text-white/80 rounded-full px-8 hover:bg-primary hover:border-primary transition-all font-heading'
                    >
                        <MdKeyboardDoubleArrowUp className='text-xl' /> 
                        Back To Top
                    </motion.button>
                </div>

                {/* Right Columns */}
                <div className='lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10'>
                    <div>
                        <h2 className='font-heading text-lg font-bold text-white mb-8 tracking-widest uppercase'>Navigation</h2>
                        <ul className='space-y-4 font-body text-white/50'>
                            <li><Link to='/' className='hover:text-primary transition-colors'>Home</Link></li>
                            <li><Link to='/events' className='hover:text-primary transition-colors'>All Events</Link></li>
                            <li><Link to='/gallery' className='hover:text-primary transition-colors'>Gallery</Link></li>
                            <li><Link to='/blogs' className='hover:text-primary transition-colors'>Stories</Link></li>
                        </ul>
                    </div>

                    {/* Personal Signature Column */}
                    <div>
                        <h2 className='font-heading text-lg font-bold text-white mb-8 tracking-widest uppercase'>Developer</h2>
                        <p className='text-white/50 font-body text-sm leading-relaxed'>
                            Designed and developed by <br />
                            <span className='text-primary font-bold'>Sakif Ahmed</span><br />
                            Student of Statistics, MC College.
                        </p>
                        <div className='mt-6 text-white/40 text-[10px] uppercase tracking-[0.2em]'>
                            Crafting with Logic & Passion
                        </div>
                    </div>

                    <div className='col-span-2 md:col-span-1'>
                        <h2 className='font-heading text-lg font-bold text-white mb-8 tracking-widest uppercase'>Legal</h2>
                        <ul className='space-y-4 font-body text-white/50'>
                            <li><Link className='hover:text-primary transition-colors'>Privacy</Link></li>
                            <li><Link className='hover:text-primary transition-colors'>Terms</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='mt-24 pt-8 border-t border-white/5'>
                <p className='text-white/30 text-center font-body text-sm tracking-widest'>
                    &copy; {currentYear} Better Tomorrow. Crafted by Sakif Ahmed.
                </p>
            </div>
        </footer>
    );
};

export default Footer;