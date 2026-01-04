import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { 
  IoLocationOutline, 
  IoCalendarOutline, 
  IoTimeOutline, 
  IoCreateOutline, 
  IoTrashOutline,
  IoFingerPrintOutline 
} from "react-icons/io5";
import userAvatar from "../../assets/user.png";
import EditEventModal from "../EditEventModal/EditEventModal";

const ManageEventCard = ({ event, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localEvent, setLocalEvent] = useState(event);

  useEffect(() => {
    if (event) setLocalEvent(event);
  }, [event]);

  const {
    _id,
    title,
    eventType,
    thumbnailUrl,
    location,
    eventDate,
    creatorName,
    creatorPhotoURL,
  } = localEvent;

  const formattedDate = format(new Date(eventDate), "dd MMM, yyyy");
  const formattedTime = format(new Date(eventDate), "hh:mm a");

  const handleUpdate = async (formData) => {
    onUpdate(_id, formData);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "This action will permanently remove the record from the database.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10b981", // Primary Emerald
      cancelButtonColor: "#ef4444", // Error Red
      confirmButtonText: "Confirm Delete",
      background: 'white',
      color: 'var(--text-base-content)',
      customClass: {
        popup: 'rounded-[2rem] border border-base-200 shadow-2xl font-body'
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await onDelete(_id);
          if (response?.deletedCount === 1) {
             // Success handled by parent toast usually, but you can keep a secondary check
          }
        } catch (error) {
          console.error("Delete Failed:", error);
        }
      }
    });
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-base-100 border border-base-200 rounded-[2.5rem] overflow-hidden flex flex-col h-full shadow-sm hover:shadow-2xl hover:border-primary/20 transition-all duration-500 group"
    >
      {/* --- Image Section --- */}
      <figure className="relative h-56 overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          src={thumbnailUrl || "https://placehold.co/600x400/1a4731/ffffff?text=Event+Image"}
          alt={title}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-md text-primary font-black text-[10px] uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg border border-primary/10">
            {eventType}
          </span>
        </div>
        {/* Event ID Badge for technical feel */}
        <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white/60 px-3 py-1 rounded-lg text-[9px] flex items-center gap-2 uppercase tracking-widest border border-white/10">
            <IoFingerPrintOutline /> ID: {_id.slice(-6)}
        </div>
      </figure>

      {/* --- Body Section --- */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full border border-primary/20 p-0.5">
             <img src={creatorPhotoURL || userAvatar} alt={creatorName} className="rounded-full w-full h-full object-cover" />
          </div>
          <span className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">
            Control Node: {creatorName}
          </span>
        </div>

        <h2 className="font-heading text-xl font-black mb-4 tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h2>

        <div className="space-y-3 mb-8 text-base-content/60 text-sm font-body">
          <div className="flex items-center gap-2">
            <IoLocationOutline className="text-primary text-lg" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <IoCalendarOutline className="text-primary" />
                <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
                <IoTimeOutline className="text-primary" />
                <span>{formattedTime}</span>
            </div>
          </div>
        </div>

        {/* --- Action Controls --- */}
        <div className="mt-auto pt-6 border-t border-base-200 flex gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 btn bg-primary/10 border-none text-primary hover:bg-primary hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] h-12 flex items-center gap-2 transition-all"
          >
            <IoCreateOutline className="text-lg" /> Edit
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-ghost bg-base-200/50 border-none text-error/60 hover:bg-error hover:text-white rounded-2xl px-5 h-12 transition-all"
          >
            <IoTrashOutline className="text-xl" />
          </button>
        </div>
      </div>

      <EditEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        formData={localEvent}
        setFormData={setLocalEvent}
        onUpdate={handleUpdate}
        minDate={new Date().toISOString().slice(0, 16)}
      />
    </motion.div>
  );
};

export default ManageEventCard;