import React from 'react';
import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  IoLocationOutline, 
  IoCalendarOutline, 
  IoPersonCircleOutline, 
  IoRibbonOutline 
} from "react-icons/io5";

const JoinedCard = ({ event }) => {
  const { title, eventType, location, eventDate, creatorName } = event;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative bg-base-100 border border-base-200 p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 group overflow-hidden"
    >
      {/* Decorative Background Accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[4rem] -mr-8 -mt-8 transition-all group-hover:bg-primary/10" />

      <div className="flex flex-col h-full relative z-10">
        
        {/* Event Type / Category Badge */}
        <div className="mb-6">
          <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-primary/10">
            {eventType || "General"}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-heading text-2xl font-black mb-4 tracking-tight group-hover:text-primary transition-colors leading-tight">
          {title}
        </h2>

        {/* Details List */}
        <div className="space-y-3 mb-8 flex-grow">
          <div className="flex items-center gap-3 text-base-content/50 group-hover:text-base-content/80 transition-colors">
            <IoLocationOutline className="text-xl text-primary" />
            <span className="text-sm font-medium font-body truncate">{location || "Location TBD"}</span>
          </div>

          <div className="flex items-center gap-3 text-base-content/50 group-hover:text-base-content/80 transition-colors">
            <IoCalendarOutline className="text-xl text-primary" />
            <span className="text-sm font-medium font-body italic">
              {eventDate ? format(new Date(eventDate), "dd MMM yyyy • hh:mm a") : "Date Pending"}
            </span>
          </div>
        </div>

        {/* Footer: Creator Info */}
        <div className="pt-6 border-t border-base-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/5 rounded-full text-secondary">
              <IoPersonCircleOutline className="text-2xl" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">Organized by</p>
              <p className="text-sm font-bold truncate max-w-[120px]">{creatorName}</p>
            </div>
          </div>
          
          <div className="w-10 h-10 rounded-full bg-base-200/50 flex items-center justify-center text-primary/40 group-hover:text-primary group-hover:bg-primary/10 transition-all">
            <IoRibbonOutline className="text-xl" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JoinedCard;