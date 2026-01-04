import React from 'react';
import { motion } from 'framer-motion';
import { IoDocumentTextOutline, IoScaleOutline, IoCheckmarkDoneOutline } from "react-icons/io5";

const Terms = () => {
    return (
        <div className="max-w-[1536px] mx-auto min-h-screen pb-24 px-6">
            <section className="pt-20 pb-16 text-center max-w-3xl mx-auto">
                <motion.span 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-primary font-black tracking-[0.4em] uppercase text-xs mb-4 block"
                >
                    Governance
                </motion.span>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">Legal <span className="text-primary">Framework</span></h1>
                <p className="font-body text-base-content/50 text-lg leading-relaxed">
                    The standard operating procedures for all volunteers and organizers in our network.
                </p>
            </section>

            <div className="max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="bg-base-100 border border-base-200 rounded-[3rem] p-10 md:p-16 shadow-sm"
                >
                    <div className="prose prose-lg max-w-none prose-headings:font-black prose-p:text-base-content/70">
                        <h2 className="flex items-center gap-4"><IoDocumentTextOutline className="text-primary"/> Manuscript Ownership</h2>
                        <p>By publishing to the Knowledge Base, you grant Better Tomorrow the right to display your community impact stories across our node network.</p>
                        
                        <h2 className="flex items-center gap-4"><IoScaleOutline className="text-primary"/> Code of Conduct</h2>
                        <p>Volunteers must adhere to local regulations during physical deployments (e.g., Tree Plantations in Sylhet) and maintain professional integrity in all reports.</p>
                        
                        <h2 className="flex items-center gap-4"><IoCheckmarkDoneOutline className="text-primary"/> Liability</h2>
                        <p>Better Tomorrow acts as a community-driven event management platform and is not responsible for individual conduct during volunteer initiatives.</p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Terms;