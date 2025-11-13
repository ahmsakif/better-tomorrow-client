import React from "react";

const EventCardSkeleton = () => {
  return (
    <div className="card max-w-lg bg-base-100 shadow-xl rounded overflow-hidden animate-pulse">
      {/* Thumbnail placeholder */}
      <div className="h-80 bg-base-300 relative">
        <div className="badge badge-secondary absolute top-4 right-4 m-0 font-bold p-3 opacity-60">
          &nbsp;
        </div>
      </div>

      <div className="card-body p-6 flex flex-col gap-4">
        {/* Host info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-base-300"></div>
          <div className="flex flex-col gap-1">
            <div className="h-3 w-20 bg-base-300 rounded"></div>
            <div className="h-4 w-32 bg-base-300 rounded"></div>
          </div>
        </div>

        {/* Title */}
        <div className="h-6 w-3/4 bg-base-300 rounded"></div>

        {/* Location + Date */}
        <div className="flex flex-col gap-2 text-base-content/80 mb-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 bg-base-300 rounded"></div>
            <div className="h-4 w-40 bg-base-300 rounded"></div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-base-300 rounded"></div>
              <div className="h-4 w-28 bg-base-300 rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 bg-base-300 rounded"></div>
              <div className="h-4 w-16 bg-base-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-base-300 rounded"></div>
          <div className="h-3 w-5/6 bg-base-300 rounded"></div>
        </div>
      </div>

      {/* Button */}
      <div className="h-14 bg-base-300 w-full rounded-none"></div>
    </div>
  );
};

export default EventCardSkeleton;
