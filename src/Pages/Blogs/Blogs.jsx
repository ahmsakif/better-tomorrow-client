import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router'; // Added Link for navigation
import { IoTimeOutline, IoPersonOutline, IoArrowForward } from "react-icons/io5";
import useAxios from '../../Hooks/useAxios';
import EventCardSkeleton from '../../Components/Loader/EventCardSkeleton';
import Pagination from '../../Utilities/Pagination';

const Blogs = () => {
    const axiosInstance = useAxios();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`/blogs?page=${currentPage}&limit=6`)
            .then(res => {
                setBlogs(res.data.blogs || []);
                setTotalPages(res.data.totalPages || 1);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Failed to sync with Knowledge Base:", err);
                setLoading(false);
            });
    }, [currentPage, axiosInstance]);

    return (
        <div className="max-w-[1536px] mx-auto min-h-screen pb-24 px-6">
            {/* --- Section 1: Header --- */}
            <section className="pt-20 pb-16 text-center max-w-3xl mx-auto">
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-4 block"
                >
                    Knowledge Base
                </motion.span>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                    Community <span className="text-primary">Stories</span>
                </h1>
                <p className="font-body text-base-content/50 text-lg leading-relaxed">
                    Insights and deep dives into the impact of our collective actions across Bangladesh.
                </p>
            </section>

            {/* --- Section 2: Blog Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {loading ? (
                    [...Array(6)].map((_, i) => <EventCardSkeleton key={i} />)
                ) : blogs.length === 0 ? (
                    <div className="col-span-full py-20 text-center opacity-40 font-bold uppercase tracking-widest">
                        No articles found in the repository.
                    </div>
                ) : (
                    blogs.map((blog, idx) => (
                        <motion.div
                            key={blog._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="group bg-base-100 border border-base-200 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:border-primary/20 transition-all duration-500 flex flex-col h-full"
                        >
                            {/* Wrap entire card content in a Link to the specific blog ID */}
                            <Link to={`/blog/${blog._id}`} className="flex flex-col h-full">
                                {/* Image Wrapper */}
                                <div className="h-64 overflow-hidden relative">
                                    <img 
                                        src={blog.image} 
                                        alt={blog.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-primary shadow-lg">
                                        Report
                                    </div>
                                </div>

                                {/* Content Wrapper */}
                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 mb-4 text-xs font-bold text-base-content/40 uppercase tracking-widest">
                                        <span className="flex items-center gap-1.5">
                                            <IoPersonOutline className="text-primary text-sm"/> {blog.author}
                                        </span>
                                        <span className="flex items-center gap-1.5">
                                            <IoTimeOutline className="text-primary text-sm"/> {blog.postDate}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-black font-heading mb-4 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {blog.title}
                                    </h2>
                                    
                                    <p className="text-base-content/60 font-body text-sm leading-relaxed mb-8 line-clamp-3">
                                        {blog.excerpt}
                                    </p>

                                    <div className="mt-auto pt-6 border-t border-base-200">
                                        {/* Button label updated to "Read Full Blog" */}
                                        <div className="flex items-center gap-2 font-black uppercase text-[11px] tracking-widest text-primary group-hover:gap-4 transition-all">
                                            Read Full Blog <IoArrowForward className="text-lg" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))
                )}
            </div>

            {/* --- Section 3: Pagination --- */}
            {!loading && (
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={totalPages} 
                    onPageChange={(p) => setCurrentPage(p)} 
                />
            )}
        </div>
    );
};

export default Blogs;