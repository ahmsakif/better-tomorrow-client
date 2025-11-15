import React, { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import JoinedCard from '../JoinedCard/JoinedCard';
import Loader from '../Loader/Loader';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { Link } from "react-router";
import { TiWorld } from "react-icons/ti";

const JoinedEvents = () => {

  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosSecure.get(`/joined-events?email=${user.email}`);
        setEvents(response.data);

      } catch (error) {
        console.error("Failed to fetch event:", error);
        setError("Event not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [user, axiosSecure]);

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

  if (!events.length) {
    return (
      <div className=" max-w-[1536px] mx-auto px-4 my-20">
        <h2 className="font-semibold text-2xl text-center mb-4">
          You haven't Joined any event!
        </h2>
        <p className="text-center font-medium text-xl mb-6">Explore our upcoming events</p>

        <Link to='/events'className={`bg-primary max-w-sm mx-auto rounded-xl shadow-lg p-6 flex flex-col items-center justify-center gap-3 hover:scale-105 transform transition duration-300`}>
            <div className="p-4 bg-white rounded-full"><TiWorld className={"text-5xl text-primary"} /></div>
            <h3 className="text-white text-xl font-bold text-center">Upcoming Events</h3>
        </Link>

      </div>
    )
  }


  return (
    <div className='max-w-[1536px] mx-auto min-h-screen my-20 '>
      <h1 className=' text-3xl md:text-5xl text-center font-semibold mb-10'>Joined Events</h1>
      <div className=' max-w-[1536px] mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-6 '>
        {
          events.map(event => <JoinedCard key={event._id} event={event}></JoinedCard>)
        }
      </div>
    </div>
  );
};

export default JoinedEvents;