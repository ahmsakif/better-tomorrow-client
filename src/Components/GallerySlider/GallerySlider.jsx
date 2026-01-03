import React from 'react';
import { motion } from 'framer-motion';

const Gallery = () => {
  const storyImages = [
    { id: 1, src: "https://i.ibb.co.com/dwZ9P2RR/IMG-6579.jpg", title: "Community Support", span: "md:col-span-2 md:row-span-12" },
    { id: 2, src: "https://i.ibb.co.com/C39s6pWm/IMG-6597.jpg", title: "Agricultural Training", span: "md:col-span-1 md:row-span-6" },
    { id: 3, src: "https://i.ibb.co.com/Z1BccLCj/IMG-6588.jpg", title: "Medical Assistance", span: "md:col-span-1 md:row-span-6" },
    { id: 4, src: "https://i.ibb.co.com/M5ZhZFZD/IMG-6596.jpg", title: "Local Farming", span: "md:col-span-1 md:row-span-6" },
    { id: 5, src: "https://i.ibb.co.com/jknVdJHt/IMG-6600.jpg", title: "Skill Development", span: "md:col-span-2 md:row-span-6" },
  ];

  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-[1536px] mx-auto px-6 lg:px-12">
        
        <div className="mb-16">
          <span className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block">Visual Impact</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black">
            Our Community <span className="text-primary">In Action</span>
          </h2>
        </div>

        {/* 12-Row System for Perfect Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-18 gap-6 h-auto md:h-[950px]">
          {storyImages.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`group relative overflow-hidden rounded-[2.5rem] bg-base-200 ${img.span}`}
            >
              <img 
                src={img.src} 
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                <h3 className="font-heading text-xl font-bold text-white uppercase tracking-wider">{img.title}</h3>
                <div className="w-10 h-1 bg-primary mt-2 rounded-full"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
            <button className="btn btn-ghost gap-2 hover:bg-primary/5 text-base-content/40 font-medium">
                View All Stories 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
            </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;