import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loader from '../Loader/Loader';
import ManageEventCard from '../ManageEventCard/ManageEventCard';
import toast from 'react-hot-toast';
import { Link } from 'react-router';
import { IoAddCircleOutline, IoSettingsOutline, IoSparklesOutline } from 'react-icons/io5';

const ManageEvents = () => {
    const { user } = useAuth();
    const [events, setEvents] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        const fetchMyEvents = async () => {
            setDataLoading(true);
            try {
                if (user?.email) {
                    const response = await axiosSecure.get(`/myevents?email=${user.email}`);
                    setEvents(response.data);
                }
            } catch (error) {
                toast.error("Failed to sync management data.");
            } finally {
                setDataLoading(false);
            }
        };
        fetchMyEvents();
    }, [axiosSecure, user]);

    // Update Handler (Using your logic)
    const handleUpdate2 = async (_id, updatedData) => {
        const toastId = toast.loading("Updating system records...");
        try {
            const response = await axiosSecure.patch(`/events/${_id}`, updatedData);
            if (response.data.modifiedCount) {
                toast.success("Record updated successfully!", { id: toastId });
                setEvents(prev => prev.map(ev => ev._id === _id ? { ...ev, ...updatedData } : ev));
            } else {
                toast.error("No changes detected in the record.", { id: toastId });
            }
        } catch (error) {
            toast.error("Update sequence failed. Try again.", { id: toastId });
        }
    };

    // Delete Handler
    const handleDelete = async (id) => {
        try {
            const response = await axiosSecure.delete(`/events/${id}`);
            if (response.data.deletedCount === 1) {
                setEvents(prev => prev.filter(e => e._id !== id));
                toast.success("Event permanently removed.");
            }
        } catch (error) {
            toast.error("Failed to delete event.");
        }
    };

    if (dataLoading) return <Loader />;

    return (
        <div className="space-y-10">
            {/* --- Management Header --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h2 className="text-4xl font-black font-heading tracking-tight">
                        Admin <span className="text-primary">Console</span>
                    </h2>
                    <p className="text-base-content/40 font-body text-sm mt-1 uppercase tracking-widest">
                        Modify or manage your hosted initiatives
                    </p>
                </div>
                
                <Link 
                    to="/dashboard/create" 
                    className="btn btn-primary rounded-2xl px-8 h-14 font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center gap-2"
                >
                    <IoAddCircleOutline className="text-xl" />
                    Host New Event
                </Link>
            </div>

            {/* --- Conditional Content --- */}
            {!events.length ? (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-base-100 border border-base-200 rounded-[3rem] p-16 md:p-24 text-center"
                >
                    <div className="w-24 h-24 bg-secondary/10 rounded-[2rem] flex items-center justify-center text-secondary text-5xl mx-auto mb-8">
                        <IoSparklesOutline />
                    </div>
                    <h2 className="font-heading font-black text-2xl mb-4 text-base-content/80">
                        The console is empty.
                    </h2>
                    <p className="text-base-content/40 max-w-sm mx-auto mb-10 leading-relaxed font-body italic">
                        "You haven't initialized any events yet. Start by creating a new community initiative to see it managed here."
                    </p>
                    <Link to="/dashboard/create" className="btn btn-secondary rounded-2xl px-12 h-14 font-black">
                        Create Your First Event
                    </Link>
                </motion.div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-20">
                    {events.map((event, idx) => (
                        <motion.div
                            key={event._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                        >
                            <ManageEventCard
                                event={event}
                                onUpdate={handleUpdate2}
                                onDelete={handleDelete}
                            />
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ManageEvents;