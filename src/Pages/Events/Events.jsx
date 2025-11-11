import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import EventCard from '../../Components/EventCard/EventCard';

const Events = () => {

    const axiosInstance = useAxios()
    const [events, setEvents] = useState([])
    
    useEffect(()=>{
        axiosInstance.get('/events/upcoming')
        .then((data)=>{
            setEvents(data.data)
        })
    },[axiosInstance])
    console.log(events);

    return (
        <div className=' max-w-[1536px] mx-auto '>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-20 px-4 '>
                {
                    !events
                    ? <p>No Events Available</p>
                    : events.map((event)=><EventCard key={event._id} event={event} ></EventCard>)
                }
            </div>
        </div>
    );
};

export default Events;