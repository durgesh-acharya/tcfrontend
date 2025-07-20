"use client";
import { useState } from "react";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image"; // add this impor

interface Stay {
  id: number;
  day: number;
  title: string;
  stayat: string;
  checkintime: string;
  checkouttime: string;
  nights: number;
  breakfast: number;
  lunch: number;
  dinner: number;
  image1?: string;
  image2?: string;
}

interface HotelStayProps {
  stayData: Stay[];
}

const HotelStay: React.FC<HotelStayProps> = ({ stayData }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const renderMealInclusion = (meal: number) => {
    return meal === 1 ? (
      <div className="flex items-center text-green-500">
        <span className="mr-2">✔</span> Included
      </div>
    ) : (
      <div className="flex items-center text-red-500">
        <span className="mr-2">✘</span> Not Included
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="mt-6 space-y-4 px-4">
        {stayData.map((item, index) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md">
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 cursor-pointer"
              onClick={() => toggleExpand(index)}
            >
              <div className="px-3 py-1 bg-navbarcolor text-white text-sm font-medium rounded-full">
                Day {item.day}
              </div>
              <div className="text-gray-900 text-sm font-bold">{item.title}</div>
              <button className="p-2 rounded-full bg-black-300">
                {expanded === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {/* Expanded section */}
            {expanded === index && (
              <>
                {/* Stay Info */}
                <div className="p-2 m-2">
                  <h6 className="text-grey">Stay At</h6>
                  <h6 className="text-lg text-black">{item.stayat}</h6>
                </div>

                {/* Check-in / Nights / Check-out */}
                <div className="bg-gray-100 p-4 rounded-lg m-2">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center">
                      <p className="text-gray-800 font-medium">Check-in</p>
                      <p className="text-gray-800">{item.checkintime}</p>
                    </div>
                    <div className="flex-grow border-t border-dotted border-gray-500 mx-4"></div>
                    <div className="flex-shrink-0">
                      <p className="text-gray-800 font-medium">{item.nights}N</p>
                    </div>
                    <div className="flex-grow border-t border-dotted border-gray-500 mx-4"></div>
                    <div className="flex flex-col items-center">
                      <p className="text-gray-800 font-medium">Check-out</p>
                      <p className="text-gray-800">{item.checkouttime}</p>
                    </div>
                  </div>
                </div>

                {/* Availability Note */}
                <h6 className="m-2 p-2 text-sm text-gray-600">
                  Stays will be allocated based on availability or similar category
                </h6>

               {/* Images (conditionally rendered) */}
<div className="flex gap-4 justify-center flex-wrap">
  {[item.image1, item.image2].map((image, imgIndex) =>
    image ? (
      <div key={`${item.id}-${imgIndex}`} className="relative w-1/2 max-w-xs">
       <img
  src={`http://103.168.18.92${image}`}
  alt={`${item.stayat} image ${imgIndex + 1}`}
  className="w-full h-auto object-cover rounded-lg"
/>
        <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-sm rounded-lg">
          Gallery
        </span>
      </div>
    ) : null
  )}
</div>

                {/* Meals */}
                <div className="bg-sky-100 p-4 mb-8 mt-4 mx-2 rounded-md">
                  <div className="flex justify-around mt-4">
                    <div className="flex flex-col items-center">
                      <div className="text-gray-700 font-semibold">Breakfast</div>
                      {renderMealInclusion(item.breakfast)}
                    </div>
                    <div className="border-l border-gray-400 h-12"></div>
                    <div className="flex flex-col items-center">
                      <div className="text-gray-700 font-semibold">Lunch</div>
                      {renderMealInclusion(item.lunch)}
                    </div>
                    <div className="border-l border-gray-400 h-12"></div>
                    <div className="flex flex-col items-center">
                      <div className="text-gray-700 font-semibold">Dinner</div>
                      {renderMealInclusion(item.dinner)}
                    </div>
                  </div>
                </div>

                <div className="h-2" />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelStay;
