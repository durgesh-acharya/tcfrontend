import React, { useState, useEffect } from 'react';
import Image from 'next/image';
interface ChooseDurationProps {
  items: { id: number; duration: string; imageurl : string ; startsfrom : string }[];
  onSelectionChange: (id: number) => void;
}

const ChooseDuration: React.FC<ChooseDurationProps> = ({ items, onSelectionChange }) => {
  // Set default selectedId to the first item's id (if available)
  const [selectedId, setSelectedId] = useState<number | null>(items.length > 0 ? items[0].id : null);

  useEffect(() => {
    if (selectedId !== null) {
      onSelectionChange(selectedId);
    }
  }, [selectedId, onSelectionChange]);

  const handleSelection = (id: number) => {
    setSelectedId(id);
    onSelectionChange(id);
  };

  return (
    // <div className="flex flex-wrap space-x-4 p-2 m-2">
    //   {items.map((item) => (
    //     <div
    //       key={item.id}
    //       onClick={() => handleSelection(item.id)}
    //       className={`px-4 py-2 rounded-full text-sm cursor-pointer transition-all ${
    //         selectedId === item.id ? 'bg-yellow-400' : 'bg-gray-300'
    //       }`}
    //     >
    //       {item.duration}
    //     </div>
    //   ))}
    // </div>
    <>
     <h6 className="m-2 pb-2 font-semibold text-md">Choose Trip Duration</h6>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
      {items.map((items, index) => (
        <div key={index} onClick={() => handleSelection(items.id)} className="relative overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="relative">
            <Image
              src={`http://103.168.18.92${items.imageurl}`}
              alt={"images"}
              width={250}  // Replace with actual width
              height={150}  // Replace with actual height
              className="w-full h-auto object-cover rounded-t-lg"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 w-full p-2">
              <p className="text-white font-bold">{items.duration}</p>
            </div>
          </div>
          <div className={`p-4 cursor-pointer transition-all ${
           selectedId === items.id ? 'bg-yellow-400 shadow-3xl transform scale-105' : 'bg-white'
          }`}>
            <p className="text-md font-semibold text-gray-800 text-center">Starting from</p>
            <p className="text-md font-bold text-green-600 text-center">{items.startsfrom}</p>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default ChooseDuration;
