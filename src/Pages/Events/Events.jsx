import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoSearchOutline, IoLocationOutline, IoFilterOutline, IoSwapVerticalOutline } from "react-icons/io5";
import useAxios from '../../Hooks/useAxios';
import EventCard from '../../Components/EventCard/EventCard';
import EventCardSkeleton from '../../Components/Loader/EventCardSkeleton';
import Pagination from '../../Utilities/Pagination';


const Events = () => {
    const axiosInstance = useAxios();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters & Pagination State
    const [category, setCategory] = useState("All");
    const [location, setLocation] = useState("");
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('eventDate');
    const [order, setOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setLoading(true);
        const params = {
            eventType: category,
            search,
            location,
            sortField: sort,
            sortOrder: order,
            page: currentPage,
            limit: 8 // Professional 4-per-row grid layout
        };

        axiosInstance.get('/all-events', { params })
            .then((res) => {
                setEvents(res.data.events);
                setTotalPages(res.data.totalPages);
                setLoading(false);
            });
    }, [category, search, location, sort, order, currentPage]);

    return (
        <div className='max-w-[1536px] mx-auto min-h-screen pb-24'>
            {/* Header Section */}
            <section className="pt-20 pb-16 bg-base-200/50 rounded-b-[4rem] mb-12 px-6 border-b border-base-300 shadow-inner">
                <div className="text-center max-w-3xl mx-auto">
                    <span className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-4 block">Central Directory</span>
                    <h1 className='text-5xl md:text-7xl font-black mb-6 tracking-tighter'>Explore <span className="text-primary">Initiatives</span></h1>
                    <p className="font-body text-base-content/50 text-lg leading-relaxed">Search through our unified node network to find community deployments near you.</p>
                </div>
            </section>

            {/* Advanced Toolbar (Criteria: 2+ Filters & Search) */}
            <div className="px-6 mb-16 max-w-6xl mx-auto">
                <div className="bg-base-100 border border-base-200 p-6 rounded-[2.5rem] shadow-2xl flex flex-col gap-6">
                    
                    {/* Top Row: Search */}
                    <div className="relative w-full">
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Find initiatives by title..." 
                            className="input input-lg w-full rounded-2xl bg-base-200/50 border-none pl-14 font-bold placeholder:opacity-30 focus:ring-2 ring-primary/20"
                        />
                        <IoSearchOutline className="absolute left-5 top-1/2 -translate-y-1/2 text-2xl opacity-30" />
                    </div>

                    {/* Bottom Row: Multi-Filters & Sort */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3 bg-base-200/30 px-4 py-2 rounded-2xl">
                            <IoFilterOutline className="text-primary" />
                            <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-transparent font-bold text-sm w-full outline-none">
                                <option value="All">All Categories</option>
                                <option value="Cleanup">Cleanup</option>
                                <option value="Plantation">Plantation</option>
                                <option value="Donation">Donation</option>
                                <option value="Education">Education</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3 bg-base-200/30 px-4 py-2 rounded-2xl">
                            <IoLocationOutline className="text-primary" />
                            <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Filter by Location" className="bg-transparent font-bold text-sm w-full outline-none placeholder:opacity-50" />
                        </div>

                        <div className="flex items-center gap-3 bg-base-200/30 px-4 py-2 rounded-2xl">
                            <IoSwapVerticalOutline className="text-primary" />
                            <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-transparent font-bold text-sm w-full outline-none">
                                <option value="eventDate">Sort by Date</option>
                                <option value="title">Sort by Title</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-3 bg-base-200/30 px-4 py-2 rounded-2xl">
                            <select value={order} onChange={(e) => setOrder(e.target.value)} className="bg-transparent font-bold text-sm w-full outline-none">
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Grid */}
            <div className='px-6 lg:px-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 min-h-[400px]'>
                    <AnimatePresence mode='popLayout'>
                        {loading ? (
                            [...Array(8)].map((_, i) => <EventCardSkeleton key={i} />)
                        ) : events.length === 0 ? (
                            <motion.div className='col-span-full py-32 text-center' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <div className="text-8xl mb-6 opacity-20">📡</div>
                                <h2 className='text-3xl font-black tracking-tight mb-2'>Zero Results Found</h2>
                                <p className='text-base-content/40 font-bold uppercase text-xs tracking-widest'>Adjust your deployment parameters and scan again.</p>
                            </motion.div>
                        ) : (
                            events.map((event, idx) => (
                                <motion.div
                                    key={event._id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                >
                                    <EventCard event={event} />
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>

                {/* Pagination Controls */}
                {!loading && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => setCurrentPage(p)} />}
            </div>
        </div>
    );
};

export default Events;