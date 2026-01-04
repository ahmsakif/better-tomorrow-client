import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from 'sweetalert2';
import { IoPersonOutline, IoMailOutline, IoCallOutline, IoShieldCheckmarkOutline, IoCameraOutline, IoLogOutOutline, IoSaveOutline, IoCreateOutline, IoCloseOutline } from "react-icons/io5";
import { useNavigate } from 'react-router';
import useAuth from '../../Hooks/useAuth';
import Loader from '../Loader/Loader';
import ImageUploadField from "../ImageUploadField/ImageUploadField"; // Your new high-performance upload component

const Profile = () => {
  const { user, loading, signOutUser, updateUserProfile, setLoading } = useAuth();
  const [profile, setProfile] = useState({
    displayName: "",
    phoneNumber: "",
    photoURL: "",
  });
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setProfile({
        displayName: user?.displayName || "",
        phoneNumber: user?.phoneNumber || "",
        photoURL: user?.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    updateUserProfile(profile.displayName, profile.photoURL, profile.phoneNumber)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Node Updated!",
          text: "Profile parameters have been successfully synced.",
          confirmButtonColor: "#10b981",
          customClass: { popup: 'rounded-[2rem]' }
        });
        setIsEditing(false);
        setLoading(false);
      })
      .catch(error => {
        Swal.fire({ icon: "error", title: "Sync Failed!", text: error.message });
        setLoading(false);
      })
      .finally(() => setSaving(false));
  };

  if (loading) return <Loader />;
  if (!user) return <div className="min-h-screen flex items-center justify-center font-bold">Session Terminated. Please Login.</div>;

  return (
    <div className="space-y-10 pb-20">
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black font-heading tracking-tight">
            Account <span className="text-primary">Profile</span>
          </h2>
          <p className="text-base-content/40 font-body text-sm mt-1 uppercase tracking-widest">
            Manage your personal node parameters
          </p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)}
          className={`btn ${isEditing ? 'btn-ghost bg-base-300/30' : 'btn-primary'} rounded-2xl px-8 h-14 font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg`}
        >
          {isEditing ? <><IoCloseOutline className="text-xl"/> Cancel</> : <><IoCreateOutline className="text-xl"/> Edit Profile</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* --- Card 1: Avatar Module --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-4 bg-base-100 border border-base-200 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center shadow-sm"
        >
          {isEditing ? (
            <div className="w-full">
               <ImageUploadField 
                  currentImage={profile.photoURL}
                  onUploadSuccess={(url) => setProfile(prev => ({...prev, photoURL: url}))}
               />
            </div>
          ) : (
            <>
              <div className="relative group">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary/20 p-1 mb-6">
                  <img src={profile.photoURL} alt={profile.displayName} className="w-full h-full rounded-full object-cover" />
                </div>
                <div className="absolute bottom-6 right-2 bg-primary text-white p-3 rounded-full shadow-xl">
                  <IoShieldCheckmarkOutline className="text-xl" />
                </div>
              </div>
              <h3 className="text-2xl font-black font-heading">{profile.displayName}</h3>
              <p className="text-sm font-bold opacity-30 uppercase tracking-widest mt-1">Community Node</p>
            </>
          )}
        </motion.div>

        {/* --- Card 2: Information Module --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-8 bg-base-100 border border-base-200 rounded-[3rem] p-10 md:p-12 shadow-sm"
        >
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Name Field */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest opacity-40 ml-2">
                  <IoPersonOutline className="text-primary" /> Full Identity
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="displayName"
                    className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none font-bold h-14"
                    value={profile.displayName}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-lg font-bold bg-base-200/30 p-4 rounded-2xl border border-base-200/50">{profile.displayName}</p>
                )}
              </div>

              {/* Email Field (Always Read-Only) */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest opacity-40 ml-2">
                  <IoMailOutline className="text-primary" /> Email Channel
                </label>
                <p className="text-lg font-bold bg-base-200/30 p-4 rounded-2xl border border-base-200/50 opacity-60 italic">{user?.email}</p>
              </div>

              {/* Phone Field */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest opacity-40 ml-2">
                  <IoCallOutline className="text-primary" /> Contact Line
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    className="input input-bordered w-full rounded-2xl bg-base-200/50 border-none font-bold h-14"
                    value={profile.phoneNumber}
                    onChange={handleChange}
                  />
                ) : (
                  <p className="text-lg font-bold bg-base-200/30 p-4 rounded-2xl border border-base-200/50">{profile.phoneNumber || "N/A"}</p>
                )}
              </div>

              {/* Status Section */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest opacity-40 ml-2">
                  Account Status
                </label>
                <div className="flex items-center gap-3 bg-success/5 p-4 rounded-2xl border border-success/20">
                    <span className="w-3 h-3 bg-success rounded-full animate-pulse"></span>
                    <span className="text-success font-black uppercase tracking-widest text-xs">Verified Volunteer</span>
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            {isEditing && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="pt-6 border-t border-base-200"
              >
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="btn btn-primary rounded-2xl px-12 h-16 font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-primary/20 transition-all hover:gap-5"
                >
                  {saving ? <span className="loading loading-dots"></span> : <><IoSaveOutline className="text-xl"/> Sync Changes</>}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* --- Card 3: System Exit Module --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-12 bg-base-100 border border-base-200 rounded-[3rem] p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-error/10 text-error rounded-2xl flex items-center justify-center text-2xl">
              <IoLogOutOutline />
            </div>
            <div>
              <h4 className="font-heading font-black text-xl uppercase tracking-tighter">Terminate Session</h4>
              <p className="text-sm text-base-content/40 font-body">Sign out from the better tomorrow console.</p>
            </div>
          </div>
          <button
            onClick={() => {
              signOutUser();
              navigate("/");
            }}
            className="btn btn-ghost bg-error/10 text-error hover:bg-error hover:text-white rounded-2xl px-10 h-14 font-black uppercase tracking-widest"
          >
            Logout Node
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;