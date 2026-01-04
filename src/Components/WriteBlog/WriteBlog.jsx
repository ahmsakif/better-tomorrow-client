import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import { 
  IoTextOutline, 
  IoImageOutline, 
  IoReaderOutline, 
  IoCloudUploadOutline,
  IoRocketOutline,
  IoInformationCircleOutline,
  IoTrashOutline,
  IoCalendarOutline // New Icon
} from 'react-icons/io5';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const WriteBlog = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleLocalPreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadToImgBB = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      return res.data.data.display_url;
    } catch (err) {
      console.error("ImgBB Error:", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const content = form.content.value;
    const eventDate = form.eventDate.value; // Manual User Input
    const imageFile = form.image.files[0];

    if (!imageFile) return toast.error("Deployment failure: Visual asset missing.");

    const toastId = toast.loading("Initializing manuscript protocol...");
    setUploading(true);

    try {
      const imageUrl = await uploadToImgBB(imageFile);
      if (!imageUrl) throw new Error("Cloud sync failed");

      const blogData = {
        title,
        content,
        image: imageUrl,
        author: user?.displayName,
        authorEmail: user?.email,
        eventDate, // When the event happened/will happen
        postDate: new Date().toLocaleDateString('en-GB'), // Automatic Posting Date
        excerpt: content.substring(0, 150) + "...",
        createdAt: new Date().toISOString()
      };

      const response = await axiosSecure.post('/blogs', blogData);
      
      if (response.data.insertedId) {
        toast.success("Article live on Knowledge Base!", { id: toastId });
        navigate('/blogs');
      }
    } catch (error) {
        console.log(error);
      toast.error("Protocol failure. System check required.", { id: toastId });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20 max-w-5xl mx-auto px-4 md:px-0">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 pt-10">
        <div>
          <h2 className="text-4xl font-black font-heading tracking-tight">
            Write <span className="text-primary">Article</span>
          </h2>
          <p className="text-base-content/40 font-body text-sm mt-1 uppercase tracking-widest">
            Publish insights to the community knowledge base
          </p>
        </div>
        <div className="flex items-center gap-3 bg-base-100 border border-base-200 px-5 py-2 rounded-2xl shadow-sm">
          <IoInformationCircleOutline className="text-primary text-xl" />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
            Author Node: {user?.displayName}
          </span>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-base-100 border border-base-200 rounded-[3rem] p-8 md:p-12 shadow-2xl"
      >
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10">
          
          {/* Header Visual Upload */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest opacity-40 ml-2">
              <IoImageOutline className="text-primary" /> Cover Visual Asset
            </label>
            <div className={`relative h-80 w-full rounded-[2.5rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center overflow-hidden 
              ${preview ? 'border-primary/40 bg-base-100' : 'border-base-300 bg-base-200/50 hover:border-primary/20'}`}>
              <AnimatePresence mode="wait">
                {preview ? (
                  <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative w-full h-full group">
                    <img src={preview} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button type="button" onClick={() => setPreview(null)} className="btn btn-circle btn-error text-white shadow-xl">
                         <IoTrashOutline className="text-2xl" />
                       </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="placeholder" className="text-center opacity-30">
                    <IoCloudUploadOutline className="text-6xl mx-auto mb-4" />
                    <p className="text-xs font-black uppercase tracking-[0.3em]">Select Manuscript Media</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <input type="file" name="image" accept="image/*" onChange={handleLocalPreview} className={`absolute inset-0 opacity-0 ${preview ? 'hidden' : 'cursor-pointer'}`} />
            </div>
          </div>

          {/* Title & Event Date Group */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest opacity-40 ml-2">
                <IoTextOutline className="text-primary" /> Article Headline
              </label>
              <input required name="title" type="text" placeholder="Headline goes here..." className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none font-bold h-16 text-xl placeholder:opacity-20 focus:ring-2 ring-primary/20 transition-all" />
            </div>

            {/* Event Date Input Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest opacity-40 ml-2">
                <IoCalendarOutline className="text-primary" /> Event Occurrence
              </label>
              <input required name="eventDate" type="date" className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none font-bold h-16 text-base focus:ring-2 ring-primary/20 transition-all" />
            </div>
          </div>

          {/* Content Body */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest opacity-40 ml-2">
              <IoReaderOutline className="text-primary" /> Manuscript Content
            </label>
            <textarea required name="content" rows={12} placeholder="Begin typing your narrative..." className="textarea textarea-bordered w-full rounded-[2.5rem] bg-base-200/50 border-none p-10 font-body leading-relaxed text-lg resize-none placeholder:opacity-20 focus:ring-2 ring-primary/20" />
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <button type="submit" disabled={uploading} className="btn btn-primary btn-block h-20 rounded-3xl font-black uppercase tracking-[0.3em] text-sm shadow-2xl shadow-primary/30 flex items-center gap-4 transition-all hover:gap-8">
              {uploading ? <span className="loading loading-spinner"></span> : <>Commit to Knowledge Base <IoRocketOutline className="text-2xl" /></>}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default WriteBlog;