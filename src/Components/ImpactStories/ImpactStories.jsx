import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import useAxios from '../../Hooks/useAxios';
import EventCardSkeleton from '../../Components/Loader/EventCardSkeleton';

const ImpactStories = () => {
  const axiosInstance = useAxios();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch only the 3 most recent blogs
    axiosInstance.get('/blogs?limit=3&sortBy=createdAt&order=desc')
      .then(res => {
        setBlogs(res.data.blogs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosInstance]);

  return (
    <section className="py-24 bg-base-200/30">
      <div className="max-w-[1536px] mx-auto px-6 lg:px-12">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block"
            >
              Latest Updates
            </motion.span>
            <h2 className="font-heading text-4xl md:text-5xl font-black">
              Impact <span className="text-primary">Stories</span>
            </h2>
          </div>
          <Link to="/blogs" className="btn btn-ghost text-primary font-bold hover:bg-primary/5 rounded-full">
            View All Stories →
          </Link>
        </div>

        {/* Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            [...Array(3)].map((_, i) => <EventCardSkeleton key={i} />)
          ) : blogs.map((post, idx) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <Link to={`/blog/${post._id}`}>
                <div className="overflow-hidden rounded-[2.5rem] bg-base-100 border border-base-200 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-md text-secondary font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full">
                        Article
                      </span>
                    </div>
                  </div>

                  <div className="p-8 flex-grow">
                    <p className="text-xs font-medium text-base-content/40 mb-3 uppercase tracking-tighter">
                      {post.postDate}
                    </p>
                    <h3 className="font-heading text-xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="font-body text-base-content/60 text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStories;