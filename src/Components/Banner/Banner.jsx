import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
// Import your new AI generated image
import bannerImg from '../../assets/Gemini_Generated_Image_odhkkqodhkkqodhk.png'; 

const Banner = () => {
    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0, 
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    return (
        <section className="relative w-full h-[85vh] min-h-[650px] overflow-hidden flex items-center bg-secondary">
            {/* Background Image with Framer Motion Fade-In */}
            <motion.div 
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 z-0"
            >
                <img 
                    className="object-cover w-full h-full" 
                    src={bannerImg} 
                    alt="Community Garden Collaboration" 
                />
                {/* Subtle dark-to-transparent gradient to make text pop on the left */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1536px] mx-auto px-6 sm:px-12 lg:px-20">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-2xl text-left"
                >
                    {/* Active Badge */}
                    <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Live the Mission</span>
                    </motion.div>

                    {/* Main Heading */}
                    <motion.h1 variants={itemVariants} className="font-heading text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
                        Cultivating a <br />
                        <span className="text-primary italic">Better Tomorrow</span> <br />
                        Together.
                    </motion.h1>

                    {/* Subtext */}
                    <motion.p variants={itemVariants} className="font-body text-lg md:text-xl text-white/80 max-w-lg mb-10 leading-relaxed">
                        Join a community-driven platform where collective action creates real-world impact. Discover volunteer events that resonate with your heart.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-5">
                        <Link 
                            to="/events" 
                            className="btn btn-primary btn-lg rounded-full px-10 font-heading shadow-2xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all border-none"
                        >
                            Explore Events
                        </Link>
                        <button 
                            className="btn btn-outline btn-lg rounded-full px-10 text-white border-white/30 hover:bg-white hover:text-secondary hover:border-white transition-all backdrop-blur-sm"
                        >
                            Donate Now
                        </button>
                    </motion.div>
                </motion.div>
            </div>
            
            
        </section>
    );
};

export default Banner;