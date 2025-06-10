"use client";
import { useState } from "react";
import Itinerary from '@/components/Itinerary';
import React from 'react';
import Activities from "./Activities";
import HotelStay from "./HotelStay";
import Transfers from "./Transfers";


interface MultiTabViewProps {
  itineraryData: { day: number; title: string; details: string }[];  // Inline type definition for the prop
  activityData: { day: number; title: string; isticketinclude: number }[];
  stayData : {day : number, title : string, stayat: string,checkintime : string,checkouttime : string,nights:number,breakfast : number,lunch : number, dinner : number}[];
  transferData: { day: number; title: string; transfertype : string, transferdetail : string, from : string, to: string }[];
}

const MultiTabView: React.FC<MultiTabViewProps> = ({ itineraryData, activityData, stayData, transferData }) => {
  const [activeTab, setActiveTab] = useState(0);

  const components = [<Itinerary itineraryData={itineraryData} />,<Activities activityData = {activityData} />, <HotelStay stayData = {stayData}/>, <Transfers transferData = {transferData}/>];

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      <div className="w-full max-w-md bg-gray-100 p-4 flex justify-between rounded-lg shadow-md mt-4">
        {["Itinerary","Activity", "Stay", "Transfer"].map((label, index) => (
          <button
            key={index}
            className={`px-4 py-2 rounded-md transition ${
              activeTab === index ? "bg-orange-500 text-white" : "bg-white text-black"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6">{components[activeTab]}</div>
    </div>
  );
};

export default MultiTabView;
