import React from "react";

const TripHighlights: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h6 className="m-2 pb-2 font-semibold text-md">Trip Highlights</h6>
      <ul className="list-disc pl-5 space-y-2">
        <li className="text-justify">
          Experience breathtaking views as you hike through the lush green forests. The trails offer a perfect mix of nature, wildlife, and scenic vistas.
        </li>
        <li className="text-justify">
          Enjoy the unique cultural experiences of the local villages, where you can interact with friendly residents and discover their traditions and heritage.
        </li>
        <li className="text-justify">
          Explore ancient landmarks and historical sites that date back centuries, offering a glimpse into the rich history of the region.
        </li>
        <li className="text-justify">
          Indulge in delicious local cuisine, from street food to high-end dining, showcasing the diverse flavors of the area.
        </li>
        <li className="text-justify">
          Unwind and relax at beautiful beaches with crystal-clear waters, perfect for swimming, sunbathing, or simply taking in the tranquil surroundings.
        </li>
      </ul>
    </div>
  );
};

export default TripHighlights;
