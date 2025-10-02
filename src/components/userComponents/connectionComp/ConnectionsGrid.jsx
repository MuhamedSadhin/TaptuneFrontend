"use client";

import ConnectionCard from "./connectionCard";


export function ConnectionsGrid({ connections }) {
  return (
    <div className="flex flex-wrap gap-6 w-full">
      {connections.map((connection) => (
        <div
          key={connection._id}
          className="flex-1 min-w-[280px] max-w-full sm:max-w-[48%] lg:max-w-[32%]"
        >
          <ConnectionCard connection={connection} />
        </div>
      ))}
    </div>
  );
}
