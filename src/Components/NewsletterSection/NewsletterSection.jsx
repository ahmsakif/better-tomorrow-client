import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useAxios from '../../Hooks/useAxios';

const ArrowIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
  </svg>
);

const NewsletterSection = () => {
  const axiosPublic = useAxios();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const toastId = toast.loading("Connecting to node network...");

    try {
      // POST the email to the subscribers collection
      const response = await axiosPublic.post('/subscribers', { email });
      
      if (response.data.insertedId) {
        toast.success(`Success! ${email} joined the movement.`, { id: toastId });
        e.target.reset();
      }
    } catch (error) {
      // Handle duplicates (409) or server errors (500)
      const message = error.response?.data?.message || "Sync failure. Please try again.";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-[1536px] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative overflow-hidden bg-secondary rounded-[3rem] p-8 md:p-20 text-center"
        >
          {/* Ambient Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 blur-[100px] -ml-32 -mb-32 rounded-full"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block"
            >
              The Tomorrow Digest
            </motion.span>

            <h2 className="font-heading text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Stay ahead of the <br /> 
              <span className="text-primary italic">positive change.</span>
            </h2>

            <p className="font-body text-lg text-white/70 max-w-xl mx-auto mb-10 leading-relaxed">
              Join 5,000+ change-makers. Get exclusive insights into community impact delivered to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl sm:rounded-full overflow-hidden">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  // Fixed: Added border-none and focus properties to prevent the white box glitch
                  className="bg-transparent text-white placeholder:text-white/40 px-6 py-4 flex-grow outline-none border-none focus:ring-0 focus:outline-none font-body w-full"
                  required
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn btn-primary rounded-2xl sm:rounded-full px-8 py-4 h-auto border-none shadow-lg shadow-primary/20 font-heading font-bold flex items-center gap-2"
                >
                  Subscribe
                  <ArrowIcon />
                </motion.button>
              </div>
            </form>

            <p className="font-body text-[10px] text-white/40 mt-6 uppercase tracking-widest">
              No spam. Just impact. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;