import React from 'react';
import { format } from "date-fns";
import { Link } from 'react-router';
import userAvatar from '../../assets/user.png'
import { 
  IoLocationOutline, 
  IoCalendarOutline, 
  IoTimeOutline,
  IoTicketOutline
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
    creatorPhotoURL
  } = event;

  const formattedDate = format(new Date(eventDate), "EEEE, dd MMMM, yyyy");
  const formattedTime = format(new Date(eventDate), "hh:mm a");

  return (
    <div className="card max-w-lg bg-base-100 shadow-xl rounded overflow-hidden  transition-all duration-300 hover:shadow-2xl">
      <figure className="relative h-80"> 
        <img 
          className="h-full w-full object-cover" 
          src={thumbnailUrl} 
          alt={title} 
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src="https://placehold.co/600x400/3B3B3B/ffffff?text=Image+Not+Found";
          }}
        />
        <div className="badge badge-secondary absolute top-4 right-4 m-0 font-bold p-3">
          {eventType}
        </div>
      </figure>

      <div className="card-body p-6 flex flex-col"> 
        
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              {
                !creatorPhotoURL
                ? <img src={userAvatar} alt={creatorName} />
                : <img src={creatorPhotoURL} alt={creatorName} />
              }
            </div>
          </div>
          <div>
            <span className="text-sm text-base-content/70">Hosted by</span>
            <h3 className="font-semibold text-base-content">{creatorName}</h3>
          </div>
        </div>

        <h2 className="card-title text-2xl font-bold mb-2 min-h-10  ">{title}</h2>

        <div className="flex flex-col gap-2 text-base-content/80 mb-2">
          <div className="flex items-center gap-2">
            <IoLocationOutline className="text-primary text-xl" />
            <span className="font-medium">{location}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <div className="flex items-center gap-2">
              <IoCalendarOutline className="text-primary text-lg" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <IoTimeOutline className="text-primary text-lg" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>

        <div className="text-base-content/90 flex-grow">
          <p className="line-clamp-2">
            {description} 
          </p>
        </div>
      </div>
      <div className="justify-end w-full">
          <Link to={`/events/${_id}`} className="btn btn-secondary border-none btn-block rounded-none text-lg h-14 hover:bg-linear-to-r from-primary to-secondary transition-all duration-500 ease-in-out ">
            <IoTicketOutline className="text-xl" /> View Event Details
          </Link>
        </div>
    </div>
  );
};

export default EventCard;