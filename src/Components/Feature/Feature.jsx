import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { ChartIcon, PlusIcon, SearchIcon } from './FeatureIconsSVG';
import FeatureCard from './FeatureCard'

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
      link: "/dashboard/create"
    },
    {
      icon: <ChartIcon />,
      title: "Track Your Impact",
      description: "See a complete history of all the events you've joined and organized. Watch your contribution to a better tomorrow grow over time.",
      link: "/dashboard/manage"
    }
  ];

  return (
    <section className="py-24 bg-base-100">
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