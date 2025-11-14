import { motion } from "framer-motion";
import { format } from "date-fns";
import { FaMapMarkerAlt, FaCalendarAlt, FaUserTie, FaTag } from "react-icons/fa";

const JoinedCard = ({ event }) => {
  const { title, eventType, location, eventDate, creatorName } = event;
console.log(event); 
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="card bg-base-100 shadow-xl hover:border-primary transition-all duration-200 overflow-hidden"
    >
      <div className="card-body space-y-3 relative">
        {/* Accent Line */}
        <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-secondary rounded-r-md"></div>

        <h2 className="card-title text-2xl font-bold text-primary pl-3">
          {title}
        </h2>

        <div className="flex items-center gap-2 text-sm text-base-content/70 pl-3">
          <FaTag className="text-accent" />
          <span className="capitalize">{eventType || "General"}</span>
        </div>

        <div className="flex flex-wrap justify-between text-sm pl-3">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-error" />
            <span>{location || "Unknown location"}</span>
          </div>

          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-success" />
            <span>
              {eventDate
                ? format(new Date(eventDate), "dd MMM yyyy, h:mm a")
                : "Date not set"}
            </span>
          </div>
        </div>

        <div className="divider my-1"></div>

        <div className="flex items-center gap-2 pl-3 text-base-content/80">
          <FaUserTie className="text-info" />
          <p className="font-medium">
            Created by <span className="text-info font-semibold">{creatorName}</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default JoinedCard;