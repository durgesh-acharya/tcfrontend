"use client";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";


interface ItineraryProps {
  itineraryData: { day: number; title: string; details: string }[];  // Inline type definition for the prop
}

const Itinerary : React.FC<ItineraryProps> = ({ itineraryData }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="w-full">
      {/* Full-width image */}
      <div className="w-full h-64 relative">
        <Image
          src="/images/1.jpg" // Change this to your actual image path
          alt="Itinerary Header"
          layout="fill"
          objectFit="cover"
          className="rounded-b-lg"
        />
      </div>

      {/* Itinerary List */}
      <div className="mt-6 space-y-4 px-4">
        {itineraryData.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            {/* Header Row */}
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleExpand(index)}>
              <div className="px-3 py-1 bg-navbarcolor text-white text-sm font-medium rounded-full">Day {item.day}</div>
              <div className="text-gray-900 text-lg font-bold">{item.title}</div>
              <button className="p-2 rounded-full bg-black-300">
                {expanded === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {/* Expanded Content */}
            {expanded === index && (
              <div className="p-4 border-t border-gray-300 bg-white">
                <p className="text-gray-600">{item.details}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Itinerary;
