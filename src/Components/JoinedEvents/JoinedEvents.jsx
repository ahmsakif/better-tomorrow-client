import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import useAxios from '../../Hooks/useAxios';
import JoinedCard from '../JoinedCard/JoinedCard';
import Loader from '../Loader/Loader';

const JoinedEvents = () => {

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

                const response = await axiosInstance.get(`/joined-events?email=${user.email}`);
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
        <div className=' my-20 '>
<h1 className=' text-3xl md:text-5xl text-center font-semibold mb-10'>Joined Events</h1>
            <div className=' max-w-[1536px] mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6 '>
                {
                    events.map(event=><JoinedCard key={event._id} event={event}></JoinedCard>)
                }
            </div>
        </div>
    );
};

export default JoinedEvents;