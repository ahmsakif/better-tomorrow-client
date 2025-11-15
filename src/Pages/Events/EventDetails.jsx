import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { format } from "date-fns";
import useAxios from '../../Hooks/useAxios';
import Swal from 'sweetalert2';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useAxiosSecure';



const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const { user } = useAuth()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate()
  const location = useLocation()
  const axiosInstance = useAxios();
  const [joining, setJoining] = useState(false)
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(`/events/${id}`);
        setEvent(response.data);

      } catch (error) {
        console.error("Failed to fetch event:", error);
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
        title: "Oops You haven't logged in",
        text: "You need to log in your account to join this event",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Login"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } })
        }
      });

      return
    }

    const joinEventData = {
      userEmail: user.email,
      eventId: event._id
    }

    try {
      setJoining(true)
      const response = await axiosSecure.post('/joined', joinEventData);
      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Thanks for joining! We're excited to have you in the event. 🎉",
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        Swal.fire({
          icon: "success",
          title: "An unknown error occurred",
          showConfirmButton: false,
          timer: 1500,
        })
      }
    } catch (error) {
      console.error("Failed to Join event:", error);
      console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response?.data?.message,
        showConfirmButton: false,
        timer: 1500,
      })
    } finally {
      setJoining(false)
    }
  }

  if (loading) {
    return <div className="text-center my-20"><span className="loading loading-lg"></span></div>
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

  if (!event) {
    return <div className="text-center my-20"><h2>Event not found.</h2></div>;
  }

  const formattedDate = format(new Date(event.eventDate), "EEEE, dd MMMM, yyyy");
  const formattedTime = format(new Date(event.eventDate), "hh:mm a");

  return (
    <div className="container mx-auto p-4 max-w-4xl my-12">
      <div className="bg-base-100 shadow-xl overflow-hidden">

        <img
          src={event.thumbnailUrl}
          alt={event.title}
          className="w-full h-[400px] object-cover rounded-none"
        />

        <div className="p-8">
          <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

          <div className="badge badge-primary badge-lg rounded-none mb-4">{event.eventType}</div>

          <p className="text-xl mb-6">{event.location}</p>

          <p className="text-base-content text-opacity-80 mb-8">
            {event.description}
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-base-200 p-6 rounded-none mb-8">
            <div>
              <h3 className="text-xl font-semibold">Event Date & Time</h3>
              <p className="text-lg">{formattedDate}</p>
              <p className="text-lg">Starts at {formattedTime}</p>
            </div>

            <div className="flex items-center mt-4 sm:mt-0">
              <div className="avatar mr-4">
                <div className="w-12 rounded-full">
                  <img src={event.creatorPhotoURL} alt={event.creatorName} />
                </div>
              </div>
              <div>
                <p className="text-sm">Organized by</p>
                <p className="font-semibold">{event.creatorName}</p>
              </div>
            </div>
          </div>

          <button disabled={joining} onClick={handleJoinEvent} className="btn btn-primary btn-lg btn-block rounded-none">
            Join This Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;