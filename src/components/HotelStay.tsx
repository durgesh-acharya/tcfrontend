"use client";
import { useState } from "react";
import React from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";

interface HotelStayProps {
    stayData : {day : number, title : string, stayat: string,checkintime : string,checkouttime : string,nights:number,breakfast : number,lunch : number, dinner : number}[];  // Inline type definition for the prop
  }

 
const HotelStay: React.FC<HotelStayProps> = ({ stayData }) => {

    const [expanded, setExpanded] = useState<number | null>(null);

    const toggleExpand = (index: number) => {
      setExpanded(expanded === index ? null : index);
    };
    const hotels = [
        {
            image: "/images/14.jpg", // Example image path
            name: "Luxury Hotel A",
            rating: 4.5,
          },
          {
            image: "/images/14.jpg", // Example image path
            name: "Oceanview Resort",
            rating: 5.0,
          },
    ];
     // Function to render meal inclusion (breakfast, lunch, dinner)
  const renderMealInclusion = (meal: number) => {
    if (meal === 1) {
      return (
        <div className="flex items-center text-green-500">
          <span className="mr-2">✔</span>
          Included
        </div>
      );
    }
    return (
      <div className="flex items-center text-red-500">
        <span className="mr-2">✘</span>
        Not Included
      </div>
    );
  };
    return (

        <div className="w-full">


      {/* stay List */}
      <div className="mt-6 space-y-4 px-4">
        {stayData.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md">
            {/* Header Row */}
            <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => toggleExpand(index)}>
              <div className="px-3 py-1 bg-navbarcolor text-white text-sm font-medium rounded-full">Day {item.day}</div>
              <div className="text-gray-900 text-sm font-bold">{item.title}</div>
              <button className="p-2 rounded-full bg-black-300">
                {expanded === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {/* Expanded Content */}
            {expanded === index && (
            <>
            <div className="p-2 m-2">
                <h6 className="text-grey">Stay At</h6>
                <h6 className="text-lg text-black ">{item.stayat}</h6>
            </div>
             <div className="bg-gray-100 p-4 rounded-lg m-2">
             <div className="flex items-center justify-between">
                 {/* Left: Check-in */}
                 <div className="flex flex-col items-center">
                     <p className="text-gray-800 font-medium">Check-in</p>
                     <p className="text-gray-800">{item.checkintime}</p>
                 </div>
 
                 {/* Dotted Line between Check-in and 4N */}
                 <div className="flex-grow border-t border-dotted border-gray-500 mx-4"></div>
 
                 {/* Middle: Number of Nights (Centered) */}
                 <div className="flex-shrink-0">
                     <p className="text-gray-800 font-medium">{item.nights}</p>
                 </div>
 
                 {/* Dotted Line between 4N and Check-out */}
                 <div className="flex-grow border-t border-dotted border-gray-500 mx-4"></div>
 
                 {/* Right: Check-out */}
                 <div className="flex flex-col items-center">
                     <p className="text-gray-800 font-medium">Check-out</p>
                     <p className="text-gray-800">{item.checkouttime}</p>
                 </div>
             </div>
         </div>
         
         <h6 className="m-2 p-2">Stays will be allocated based on availability or similar category</h6>
         {/* hotel images */}
         <div className="flex gap-4 justify-center">
      {hotels.map((hotel, index) => (
        <div key={index} className="relative w-1/2 max-w-xs">
          {/* Image Container */}
          <img src={hotel.image} alt={hotel.name} className="w-full h-auto rounded-lg" />
          
          {/* Gallery Tag */}
          <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-sm rounded-lg">
            Gallery
          </span>
          
          {/* Star Rating */}
          <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-sm rounded-full flex items-center justify-center">
            {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
            {hotel.rating % 1 !== 0 && (
              <span className="text-yellow-400">★</span>
            )}
          </div>
          
          {/* Hotel Name */}
          <div className="m-2  text-lg font-semibold">{hotel.name}</div>
        </div>
      ))}
    </div>

    {/* meal inclusion */}
    <div className="bg-sky-100 p-4 mb-8 mt-4 mx-2">
      {stayData.map((data, index) => (
        <div key={index} >
      
          {/* Meal Details Row */}
          <div className="flex justify-around mt-4">
            <div className="flex flex-col items-center">
              <div className="text-grey-300 font-semibold">Breakfast</div>
              {renderMealInclusion(data.breakfast)}
            </div>
             {/* Vertical Divider */}
             <div className="border-l border-gray-500 h-12"></div>

            <div className="flex flex-col items-center">
              <div className="text-grey-100 font-semibold">Lunch</div>
              {renderMealInclusion(data.lunch)}
            </div>
             {/* Vertical Divider */}
             <div className="border-l border-gray-500 h-12"></div>

            <div className="flex flex-col items-center">
              <div className="text-grey-100 font-semibold">Dinner</div>
              {renderMealInclusion(data.dinner)}
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="h-2"></div>  {/* This div will have a height of 8rem (128px) */}

         </>
            )}
           
          </div>
        ))}
      </div>
      
    </div>
       
        
       
    );
};

export default HotelStay;
