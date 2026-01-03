import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { ChartIcon, PlusIcon, SearchIcon } from './FeatureIconsSVG';

const FeatureCard = ({ icon, title, description, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
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

const Feature = () => {
  const features = [
    {
      icon: <SearchIcon />,
      title: "Discover Local Events",
      description: "Find volunteer opportunities right in your neighborhood. Filter by category, date, and location to join events that matter to you.",
      link: "/events"
    },
    {
      icon: <PlusIcon />,
      title: "Lead Your Initiative",
      description: "Have an idea for a clean-up drive or a donation camp? Post your own event in minutes and invite others to join your cause.",
      link: "/event/create"
    },
    {
      icon: <ChartIcon />,
      title: "Track Your Impact",
      description: "See a complete history of all the events you've joined and organized. Watch your contribution to a better tomorrow grow over time.",
      link: "/event/manage"
    }
  ];

  return (
    <section className="py-24 bg-base-200/50">
      <div className="max-w-[1536px] mx-auto px-6 lg:px-12">
        
        {/* Section Header with "Portfolio" Styling */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-primary font-bold tracking-widest uppercase text-sm mb-3 block"
            >
              Our Process
            </motion.span>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold">
              How It <span className="text-primary underline decoration-primary/30 underline-offset-8">Works</span>
            </h2>
          </div>
          <p className="font-body text-lg text-base-content/60 max-w-sm md:text-right">
            Transforming your intentions into measurable community impact.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <Link key={index} to={item.link}>
              <FeatureCard
                icon={item.icon}
                title={item.title}
                description={item.description}
                delay={index * 0.2}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;