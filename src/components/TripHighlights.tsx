import React from "react";

type TripHighlightsProps = {
  highlights: string[];
};

const TripHighlights: React.FC<TripHighlightsProps> = ({ highlights }) => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h6 className="m-2 pb-2 font-semibold text-md">Trip Highlights</h6>
      <ul className="list-disc pl-5 space-y-2">
        {highlights.length > 0 ? (
          highlights.map((highlight, index) => (
            <li key={index} className="text-justify">
              {highlight}
            </li>
          ))
        ) : (
          <li>No trip highlights available.</li>
        )}
      </ul>
    </div>
  );
};

export default TripHighlights;
