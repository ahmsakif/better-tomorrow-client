import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import ManageEventCard from '../ManageEventCard/ManageEventCard';
import Loader from '../Loader/Loader';

const ManageEvents = () => {

    const { user } = useAuth()
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosInstance = useAxios()
    console.log(events);
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await axiosInstance.get(`/myevents?email=${user.email}`);
                setEvents(response.data);

            } catch (error) {
                console.error("Failed to fetch event:", error);
                setError("Event not found or an error occurred.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [user, axiosInstance]);

    // Update handler
    const handleUpdate = async (id, updatedData) => {
        try {
            const response = await axiosInstance.patch(`/events/${id}`, updatedData);
            const updatedEvent = response.data;

            // Update state
            setEvents(prev => prev.map(e => e._id === id ? updatedEvent : e));
        } catch (error) {
            console.error("Failed to update event:", error);
        }
    };

    // Delete handler
    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/events/${id}`);
            setEvents(prev => prev.filter(e => e._id !== id));
        } catch (error) {
            console.error("Failed to delete event:", error);
        }
    };

    if (loading) {
        return <Loader></Loader>
    }

    // Show error message
    if (error) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="text-center text-red-500">
                    <h2 className="text-2xl font-bold">Oops!</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (!events) {
        return <div className="text-center my-20"><h2>Event not found.</h2></div>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Manage Your Events</h1>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map(event => (
                    <ManageEventCard
                        key={event._id}
                        event={event}
                        onUpdate={handleUpdate}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default ManageEvents;