import React, { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import EventCard from '../../Components/EventCard/EventCard';
import { CiSearch } from "react-icons/ci";
import EventCardSkeleton from '../../Components/Loader/EventCardSkeleton';

const Events = () => {

    const axiosInstance = useAxios()
    const [events, setEvents] = useState([])
    const [filter, setFilter] = useState("All")
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        setError(null)

        const params = {}
        if (filter && filter !== "All") params.eventType = filter
        if (search) params.search = search

        axiosInstance.get('/events/upcoming', { params })
            .then((data) => {
                setEvents(data.data)
                setLoading(false)
            })
    }, [axiosInstance, filter, search])

    const handleSearchChange = (e) => setSearch(e.target.value)
    const handleFilterChange = (e) => setFilter(e.target.value)

    return (
        <div className=' max-w-[1536px] mx-auto mt-20 px-4'>
            <title>Upcoming Events</title>
            <h1 className=' text-3xl md:text-5xl text-center font-semibold mb-10'>Upcoming Events</h1>
            <div className="md:flex justify-between mx-auto">
                <div>
                    <select
                        value={filter}
                        onChange={handleFilterChange}
                        className="select w-80"
                    >
                        <option value="All">All Event Types</option>
                        <option value="Cleanup">Cleanup</option>
                        <option value="Plantation">Plantation</option>
                        <option value="Donation">Donation</option>
                        <option value="Education">Education</option>
                        <option value="Blood Donation">Blood Donation</option>
                        <option value="Food Distribution">Food Distribution</option>
                    </select>
                </div>
                <div>
                    <label className="input w-80">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            onChange={handleSearchChange}
                            type="search"
                            required
                            value={search}
                            placeholder="Search Events" />
                    </label>

                </div>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-20'>
                {
                    loading? (
                                <>
                                <EventCardSkeleton key={1} />
                                <EventCardSkeleton key={2} />
                                <EventCardSkeleton key={3} />
                                <EventCardSkeleton key={4} />
                                <EventCardSkeleton key={5} />
                                <EventCardSkeleton key={6} />
                                </>
                            )
                        :!events
                            ? <p>No Events Available</p>
                            : events.map((event) => <EventCard key={event._id} event={event} ></EventCard>)
                }
            </div>
        </div>
    );
};

export default Events;