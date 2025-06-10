import { useState } from 'react';

interface KnowBeforeYouGoProps {
  clauses: string[]; // Define the prop to receive a list of clauses
}

const KnowBeforeYouGo: React.FC<KnowBeforeYouGoProps> = ({ clauses }) => {
  // State to manage the container expanded/collapsed
  const [isExpanded, setIsExpanded] = useState(false);

  // Function to toggle expanded state
  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Container with title and down/up arrow */}
      <div
        className={`bg-white p-4 rounded-lg shadow-md transition-all duration-300 ${
          isExpanded ? 'h-auto' : 'h-20'
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-800">
            Know Before You Go
          </h3>
          <button onClick={toggleExpand} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 transform transition-transform ${
                isExpanded ? 'rotate-180' : 'rotate-0'
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* List of clauses that appear when expanded */}
        <div className={`mt-4 transition-all ${isExpanded ? 'block' : 'hidden'}`}>
          <ul className="list-disc pl-5 space-y-2">
            {clauses.map((clause, index) => (
              <li key={index}>{clause}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default KnowBeforeYouGo;

