import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import ImageUploadField from '../ImageUploadField/ImageUploadField';
import { 
  IoTextOutline, 
  IoLocationOutline, 
  IoListOutline, 
  IoCalendarOutline, 
  IoInformationCircleOutline,
  IoRocketOutline
} from 'react-icons/io5';

const CreateEvent = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

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
      return toast.error("Deployment parameters incomplete. Please check all fields.");
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

    const toastId = toast.loading("Initializing initiative protocol...");
    try {
      const response = await axiosSecure.post('/events', eventData);
      if (response.data.insertedId) {
        toast.success("Initiative active! Community synced.", { id: toastId });
        navigate('/dashboard/manage'); 
      }
    } catch (error) {
      toast.error("Protocol failure. System unable to post event.", { id: toastId });
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black font-heading tracking-tight">
            Deploy <span className="text-primary">Initiative</span>
          </h2>
          <p className="text-base-content/40 font-body text-sm mt-1 uppercase tracking-widest">
            Broadcast a new community service opportunity
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-base-100 border border-base-200 px-5 py-2 rounded-2xl">
          <IoInformationCircleOutline className="text-primary text-xl" />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
            Internal Node: {user?.displayName}
          </span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100 border border-base-200 rounded-[3rem] p-8 md:p-12 shadow-sm"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* --- Image Asset Section --- */}
          <div className="md:col-span-2">
            <ImageUploadField 
              currentImage={thumbnailUrl}
              onUploadSuccess={(url) => setThumbnailUrl(url)}
            />
          </div>

          {/* --- Title --- */}
          <div className="md:col-span-2 space-y-2">
            <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest opacity-50 ml-2">
              <IoTextOutline /> Initiative Title
            </label>
            <input
              type="text"
              placeholder="e.g., Coastal Cleanup Drive"
              className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none focus:ring-2 ring-primary/20 font-bold h-14"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* --- Type & Location --- */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest opacity-50 ml-2">
              <IoListOutline /> Event Category
            </label>
            <select
              className="select select-bordered w-full rounded-2xl bg-base-200/50 border-none font-bold h-14"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option>Cleanup</option>
              <option>Plantation</option>
              <option>Donation</option>
              <option>Blood Donation</option>
              <option>Education</option>
              <option>Food Drive</option>
              <option>Other</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest opacity-50 ml-2">
              <IoLocationOutline /> Deployment Location
            </label>
            <input
              type="text"
              placeholder="e.g., MC College, Sylhet"
              className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none font-bold h-14"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* --- Date Picker --- */}
          <div className="md:col-span-2 space-y-2">
            <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest opacity-50 ml-2">
              <IoCalendarOutline /> Scheduled Timestamp
            </label>
            <div className="relative">
              <DatePicker
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                className="w-full rounded-2xl bg-base-200/50 border-none font-bold h-14 pl-4 cursor-pointer focus:ring-2 ring-primary/20"
                placeholderText="Select Date & Time"
              />
            </div>
          </div>

          {/* --- Description --- */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest opacity-50 ml-2">
              Mission Overview
            </label>
            <textarea
              rows={4}
              placeholder="Explain the mission objectives and community impact..."
              className="textarea textarea-bordered w-full rounded-[2rem] bg-base-200/50 border-none font-body leading-relaxed p-6 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* --- Submit --- */}
          <div className="md:col-span-2 pt-4">
            <button
              type="submit"
              className="btn btn-primary btn-block rounded-2xl h-16 font-heading font-bold uppercase text-sm tracking-[0.2em] shadow-xl shadow-primary/20 flex items-center gap-3 transition-all hover:gap-6"
            >
              Launch Initiative <IoRocketOutline className="text-xl" />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateEvent;