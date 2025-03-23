import React, { useState, useEffect, useMemo } from 'react';

const SearchInput: React.FC = () => {
  // List of locations to cycle through
  const locations = useMemo(() => ['Dubai', 'Paris', 'New York', 'Tokyo', 'Sydney'], []);
  const [currentLocation, setCurrentLocation] = useState(locations[0]);
  const [textIndex, setTextIndex] = useState(0); // To control typing animation

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex(0); // Reset typing effect
      const currentIndex = locations.indexOf(currentLocation);
      const nextIndex = (currentIndex + 1) % locations.length;
      setCurrentLocation(locations[nextIndex]);
    }, 3000); // Change location every 3 seconds

    return () => clearInterval(interval);
  }, [currentLocation,locations]);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (textIndex < currentLocation.length) {
        setTextIndex(textIndex + 1);
      }
    }, 150); // Adjust typing speed (150ms per letter)

    return () => clearInterval(typingInterval);
  }, [textIndex, currentLocation]);

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-1/2 md:w-1/3  rounded-lg">
        <input
          type="text"
          value={`Search For ${currentLocation.substring(0, textIndex)}`}
          readOnly
          className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-300 transition"
        />
        {/* Search Icon on the Left */}
        <div className="absolute top-0 left-0 mt-3 ml-4 text-gray-500">🔍</div>
      </div>
    </div>
  );
};

export default SearchInput;

