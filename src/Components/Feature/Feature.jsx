import React from 'react';
import FeatureCard from './FeatureCard';
import { ChartIcon, PlusIcon, SearchIcon } from './FeatureIconsSVG';





const Feature = () => {
  return (
    <section className="py-20 bg-base-100 ">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg max-w-2xl mx-auto text-base-content text-opacity-90">
            "Better Tomorrow" makes it easy to find, create, and track your
            impact in the community.
          </p>
        </div>
        
        {/* Responsive Grid for the cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <FeatureCard
            icon={<SearchIcon />}
            title="Discover Local Events"
            description="Find volunteer opportunities right in your neighborhood. Filter by category, date, and location to join events that matter to you."
          />
          
          <FeatureCard
            icon={<PlusIcon />}
            title="Lead Your Initiative"
            description="Have an idea for a clean-up drive or a donation camp? Post your own event in minutes and invite others to join your cause."
          />
          
          <FeatureCard
            icon={<ChartIcon />}
            title="Track Your Impact"
            description="See a complete history of all the events you've joined and organized. Watch your contribution to a better tomorrow grow over time."
          />
          
        </div>
      </div>
    </section>
  );
};

export default Feature;