import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: "Ariful Islam",
            role: "Volunteer",
            text: "Joining the river cleanup event through Better Tomorrow was life-changing. I met so many like-minded people who actually care about Sylhet's environment.",
            img: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 2,
            name: "Nusrat Jahan",
            role: "Event Organizer",
            text: "This platform made it incredibly easy to gather 50 volunteers for our tree plantation drive in just two days. The impact tracking feature is a game-changer!",
            img: "https://randomuser.me/api/portraits/women/44.jpg",
            featured: true
        },
        {
            id: 3,
            name: "Tanvir Ahmed",
            role: "Community Member",
            text: "I love how transparent the platform is. Being able to see the gallery and impact stats before joining an event gives me total confidence to participate.",
            img: "https://randomuser.me/api/portraits/men/46.jpg"
        }
    ];

    return (
        <section className="py-24 bg-base-200/50">
            <div className="max-w-[1536px] mx-auto px-6 lg:px-12">

                <div className="mb-16">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block"
                    >
                        Success Stories
                    </motion.span>
                    <h2 className="font-heading text-4xl md:text-5xl font-black">
                        Voices of <span className="text-primary">Change</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`p-10 rounded-[2.5rem] transition-all duration-300 ${item.featured
                                    ? 'bg-primary text-primary-content shadow-2xl shadow-primary/20 scale-105 z-10'
                                    : 'bg-base-100 border border-base-200 text-base-content hover:shadow-xl'
                                }`}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <img src={item.img} alt={item.name} className="w-14 h-14 rounded-full border-2 border-primary/20" />
                                <div>
                                    <h4 className="font-bold text-lg">{item.name}</h4>
                                    <p className={`text-sm ${item.featured ? 'text-primary-content/70' : 'text-base-content/50'}`}>
                                        {item.role}
                                    </p>
                                </div>
                            </div>
                            <p className={`font-body leading-relaxed italic ${item.featured ? 'text-primary-content/90' : 'text-base-content/70'}`}>
                                "{item.text}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;