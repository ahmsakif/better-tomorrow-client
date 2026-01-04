import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import image from '../../assets/newsletter.jpg';
import developer from '../../assets/developer.jpg'
import { 
  IoRocketOutline, 
  IoStatsChartOutline, 
  IoPeopleOutline, 
  IoShieldCheckmarkOutline 
} from "react-icons/io5";

const AboutPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleJoin = () => {
    if (user) {
      toast.success("You're already part of the family! Keep making an impact.");
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="min-h-screen bg-base-100 pt-28 pb-24 overflow-hidden">
      <div className="max-w-[1536px] mx-auto px-6 lg:px-12">
        
        {/* --- 1. Page Header --- */}
        <section className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block"
          >
            Our Mission
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-black mb-6"
          >
            Architecting a <span className="text-primary italic">Better Tomorrow.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="font-body text-lg text-base-content/60 leading-relaxed"
          >
            Better Tomorrow is more than just a platform; it is a movement dedicated to creating opportunities, empowering individuals, and measuring the impact of every social welfare activity.
          </motion.p>
        </section>

        {/* --- 2. Bento Grid: Vision & Identity --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-24">
          
          {/* Main Hero Image Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-8 h-[450px] rounded-[3rem] overflow-hidden shadow-2xl relative group"
          >
            <img src={image} alt="Community action" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10">
                <h3 className="text-white font-heading text-3xl font-black">United for Change</h3>
            </div>
          </motion.div>

          {/* Quick Stats/Mission Card */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-primary p-10 rounded-[3rem] text-primary-content flex flex-col justify-center relative overflow-hidden"
          >
            <IoRocketOutline className="text-8xl absolute -right-4 -bottom-4 opacity-10 rotate-12" />
            <h3 className="font-heading text-2xl font-black mb-4 uppercase tracking-tighter">The Vision</h3>
            <p className="font-body opacity-90 leading-relaxed text-lg">
              Our journey is focused on building a brighter, more inclusive tomorrow by connecting like-minded people to organized social service events.
            </p>
          </motion.div>

          {/* Value Card 1: Statistics Focus */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-4 bg-base-200 p-10 rounded-[3rem] border border-base-300 hover:border-primary/30 transition-colors"
          >
            <IoStatsChartOutline className="text-4xl text-primary mb-6" />
            <h3 className="font-heading text-xl font-bold mb-3">Data-Driven Impact</h3>
            <p className="font-body text-base-content/60 text-sm leading-relaxed">
              We apply logical principles to measure community growth. Every event is a data point toward a more efficient social welfare system.
            </p>
          </motion.div>

          {/* Value Card 2: Community Focus */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-4 bg-base-200 p-10 rounded-[3rem] border border-base-300 hover:border-primary/30 transition-colors"
          >
            <IoPeopleOutline className="text-4xl text-primary mb-6" />
            <h3 className="font-heading text-xl font-bold mb-3">Community Hub</h3>
            <p className="font-body text-base-content/60 text-sm leading-relaxed">
              We empower individuals by spreading awareness and providing a centralized platform for clean-up drives, tree plantations, and health initiatives.
            </p>
          </motion.div>

          {/* Value Card 3: Transparency */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4 bg-base-200 p-10 rounded-[3rem] border border-base-300 hover:border-primary/30 transition-colors"
          >
            <IoShieldCheckmarkOutline className="text-4xl text-primary mb-6" />
            <h3 className="font-heading text-xl font-bold mb-3">Trust & Integrity</h3>
            <p className="font-body text-base-content/60 text-sm leading-relaxed">
              Transparency is at the heart of our mission. We ensure that every event is verifiable and every contribution leads to tangible social difference.
            </p>
          </motion.div>
        </div>

        {/* --- 3. Developer Spotlight (Sakif Ahmed) --- */}
        <section className="bg-secondary rounded-[3rem] p-10 md:p-20 text-white mb-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[120px] -mr-40 -mt-40 rounded-full" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="avatar mb-8">
                        <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4 shadow-2xl">
                            <img src={developer} alt="Sakif Ahmed" />
                        </div>
                    </div>
                    <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4">Behind the Code</span>
                    <h2 className="font-heading text-4xl md:text-5xl font-black mb-6">Sakif Ahmed</h2>
                    <p className="font-body text-white/70 text-lg leading-relaxed max-w-lg mb-8">
                        I am currently pursuing a **BSc in Statistics at MC College, Sylhet**. 
                        My unique background allows me to build community platforms that are not only user-friendly but rooted in mathematical logic and data-driven results.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                        <a href="https://github.com/ahmsakif" target="_blank" className="btn btn-primary rounded-full px-8">GitHub Profile</a>
                        <button onClick={() => navigate('/events')} className="btn btn-outline text-white hover:bg-white hover:text-secondary rounded-full px-8">Our Projects</button>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-10 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 text-center">
                        <h4 className="text-4xl font-black text-primary mb-1 tracking-tighter">MC College</h4>
                        <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">Educational Base</p>
                    </div>
                    <div className="p-10 bg-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/10 text-center">
                        <h4 className="text-4xl font-black text-primary mb-1 tracking-tighter">Statistics</h4>
                        <p className="text-[10px] uppercase tracking-[0.2em] opacity-50">Logic & Analysis</p>
                    </div>
                    <div className="p-10 bg-white/10 backdrop-blur-lg rounded-[2.5rem] border border-white/20 text-center col-span-1 sm:col-span-2">
                        <p className="text-lg font-body italic opacity-80">"Using data to drive social change, one event at a time."</p>
                    </div>
                </div>
            </div>
        </section>

        {/* --- 4. Final CTA --- */}
        <section className="text-center py-12">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="font-heading text-3xl font-bold mb-10 text-base-content/40"
          >
            Will you be part of the story?
          </motion.h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleJoin} 
            className="btn btn-secondary btn-xl rounded-full px-16 h-20 shadow-2xl shadow-secondary/30 font-black tracking-[0.2em] uppercase text-lg"
          > 
            Join Us Now
          </motion.button>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;