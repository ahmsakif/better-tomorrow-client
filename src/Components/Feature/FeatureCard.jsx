import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8}}
      className="group relative h-full"
    >
      <div className="h-full bg-base-100 border border-base-200 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300">
        {/* Animated Icon Container */}
        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-500">
          {React.cloneElement(icon, { className: "w-8 h-8 stroke-[1.5]" })}
        </div>

        {/* Text Content */}
        <h3 className="font-heading text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="font-body text-base-content/70 leading-relaxed">
          {description}
        </p>

        {/* Decorative subtle number indicator for "Steps" */}
        <div className="absolute top-8 right-8 text-4xl font-black text-base-content/5 opacity-0 group-hover:opacity-100 transition-opacity select-none">
          {/* This will be passed or handled by index */}
        </div>
      </div>
    </motion.div>
  );
};

export default FeatureCard;