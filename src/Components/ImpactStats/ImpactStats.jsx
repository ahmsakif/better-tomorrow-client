import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useRef } from 'react';

// Reusable Animated Counter Component
const Counter = ({ value, title, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, { duration: 2, ease: "easeOut" });
      return controls.stop;
    }
  }, [value, isInView]);

  return (
    <div ref={ref} className="flex flex-col items-center p-6">
      <div className="flex items-center text-4xl md:text-5xl font-black font-heading text-primary">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </div>
      <p className="text-xs md:text-sm font-body font-bold text-base-content/50 uppercase tracking-[0.2em] mt-3">
        {title}
      </p>
    </div>
  );
};

const ImpactStats = () => {
  return (
    <section className="relative z-30 -mt-12 max-w-7xl mx-auto px-6 ">
      <div className="bg-base-100 border border-base-200 shadow-xl rounded-[2.5rem] p-8 md:p-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-base-200">
          <Counter value={1200} title="Volunteers" suffix="+" />
          <Counter value={450} title="Events Hosted" suffix="" />
          <Counter value={85} title="Communities" suffix="+" />
          <Counter value={15} title="Impact Score" suffix="k" />
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;