import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import { FaMapMarkerAlt, FaCalendarAlt, FaImage, FaTag } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const CreateEvent = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('Cleanup');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [location, setLocation] = useState('');
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [eventDate, setEventDate] = useState(tomorrow);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !thumbnailUrl || !location) {
      return toast.error("Please fill in all fields.");
    }
    if (eventDate < new Date()) {
        return toast.error("Event date must be in the future.");
    }

    const eventData = {
      title,
      description,
      eventType,
      thumbnailUrl,
      location,
      eventDate: eventDate.toISOString(),
      creatorEmail: user?.email,
      creatorName: user?.displayName,
      creatorPhotoURL: user?.photoURL,
      createdAt: new Date().toISOString(), 
    };

    const toastId = toast.loading("Creating your event...");
    try {
      const response = await axiosSecure.post('/events', eventData);
      if (response.data.insertedId) {
        toast.success("Event created successfully!", { id: toastId });
        navigate('/events'); 
      } else {
        toast.error("An unknown error occurred.", { id: toastId });
      }
    } catch (error) {
      console.error("Failed to create event:", error);
      toast.error("Failed to create event. Please try again.", { id: toastId });
    }
  };

  return (
    <div className="flex w-full md:py-12 lg:py-20 items-center justify-center bg-base-200">
      <div className="w-full max-w-2xl bg-base-100 p-10 rounded-xl shadow-lg">
        <h2 className="mb-2 text-3xl font-semibold text-base-content text-center">
          Create a New Event
        </h2>
        <p className="mb-8 text-center text-base-content text-opacity-70">
          Connect volunteers with communities through this event.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Event Title */}
          <div>
            <label className="mb-1 block text-sm font-medium text-base-content">Event Title</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g., Mirpur 10 Road Cleanup"
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="mb-1 block text-sm font-medium text-base-content">Location</label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g., Mirpur 10, Dhaka"
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Event Type */}
          <div>
            <label className="mb-1 block text-sm font-medium text-base-content">Event Type</label>
            <div className="relative">
              <select
                className="w-full rounded-lg border border-gray-300 p-3 pl-3 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
              >
                <option>Cleanup</option>
                <option>Plantation</option>
                <option>Donation</option>
                <option>Education</option>
                <option>Food Drive</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Thumbnail URL */}
          <div>
            <label className="mb-1 block text-sm font-medium text-base-content">Thumbnail URL</label>
            <div className="relative">
              <input
                type="url"
                placeholder="https://your-image-url.jpg"
                className="w-full rounded-lg border border-gray-300 p-3 pl-10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
              />
              <FaImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div>
            
          </div>

          {/* Event Date */}
          <div>
            <label className="mb-1 block text-sm font-medium text-base-content">Event Date & Time</label>
            <div className="relative">
              <DatePicker
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                showTimeSelect
                timeInputLabel="Time:"
                timeFormat="hh:mm aa"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                showTimeInput
                minDate={new Date()}
                className="w-64 rounded-lg border border-gray-300 p-3 pl-10 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer"
                placeholderText="Select Date & Time"
              />
              <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-base-content">Event Description</label>
            <textarea
              rows={5}
              placeholder="Tell us more about the event..."
              className="w-full rounded-lg border border-gray-300 p-3 focus:border-secondary focus:outline-none focus:ring-1 focus:ring-secondary"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-secondary py-3 text-white font-semibold shadow-md hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
