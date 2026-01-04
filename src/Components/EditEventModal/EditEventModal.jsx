import React from "react";
import { createPortal } from "react-dom";
import { 
  IoCloseOutline, 
  IoTextOutline, 
  IoListOutline, 
  IoLocationOutline, 
  IoCalendarOutline,
  IoSaveOutline
} from "react-icons/io5";
import ImageUploadField from "../ImageUploadField/ImageUploadField"; // Import your new component

const EditEventModal = ({ isOpen, onClose, formData, setFormData, onUpdate, minDate }) => {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Logic to handle the successful ImgBB upload
  const handleImageSuccess = (url) => {
    setFormData(prev => ({ ...prev, thumbnailUrl: url }));
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="bg-base-100 w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-base-200 overflow-hidden relative">
        
        {/* --- Header --- */}
        <div className="bg-base-200/50 px-8 py-6 border-b border-base-200 flex justify-between items-center">
          <div>
            <h3 className="font-heading font-black text-xl uppercase tracking-tighter">
              Modify <span className="text-primary">Record</span>
            </h3>
            <p className="text-[11px] font-bold opacity-40 uppercase tracking-[0.2em] mt-1">
              Event ID: {formData._id?.slice(-8)}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="btn btn-ghost btn-circle text-2xl hover:bg-primary/10 hover:text-primary transition-all"
          >
            <IoCloseOutline />
          </button>
        </div>

        {/* --- Form Body --- */}
        <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Direct Image Upload Component */}
            <div className="md:col-span-2">
              <ImageUploadField 
                currentImage={formData.thumbnailUrl} 
                onUploadSuccess={handleImageSuccess} 
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest opacity-50 ml-2">
                <IoTextOutline /> Initiative Title
              </label>
              <input
                type="text"
                name="title"
                className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none focus:ring-2 ring-primary/20 font-bold"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest opacity-50 ml-2">
                <IoListOutline /> Category
              </label>
              <select
                name="eventType"
                className="select select-bordered w-full rounded-2xl bg-base-200 border-none font-bold"
                value={formData.eventType}
                onChange={handleChange}
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
                name="location"
                className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none font-bold"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            {/* Note: I removed the old URL input as the ImageUploadField replaces its functionality */}

            <div className="md:col-span-2 space-y-2">
              <label className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest opacity-50 ml-2">
                <IoCalendarOutline /> Scheduled Timestamp
              </label>
              <input
                type="datetime-local"
                name="eventDate"
                className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none font-bold text-sm"
                value={formData.eventDate}
                onChange={handleChange}
                min={minDate}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-widest opacity-50 ml-2">
                Brief Overview
              </label>
              <textarea
                name="description"
                className="textarea textarea-bordered w-full rounded-2xl bg-base-200/50 border-none h-32 resize-none font-body leading-relaxed"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* --- Footer --- */}
        <div className="bg-base-200/30 px-8 py-6 flex justify-end gap-4 border-t border-base-200">
          <button className="btn btn-ghost rounded-xl px-6 font-bold uppercase text-xs tracking-widest" onClick={onClose}>
            Discard
          </button>
          <button 
            className="btn btn-primary rounded-xl px-8 font-bold uppercase text-xs tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20" 
            onClick={() => onUpdate(formData)}
          >
            <IoSaveOutline className="text-lg" />
            Commit Changes
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EditEventModal;