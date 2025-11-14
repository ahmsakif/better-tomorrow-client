import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { format } from "date-fns";
import { IoLocationOutline, IoCalendarOutline, IoTimeOutline } from "react-icons/io5";
import userAvatar from "../../assets/user.png";
import EditEventModal from "../EditEventModal/EditEventModal";
// import useAxios from "../../Hooks/useAxios";

const ManageEventCard = ({ event, onUpdate, onDelete }) => {
  // const axiosInstance = useAxios();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localEvent, setLocalEvent] = useState(event);
  const [isLoading, setIsLoading] = useState(!event);

  useEffect(() => {
    if (event) {
      setLocalEvent(event);
      setIsLoading(false);
    }
  }, [event]);

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
  } = localEvent;

  const formattedDate = format(new Date(eventDate), "EEEE, dd MMMM, yyyy");
  const formattedTime = format(new Date(eventDate), "hh:mm a");

  const handleUpdate = async (formData) => {

    onUpdate(_id, formData)

    setIsModalOpen(false);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await onDelete(_id)
          if (response.deletedCount === 1) {
            Swal.fire("Deleted!", "Your event has been deleted", "success")
          } else {
            Swal.fire("Failed!", "Event not found or already deleted.", "error");
          }
        } catch (error) {
          console.error("Deleted Failed:", error);
          Swal.fire("Failed!", "Could not delete the event. Try again", "error")
        }
      }
    });
  };

  return (
    <div className="card max-w-lg bg-base-100 shadow-xl rounded overflow-hidden flex flex-col">
      <figure className="relative h-64 md:h-72">
        <img
          className="h-full w-full object-cover"
          src={
            thumbnailUrl ||
            "https://placehold.co/600x400/3B3B3B/ffffff?text=Image+Not+Found"
          }
          alt={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/3B3B3B/ffffff?text=Image+Not+Found";
          }}
        />
        <div className="badge badge-secondary absolute top-4 right-4 font-bold p-2 text-sm">
          {eventType}
        </div>
      </figure>

      <div className="card-body p-4 flex flex-col gap-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full ring ring-secondary ring-offset-base-100 ring-offset-2">
              <img src={creatorPhotoURL || userAvatar} alt={creatorName} />
            </div>
          </div>
          <div className="truncate">
            <span className="text-xs text-base-content/70">Hosted by</span>
            <h3 className="font-semibold text-base-content truncate">
              {creatorName}
            </h3>
          </div>
        </div>

        <h2 className="card-title text-lg md:text-xl font-bold mb-1 truncate">
          {title}
        </h2>

        <div className="flex flex-col gap-1 text-base-content/80">
          <div className="flex items-center gap-2 truncate">
            <IoLocationOutline className="text-primary text-lg flex-shrink-0" />
            <span className="truncate">{location}</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <div className="flex items-center gap-1">
              <IoCalendarOutline className="text-primary" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <IoTimeOutline className="text-primary" />
              <span>{formattedTime}</span>
            </div>
          </div>
        </div>

        <p className="text-base-content/90 line-clamp-3 mt-2">{description}</p>

        <div className="mt-3 flex gap-2">
          <button
            className="btn btn-primary flex-1"
            onClick={() => setIsModalOpen(true)}
          >
            Edit
          </button>
          <button
            className="btn bg-red-400 text-base-100 flex-1"
            onClick={handleDelete}
          >
            Delete
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
    </div>
  );
};
export default ManageEventCard;