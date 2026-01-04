import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';
import { 
  IoRocketOutline, 
  IoPeopleOutline, 
  IoStatsChartOutline, 
  IoCalendarOutline,
  IoPulseOutline 
} from "react-icons/io5";

const ImpactOverview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({ joinedCount: 0, createdCount: 0, impactScore: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/user-stats?email=${user.email}`)
                .then(res => {
                    setStats(res.data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user, axiosSecure]);

    if (loading) return <div className="h-64 flex items-center justify-center"><span className="loading loading-bars text-primary"></span></div>;

    return (
        <section className="space-y-8">
            {/* --- System Header --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-4xl font-black font-heading tracking-tight">
                        Impact <span className="text-primary">Console</span>
                    </h2>
                    <p className="text-base-content/40 font-body text-sm mt-1 uppercase tracking-widest">
                        Real-time activity monitoring
                    </p>
                </div>
                
                <div className="flex gap-3">
                    <div className="bg-base-100 border border-base-200 px-5 py-2 rounded-2xl flex items-center gap-3 shadow-sm">
                        <IoPulseOutline className="text-primary animate-pulse text-xl" />
                        <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Engine Active</span>
                    </div>
                </div>
            </div>

            {/* --- Data Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                
                {/* Primary Score Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="md:col-span-2 bg-secondary p-10 rounded-[2.5rem] text-white relative overflow-hidden group shadow-xl shadow-secondary/10"
                >
                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50 mb-2">Total Contribution Score</p>
                            <h3 className="text-8xl font-black font-heading tracking-tighter">{stats.impactScore}</h3>
                        </div>
                        <div className="mt-8 flex gap-2">
                             <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">Global Ranking</span>
                             <span className="px-3 py-1 bg-primary rounded-full text-[10px] font-bold uppercase tracking-widest">Top Tier</span>
                        </div>
                    </div>
                    <IoRocketOutline className="text-[15rem] absolute -right-12 -bottom-12 opacity-10 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110" />
                </motion.div>

                {/* Vertical Joined Counter */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-primary p-10 rounded-[2.5rem] text-white flex flex-col justify-between shadow-xl shadow-primary/10"
                >
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                        <IoPeopleOutline />
                    </div>
                    <div>
                        <h3 className="text-6xl font-black mb-1">{stats.joinedCount}</h3>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-50">Initiatives Joined</p>
                    </div>
                </motion.div>

                {/* Vertical Created Counter */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-base-100 border border-base-200 p-10 rounded-[2.5rem] flex flex-col justify-between shadow-sm"
                >
                    <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary text-3xl font-bold">
                        <IoCalendarOutline />
                    </div>
                    <div>
                        <h3 className="text-6xl font-black mb-1 text-base-content">{stats.createdCount}</h3>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-30">Hosted Events</p>
                    </div>
                </motion.div>

                {/* Full-width Insights Panel */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-4 bg-base-100 border border-base-200 p-12 rounded-[3rem] group"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-xl text-primary text-2xl">
                                <IoStatsChartOutline />
                            </div>
                            <h4 className="font-heading font-black text-xl uppercase tracking-tighter">Engagement Analytics</h4>
                        </div>
                        <div className="h-px flex-grow mx-8 bg-base-200 hidden md:block" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-base-content/30 italic">Module: Analysis-01</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="space-y-2">
                            <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">Status</p>
                            <p className="font-bold text-sm">Active Participation</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[10px] uppercase font-bold tracking-widest opacity-40">Level</p>
                            <p className="font-bold text-sm">Community Leader</p>
                        </div>
                        <div className="lg:col-span-2 bg-base-200/50 p-6 rounded-2xl border border-dashed border-base-300">
                             <p className="text-xs text-base-content/40 italic">
                                "Advanced data visualization modules will populate this section as more community events are processed through the engine."
                             </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ImpactOverview;