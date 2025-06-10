import React from 'react';

interface ItineraryItem {
  location: string;
  nights: number;
}

interface ItineraryHighlights {
  itinerary: ItineraryItem[];
}

const ItineraryHighlights: React.FC<ItineraryHighlights> = ({ itinerary }) => {
  return (
    <div className="flex space-x-4 my-4 mx-2">
      {itinerary.map((item, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <span className="text-md font-semibold">{item.location}</span>
            <span className="text-gray-500 text-sm">{item.nights} {item.nights > 1 ? 'nights' : 'night'}</span>
          </div>

          {/* Vertical Divider */}
          {index < itinerary.length - 1 && (
            <div className="h-12 border-l border-gray-300 mx-4"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ItineraryHighlights;
