import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../Hooks/useAuth';
import JoinedCard from '../JoinedCard/JoinedCard';
import Loader from '../Loader/Loader';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from "react-router";
import { IoCompassOutline, IoCalendarClearOutline } from "react-icons/io5";

const JoinedEvents = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);
        // Using the secure instance with the token verified backend
        const response = await axiosSecure.get(`/joined-events?email=${user.email}`);
        setEvents(response.data);
      } catch (error) {
        setError("System failed to retrieve participation data.");
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchEvent();
  }, [user, axiosSecure]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="bg-error/5 border border-error/20 p-10 rounded-[2.5rem] text-center max-w-md">
          <h2 className="text-2xl font-black text-error mb-2">Data Error</h2>
          <p className="text-sm opacity-60 font-body">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-4xl font-black font-heading tracking-tight">
            Joined <span className="text-primary">Initiatives</span>
          </h2>
          <p className="text-base-content/40 font-body text-sm mt-1 uppercase tracking-widest">
            History of your community participation
          </p>
        </div>
        <div className="bg-base-100 border border-base-200 px-5 py-2 rounded-2xl flex items-center gap-3">
          <IoCalendarClearOutline className="text-primary text-xl" />
          <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
            {events.length} Events Total
          </span>
        </div>
      </div>

      {/* --- Main Content --- */}
      {!events.length ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 border border-base-200 rounded-[3rem] p-12 md:p-20 text-center"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary text-4xl mx-auto mb-6">
            <IoCompassOutline />
          </div>
          <h2 className="font-heading font-black text-2xl mb-4">No Participation Found</h2>
          <p className="text-base-content/50 max-w-sm mx-auto mb-10 leading-relaxed font-body">
            You haven't committed to any initiatives yet. Start your journey by exploring upcoming events in your area.
          </p>

          <Link 
            to='/events' 
            className="btn btn-primary rounded-2xl px-10 h-14 font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all"
          >
            Explore Events
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
            >
              <JoinedCard event={event} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JoinedEvents;