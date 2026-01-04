import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import { format } from "date-fns";
import { motion } from 'framer-motion';
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { IoLocationOutline, IoCalendarOutline, IoTimeOutline, IoPeopleOutline } from "react-icons/io5";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = useAxios();
  const [joining, setJoining] = useState(false);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/events/${id}`);
        setEvent(response.data);
      } catch (err) {
        setError("Event not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, axiosInstance]);

  const handleJoinEvent = async () => {
    if (!user) {
      Swal.fire({
        title: "Join the Movement",
        text: "Please log in to participate in this initiative.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Login Now",
        confirmButtonColor: "#10b981", // Matching your primary emerald
      }).then((result) => {
        if (result.isConfirmed) navigate('/login', { state: { from: location } });
      });
      return;
    }

    try {
      setJoining(true);
      const response = await axiosSecure.post('/joined', { userEmail: user.email, eventId: event._id });
      if (response.data.insertedId) {
        Swal.fire({ icon: "success", title: "You're in! 🎉", text: "See you at the event.", showConfirmButton: false, timer: 2000 });
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Notice", text: err.response?.data?.message || "Something went wrong." });
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  if (error || !event) return <div className="min-h-screen flex items-center justify-center text-error"><h2>{error || "Event not found."}</h2></div>;

  return (
    <div className="min-h-screen bg-base-100 pb-24 pt-28">
      <div className="max-w-[1400px] mx-auto px-6">
        
        {/* 1. Hero Image Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative h-[500px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl"
        >
          <img src={event.thumbnailUrl} alt={event.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-2xl">
              <span className="badge badge-primary font-bold uppercase tracking-widest p-4 mb-4">{event.eventType}</span>
              <h1 className="text-4xl md:text-6xl font-black text-white font-heading leading-tight">{event.title}</h1>
            </div>
          </div>
        </motion.div>

        {/* 2. Content & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-8">
            <div className="bg-base-200/30 border border-base-200 p-8 md:p-12 rounded-[2.5rem]">
              <h3 className="text-2xl font-bold font-heading mb-6">About this Initiative</h3>
              <p className="font-body text-lg leading-relaxed text-base-content/70 whitespace-pre-line mb-10">
                {event.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-6 bg-base-100 rounded-3xl border border-base-200">
                  <div className="p-3 bg-primary/10 rounded-2xl text-primary text-2xl"><IoLocationOutline /></div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-base-content/40">Location</p>
                    <p className="font-semibold text-lg">{event.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-base-100 rounded-3xl border border-base-200">
                  <div className="p-3 bg-secondary/10 rounded-2xl text-secondary text-2xl"><IoPeopleOutline /></div>
                  <div>
                    <p className="text-xs uppercase tracking-widest font-bold text-base-content/40">Community Focus</p>
                    <p className="font-semibold text-lg">Open to All</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Action Card */}
          <aside className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="bg-base-100 border border-base-200 p-8 rounded-[2.5rem] shadow-xl">
                <div className="space-y-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl text-primary"><IoCalendarOutline /></div>
                    <div>
                      <p className="text-sm font-bold text-base-content/40 uppercase">Date</p>
                      <p className="text-lg font-black">{format(new Date(event.eventDate), "MMMM dd, yyyy")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-3xl text-primary"><IoTimeOutline /></div>
                    <div>
                      <p className="text-sm font-bold text-base-content/40 uppercase">Starting At</p>
                      <p className="text-lg font-black">{format(new Date(event.eventDate), "hh:mm a")}</p>
                    </div>
                  </div>
                </div>

                <button 
                  disabled={joining} 
                  onClick={handleJoinEvent} 
                  className="btn btn-primary btn-lg btn-block h-16 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all font-black uppercase tracking-widest"
                >
                  {joining ? <span className="loading loading-dots"></span> : "Join This Event"}
                </button>
              </div>

              {/* Organizer Card */}
              <div className="bg-secondary p-8 rounded-[2.5rem] text-white">
                <p className="text-xs uppercase font-bold tracking-[0.2em] mb-6 opacity-60 text-center">Organized By</p>
                <div className="flex flex-col items-center text-center">
                  <div className="avatar mb-4">
                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={event.creatorPhotoURL} alt={event.creatorName} />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold font-heading">{event.creatorName}</h4>
                  <p className="text-sm opacity-70">Project Leader</p>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
};

export default EventDetails;