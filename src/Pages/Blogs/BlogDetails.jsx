import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { 
  IoArrowBackOutline, 
  IoCalendarOutline, 
  IoTimeOutline, 
  IoPersonOutline, 
  IoShareSocialOutline 
} from "react-icons/io5";
import useAxios from '../../Hooks/useAxios';
import EventCardSkeleton from '../../Components/Loader/EventCardSkeleton';

const BlogDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const axiosInstance = useAxios();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`/blog/${id}`)
            .then(res => {
                setBlog(res.data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id, axiosInstance]);

    if (loading) return (
        <div className="max-w-4xl mx-auto py-20 px-6">
            <EventCardSkeleton />
        </div>
    );

    if (!blog) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
            <h2 className="text-3xl font-black mb-4">Manuscript Terminated</h2>
            <p className="opacity-50 mb-8 uppercase tracking-widest text-xs font-bold">The requested report does not exist in the node database.</p>
            <button onClick={() => navigate('/blogs')} className="btn btn-primary rounded-2xl px-8">Return to Knowledge Base</button>
        </div>
    );

    return (
        <div className="bg-base-100 min-h-screen pb-32">
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 bg-base-100/80 backdrop-blur-xl border-b border-base-200">
                <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center gap-2 font-black uppercase text-[10px] tracking-widest hover:text-primary transition-colors"
                    >
                        <IoArrowBackOutline className="text-xl" /> Back to Repository
                    </button>
                    <button className="btn btn-ghost btn-circle text-xl">
                        <IoShareSocialOutline />
                    </button>
                </div>
            </nav>

            <article className="max-w-4xl mx-auto pt-12 px-6">
                {/* Header Metadata */}
                <header className="mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-wrap items-center gap-4 mb-6"
                    >
                        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            Impact Report
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-40">
                            <IoTimeOutline /> Published {blog.postDate}
                        </div>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-black font-heading leading-[1.1] mb-8"
                    >
                        {blog.title}
                    </motion.h1>

                    {/* Author & Event Info Bento Card */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-base-200/50 rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center justify-between border border-base-200"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white text-2xl shadow-lg shadow-primary/20">
                                <IoPersonOutline />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-0.5">Primary Author</p>
                                <h4 className="font-black text-lg">{blog.author}</h4>
                            </div>
                        </div>

                        <div className="flex flex-col md:items-end">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1 flex items-center gap-2">
                                <IoCalendarOutline /> Event Occurrence
                            </p>
                            <h4 className="font-black text-xl text-primary">{blog.eventDate}</h4>
                        </div>
                    </motion.div>
                </header>

                {/* Featured Image */}
                <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-[3rem] overflow-hidden shadow-2xl mb-16 border-4 border-white"
                >
                    <img src={blog.image} alt={blog.title} className="w-full h-auto object-cover max-h-[600px]" />
                </motion.div>

                {/* Main Content Body */}
                <motion.section 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="prose prose-lg max-w-none prose-headings:font-black prose-headings:font-heading prose-p:font-body prose-p:text-base-content/70 prose-p:leading-[1.8] prose-strong:text-primary"
                >
                    {/* Splits content by newlines to create proper paragraphs */}
                    {blog.content.split('\n').map((paragraph, i) => (
                        paragraph.trim() && <p key={i}>{paragraph}</p>
                    ))}
                </motion.section>

                {/* Footer Signature */}
                <footer className="mt-20 pt-10 border-t border-base-200 flex flex-col items-center text-center">
                    <div className="text-4xl mb-4">🌱</div>
                    <h5 className="font-black uppercase tracking-[0.3em] text-[10px] opacity-30">Better Tomorrow Node Network</h5>
                    <p className="text-xs font-bold opacity-20 mt-2">© 2026 Social Development Initiatives</p>
                </footer>
            </article>
        </div>
    );
};

export default BlogDetails;