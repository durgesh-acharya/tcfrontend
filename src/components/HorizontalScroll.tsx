import React, { useRef } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Image from 'next/image'; // 

interface LocationData {
  locations_id : number,
  locations_name : string,
  locations_url : string,
  locations_isactive: number
}

interface HorizontalScrollProps {
  locations: LocationData[];
   onLocationClick: (id: number) => void;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({ locations, onLocationClick }) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);

    const scroll = (direction: 'left' | 'right') => {
      if (scrollRef.current) {
        const scrollAmount = 300; // Adjust scroll amount here
        if (direction === 'left') {
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    };

    //handle location click

    const handleLocationClick = (id: number) => {
      // Call the parent's callback function when a location is clicked
      onLocationClick(id);
    };

  return (
    <div className="relative w-full sticky top-0 bg-white z-20">
    {/* Left Arrow */}
    <button
        onClick={() => scroll('left')}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-2 mx-2 rounded-full z-10"
      >
        <AiOutlineLeft size={12} />
      </button>

    {/* Horizontal Scroll Container */}
    <div
      ref={scrollRef}
      className="flex overflow-x-hidden space-x-4 px-4 py-2" // Use overflow-x-hidden instead of overflow-x-auto
    >
      {locations.map((location, index) => (
        <div
          key={index}
          className="flex-shrink-0 w-36 h-36 rounded-xl overflow-hidden cursor-pointer"
          onClick={() => handleLocationClick(location.locations_id)}
        >
          {/* Use Next.js Image component */}
          <Image
            src={`http://103.168.18.92${location.locations_url}`}
            alt={location.locations_name}
            className="w-full h-3/4 object-cover rounded-xl"
            width={144}  // Width based on your layout
            height={108} // Height based on your layout
          />
          <p className="text-center mt-1 text-sm text-bold text-black">{location.locations_name}</p>
        </div>
      ))}
    </div>

    {/* Right Arrow */}
    <button
      onClick={() => scroll('right')}
      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
    >
      <AiOutlineRight size={12} />
    </button>
  </div>
  );
};

export default HorizontalScroll;
