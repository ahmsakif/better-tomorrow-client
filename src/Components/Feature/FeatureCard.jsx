import React from 'react';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="card bg-base-200 rounded shadow-lg  border-base-300">
      <div className="card-body items-center text-center p-8">
        {/* The Icon */}
        <div className="text-primary mb-4">
          {React.cloneElement(icon, { className: "w-16 h-16" })}
        </div>
        {/* The Title */}
        <h2 className="card-title text-2xl font-bold">
          {title}
        </h2>
        {/* The Description */}
        <p className="text-base-content text-opacity-80">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;