import React from 'react';
import { motion } from 'framer-motion';

const FAQ = () => {
  const faqs = [
    {
      q: "How can I join a volunteer event?",
      a: "Simply browse our 'Explore Events' page, find an initiative that resonates with you, and click 'Join'. You'll receive all the details via email."
    },
    {
      q: "Can I lead my own social service event?",
      a: "Yes! If you have an idea for a cleanup or donation drive, use the 'Lead Initiative' button to post your event. Our community will help you make it happen."
    },
    {
      q: "Is there any cost involved in participating?",
      a: "Better Tomorrow is a community-driven platform. Joining events is completely free. Some organizers may ask for specific donations (like old clothes or saplings), but the platform itself is free."
    }
  ];

  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-[1536px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: Title (Consistent Left-Alignment) */}
          <div className="lg:col-span-4">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-3 block"
            >
              Support Center
            </motion.span>
            <h2 className="font-heading text-4xl md:text-5xl font-black mb-6">
              Common <span className="text-primary">Questions</span>
            </h2>
            <p className="font-body text-base-content/60 leading-relaxed">
              Everything you need to know about joining our movement and making a difference in your community.
            </p>
          </div>

          {/* Right Column: Accordion-style FAQs */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="collapse collapse-plus bg-base-200/50 rounded-[2rem] border border-base-200">
                <input type="radio" name="my-accordion-3" defaultChecked={idx === 0} /> 
                <div className="collapse-title text-xl font-bold font-heading py-6 px-8">
                  {faq.q}
                </div>
                <div className="collapse-content px-8 pb-6 text-base-content/70 font-body leading-relaxed"> 
                  <p>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;