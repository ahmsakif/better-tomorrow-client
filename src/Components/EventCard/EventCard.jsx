import React from 'react';
import { format } from "date-fns";
import { Link } from 'react-router';
import { motion } from 'framer-motion';
import userAvatar from '../../assets/user.png'
import { 
  IoLocationOutline, 
  IoCalendarOutline, 
  IoArrowForwardOutline,
  IoPeopleOutline
} from "react-icons/io5";

const EventCard = ({ event }) => {
  const {
    _id,
    title,
    description,
    eventType,
    thumbnailUrl,
    location,
    eventDate,
    creatorName,
    creatorPhotoURL,
    participantsCount = 0 // Adding a metric for your statistics focus
  } = event;

  const formattedDate = format(new Date(eventDate), "dd MMM, yyyy");

  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group bg-base-100 rounded-[2.5rem] border border-base-200 overflow-hidden flex flex-col h-full shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500"
    >
      {/* 1. Image & Badge Area */}
      <figure className="relative h-64 overflow-hidden"> 
        <img 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
          src={thumbnailUrl} 
          alt={title} 
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src="https://placehold.co/600x400/1a4731/ffffff?text=Community+Event";
          }}
        />
        <div className="absolute top-6 left-6 flex gap-2">
            <span className="bg-white/90 backdrop-blur-md text-secondary font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                {eventType}
            </span>
        </div>
        {/* Statistics Metric Badge */}
        <div className="absolute bottom-6 right-6 bg-secondary/80 backdrop-blur-md text-white px-3 py-1.5 rounded-2xl flex items-center gap-2 text-xs font-bold">
            <IoPeopleOutline className="text-lg" />
            {participantsCount} Joined
        </div>
      </figure>

      {/* 2. Content Area */}
      <div className="p-8 flex flex-col flex-grow"> 
        {/* Creator Info */}
        <div className="flex items-center gap-3 mb-6">
            <img 
                src={creatorPhotoURL || userAvatar} 
                alt={creatorName} 
                className="w-8 h-8 rounded-full border border-primary/20 object-cover"
            />
            <span className="text-xs font-medium text-base-content/40 uppercase tracking-tighter">
                By <span className="text-base-content/80">{creatorName}</span>
            </span>
        </div>

        <h2 className="font-heading text-2xl font-black mb-3 group-hover:text-primary transition-colors line-clamp-1">
            {title}
        </h2>

        {/* Details List */}
        <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-base-content/60 text-sm">
                <IoCalendarOutline className="text-primary text-lg" />
                <span className="font-body">{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2 text-base-content/60 text-sm">
                <IoLocationOutline className="text-primary text-lg" />
                <span className="font-body line-clamp-1">{location}</span>
            </div>
        </div>

        <p className="font-body text-base-content/50 text-sm leading-relaxed line-clamp-2 mb-8 flex-grow">
            {description} 
        </p>

        {/* 3. Action Area */}
        <div className="pt-6 border-t border-base-200">
            <Link 
                to={`/event/details/${_id}`} 
                className="flex items-center justify-between group/btn text-secondary font-black font-heading uppercase text-sm tracking-widest hover:text-primary transition-colors"
            >
                View Details
                <div className="w-10 h-10 rounded-full bg-secondary/5 group-hover/btn:bg-primary group-hover/btn:text-white transition-all flex items-center justify-center">
                    <IoArrowForwardOutline className="text-xl" />
                </div>
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;