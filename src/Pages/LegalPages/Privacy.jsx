import React from 'react';
import { motion } from 'framer-motion';
import { IoShieldCheckmarkOutline, IoLockClosedOutline, IoEyeOutline } from "react-icons/io5";

const Privacy = () => {
    return (
        <div className="max-w-[1536px] mx-auto min-h-screen pb-24 px-6">
            <section className="pt-20 pb-16 text-center max-w-3xl mx-auto">
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-4 block"
                >
                    Trust & Safety
                </motion.span>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Privacy <span className="text-primary">Protocol</span></h1>
                <p className="font-body text-base-content/50 text-lg leading-relaxed">
                    How we manage and protect your node data within the Better Tomorrow network.
                </p>
            </section>

            <div className="max-w-4xl mx-auto space-y-12">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="bg-base-100 border border-base-200 rounded-[3rem] p-10 md:p-16 shadow-sm"
                >
                    <div className="prose prose-lg max-w-none prose-headings:font-black prose-p:text-base-content/70">
                        <h2 className="flex items-center gap-4"><IoLockClosedOutline className="text-primary"/> Data Collection</h2>
                        <p>We collect essential node identity data including your name, email, and social profile links to facilitate community deployments and verify volunteer actions.</p>
                        
                        <h2 className="flex items-center gap-4"><IoEyeOutline className="text-primary"/> Usage Visibility</h2>
                        <p>Publicly published impact reports and community stories display the Author Node's display name to ensure transparency and credit within the Knowledge Base.</p>
                        
                        <h2 className="flex items-center gap-4"><IoShieldCheckmarkOutline className="text-primary"/> Security Measures</h2>
                        <p>All sensitive manuscript transmissions are encrypted via JWT protocols to prevent unauthorized node access.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;