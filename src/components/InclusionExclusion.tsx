import React from 'react';

interface TravelPackageProps {
  inclusions: string[];
  exclusions: string[];
}

const InclusionExclusion: React.FC<TravelPackageProps> = ({ inclusions, exclusions }) => {
  return (
    <>
    <div className='border rounded-lg shadow-md bg-white mt-2'>
    <h6 className='m-6 text-2xl'>What is inside the package ?</h6>
    <div className="flex flex-col lg:flex-row gap-8 m-6">
    
      {/* Inclusions Section */}
      <div className="flex-1 p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Inclusions</h2>
        <ul className="list-disc pl-6 space-y-2">
          {inclusions.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>

      {/* Vertical Divider */}
      <div className="lg:w-px lg:bg-gray-300 hidden lg:block"></div>

      {/* Exclusions Section */}
      <div className="flex-1 p-6 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-semibold text-red-600 mb-4">Exclusions</h2>
        <ul className="list-disc pl-6 space-y-2">
          {exclusions.map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    </>
  );
};

export default InclusionExclusion;
