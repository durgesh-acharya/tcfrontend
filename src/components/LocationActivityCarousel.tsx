import { useState, useRef, useEffect } from 'react';
import Image from 'next/image'; // Importing Next.js Image component
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

interface Activity {
  activity_id: number;
  activity_name: string;
  imageurl: string;
  duration: string;
  actual_price: string;
  offer_price: string;
  rating: number;
}

interface Location {
  location_id: number;
  location_name: string;
  activities: Activity[];
}

const LocationActivityCarousel: React.FC<{ location: Location }> = ({ location }) => {
  // Initialize all hooks unconditionally
  const [scrollIndex, setScrollIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number>(1024); // Set default width
  const [isClient, setIsClient] = useState(false); // Track if it's the client-side
  const carouselRef = useRef<HTMLDivElement>(null); // Reference to the scrollable container

  // Set up a client-side only check, this effect will only run on the client
  useEffect(() => {
    setIsClient(true); // After the component mounts, we know it's the client side
    setWindowWidth(window.innerWidth); // Set the initial width
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Update window width on resize
    };

    // Add resize event listener only on the client side
    if (isClient) {
      window.addEventListener('resize', handleResize);
    }

    // Clean up the event listener
    return () => {
      if (isClient) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [isClient]); // This effect will only run on client side

  const scrollToPosition = (targetPosition: number) => {
    const scrollContainer = carouselRef.current;
    if (!scrollContainer) return;

    const currentPosition = scrollContainer.scrollLeft;
    const distance = targetPosition - currentPosition;
    let start: number;

    const scrollAnimation = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const scrollStep = distance * (progress / 500); // Change 500 for smoother/slower scroll

      if (progress < 500) {
        scrollContainer.scrollLeft = currentPosition + scrollStep;
        requestAnimationFrame(scrollAnimation);
      } else {
        scrollContainer.scrollLeft = targetPosition; // Final position
      }
    };

    requestAnimationFrame(scrollAnimation);
  };

  const handleScroll = (direction: 'left' | 'right') => {
    const maxIndex = location.activities.length - 3; // 3 packages visible at a time (this will change based on screen size)
    let newIndex = scrollIndex;

    if (direction === 'right' && scrollIndex < maxIndex) {
      newIndex = scrollIndex + 1;
    } else if (direction === 'left' && scrollIndex > 0) {
      newIndex = scrollIndex - 1;
    }

    setScrollIndex(newIndex);

    // Calculate the scroll position for the new index
    const targetPosition = newIndex * (carouselRef.current?.offsetWidth ?? 0) / (windowWidth <= 640 ? 1 : 3); // Adjust for responsiveness
    scrollToPosition(targetPosition);
  };

  // Conditionally render the component based on whether it's the client-side
  if (!isClient) {
    return null; // Prevent rendering during SSR (Server-Side Rendering)
  }

  return (
    <div className="container mx-auto my-6">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-xl font-semibold">{location.location_name}</h2>
        <div className='flex items-center justify-center text-sm font-bold'>
          <span>View All</span>
        </div>
      </div>

      <div className="relative overflow-hidden"> {/* Add overflow-hidden here */}
        <div
          ref={carouselRef} // Reference to the scrollable container
          className="flex space-x-4 px-4"
        >
          {location.activities.slice(scrollIndex, scrollIndex + (windowWidth <= 640 ? 1 : 3)).map((act) => (
            <div key={act.activity_id} className="flex-none w-full sm:w-1/3 bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Wrapper for the image with rounded corners */}
              <div className="w-full h-56 relative overflow-hidden rounded-t-lg">
                <Image
                  src={act.imageurl}  // Image source URL
                  alt={act.activity_name}  // Alt text
                  layout="fill"  // Make the image fill the parent container
                  objectFit="cover"  // Ensure the image covers the area without distortion
                  className="rounded-t-lg"  // Rounded corners on the image only
                />
              </div>
              <div className="px-4 py-2">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Duration: {act.duration}</span>
                  <span>Rating: {act.rating}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold">{act.activity_name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm line-through text-gray-500">INR {act.actual_price}</span>
                  <span className="text-xl font-bold text-green-600">INR {act.offer_price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2">
          <button
            onClick={() => handleScroll('left')}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-2 mx-2 rounded-full z-10"
          >
            <AiOutlineLeft size={12} />
          </button>
        </div>

        {/* Right Arrow */}
        <div className="absolute top-1/2 right-0 transform -translate-y-1/2">
          <button
            onClick={() => handleScroll('right')}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full z-10"
          >
            <AiOutlineRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationActivityCarousel;
