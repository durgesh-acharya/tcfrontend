"use client";
import { useState } from "react";
import React from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import { FaMapMarkerAlt } from 'react-icons/fa';

interface TransfersProps {
    transferData: { day: number; title: string; transfertype : string, transferdetail : string, from : string, to: string }[];
  }

 
const Transfers: React.FC<TransfersProps> = ({ transferData }) => {

    const [expanded, setExpanded] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
      setExpanded(expanded === index ? null : index);
    };
    
    return (
        <>
        <div className="w-full">

      {/* Itinerary List */}
      <div className="mt-6 space-y-4 px-4">
        {transferData.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            {/* Header Row */}
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleExpand(index)}>
              <div className="px-3 py-1 bg-navbarcolor text-white text-sm font-medium rounded-full">Day {item.day}</div>
              <div className="text-gray-900 text-md font-bold">{item.title}</div>
              <button className="p-2 rounded-full bg-black-300">
                {expanded === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {/* Expanded Content */}
            {expanded === index && (
                <>
                {/* divider */}
                <hr className="my-4 border-gray-300 mx-4" />
                <h6 className="mx-4 text-sm text-navbarcolor text-semibold">{item.transfertype} Transfer</h6>
                <h6 className="mx-4 text-lg text-navbarcolor text-sbold py-2">{item.transferdetail}</h6>
                {/* divider */}
                <hr className="my-4 border-gray-300 mx-4" />
                <div className="flex items-center space-x-8">
      {/* Icons and Dotted Line */}
      <div className="flex flex-col items-center space-y-8 my-8 mx-4">
        <FaMapMarkerAlt size={24} />
        <div className="border-l-2 border-dotted border-navbarcolor h-20" />
        <FaMapMarkerAlt size={24}  />
      </div>

      {/* Location Information */}
      <div className="flex flex-col space-y-4">
        <div>
          <label htmlFor="fromLocation" className="block text-sm font-medium text-gray-700">
            From
          </label>
          <input
            id="fromLocation"
            type="text"
            value={item.from}
            disabled
            className="mt-1 block w-64 px-4 py-2 border border-gray-300 rounded-md text-gray-600 bg-gray-100"
          />
        </div>

        <div>
          <label htmlFor="toLocation" className="block text-sm font-medium text-gray-700">
            To
          </label>
          <input
            id="toLocation"
            type="text"
            value={item.to}
            disabled
            className="mt-1 block w-64 px-4 py-2 border border-gray-300 rounded-md text-gray-600 bg-gray-100"
          />
        </div>
      </div>
    </div>
                </>
            )}
          </div>
        ))}
      </div>
    </div>
        </>   
    );
};

export default Transfers;
