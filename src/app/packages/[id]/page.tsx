/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';  
import React from 'react';
import { useSearchParams, useParams } from 'next/navigation'; // Import `useParams` from `next/navigation`
import Navbar from '@/components/Navbar';
import CategorySelector from "@/components/CategorySelector";
import ChooseDuration from "@/components/ChooseDuration";
import DestinationRoutes from "@/components/DestinationRoutes";

import IncludedTags from "@/components/IncludedTags";
import MultiTabView from "@/components/MultiTabView";
import PackageTitle from "@/components/PackageTitle";
import TripHighlights from "@/components/TripHighlights";
import ImageGrid from "@/components/ImageGrid";
import InclusionExclusion from "@/components/InclusionExclusion";
import KnowBeforeYouGo from "@/components/KnowBeforeYoGo";
import ItineraryHighlights from "@/components/ItineraryHighlights";

import { useState, useEffect } from "react";



const PackageDetail = () => {
  
  const params = useParams();
  const { id } = params; // package ID from route
  const searchParams = useSearchParams();

  // Query params (strings)
  const location_id = searchParams.get('location_id');
  const duration_id = searchParams.get('duration_id');
  const staycategory_id = searchParams.get('staycategory_id');
  const destination_routeid = searchParams.get('destination_routeid');

  // State: current selected filters and package data
  const [packageId, setPackageId] = useState<number | null>(
    typeof id === 'string' ? parseInt(id) : Array.isArray(id) ? parseInt(id[0]) : null
  );
  const [packageData, setPackageData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchIncludes = async (pkgId: number) => {
    try {
      const res = await fetch(`http://103.168.18.92/api/include/package/${pkgId}`);
      const data = await res.json();
      
      if (res.ok && data.status) {
        const tags = data.data.map((item: any) => item.include_includtagname);
        setIncludes(tags);
      } else {
        setIncludes([]); // clear on error or no data
      }
    } catch (err) {
      console.error("Error fetching includes:", err);
      setIncludes([]);
    }
  };
  useEffect(() => {
    if (packageId !== null) {
      fetchIncludes(packageId);
    }
  }, [packageId]);
    

  // Local states for duration, route and category selections
  // Initialize from URL params (parseInt + fallback)
  const [selectedDuration, setSelectedDuration] = useState<number | null>(duration_id ? parseInt(duration_id) : null);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(destination_routeid ? parseInt(destination_routeid) : null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(staycategory_id ? parseInt(staycategory_id) : null);
  const [includes, setIncludes] = useState<string[]>([]);
  const [itineraryHighlights, setItineraryHighlights] = useState<Array<{ itineraryhighlights_id: number; itineraryhighlights_noofnifhts: number; itineraryhighlights_where: string }>>([]);
  const fetchItineraryHighlights = async (pkgId: number) => {
    try {
      const res = await fetch(`http://103.168.18.92/api/itineraryhighlights/package/${pkgId}`);
      const json = await res.json();
      if (json.status) {
        setItineraryHighlights(json.data);
      } else {
        setItineraryHighlights([]);
      }
    } catch (err) {
      console.error("Failed to fetch itinerary highlights:", err);
      setItineraryHighlights([]);
    }
  };

  // Run fetch on packageId change
  useEffect(() => {
    if (packageId !== null) {
      fetchItineraryHighlights(packageId);
    }
  }, [packageId]);
  // Fetch package data by params (location, duration, category, route)
  const fetchPackage = async (
    locationId: string,
    duration: number | null,
    category: number | null,
    route: number | null
  ) => {
    if (!locationId || duration === null || category === null || route === null) return;

    try {
      const query = new URLSearchParams({
        location_id: locationId,
        duration_id: duration.toString(),
        staycategory_id: category.toString(),
        destinationroute_id: route.toString(),
      });

      const res = await fetch(`http://103.168.18.92/api/packages/search/by-params?${query.toString()}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Failed to fetch package data');
        return;
      }

      const newPackage = data.data?.[0];
      if (newPackage) {
        setPackageId(newPackage.packages_id);  // Update package ID state
        setPackageData(newPackage);  
        console.log(newPackage.packages_id);           // Update package data state
      } else {
        setError('No package found for selected parameters');
      }
    } catch (err: any) {
      setError(err.message || 'Unknown fetch error');
    }
  };

  // Initial fetch when URL params load or change
  useEffect(() => {
    if (location_id && selectedDuration && selectedCategory && selectedRoute) {
      fetchPackage(location_id, selectedDuration, selectedCategory, selectedRoute);
    }
  }, [location_id, selectedDuration, selectedCategory, selectedRoute]);

  // Handler for duration change
  const handleDurationSelect = (id: number) => {
    setSelectedDuration(id);
  };

  // Handler for route change
  const handleRouteSelect = (id: number | null) => {
    setSelectedRoute(id);
    // fetchPackage will trigger automatically via useEffect dependency
  };

  // Handler for category change
  const handleCategorySelect = (id: number | null) => {
    setSelectedCategory(id);
    // fetchPackage will trigger automatically via useEffect dependency
  };

  
  const [durations, setDurations] = useState<
  { id: number; duration: string; imageurl: string; startsfrom: string }[]
>([]);

const fetchDurationsByLocation = async (locationId: string) => {
  try {
    const res = await fetch(`http://103.168.18.92/api/locationdurations/location/${locationId}`);
    const json = await res.json();

    if (json.status && Array.isArray(json.data)) {
      const formatted = json.data.map((item: any) => ({
        id: item.locationdurations_durations_id,
        duration: item.locationdurations_tags,
        imageurl: item.locationdurations_imageurl,
        startsfrom: item.locationdurations_startsfrom,
      }));
      setDurations(formatted);

      // Set initial selection to first item if none selected yet
      if (!selectedDuration && formatted.length > 0) {
        setSelectedDuration(formatted[0].id);
      }
    } else {
      setDurations([]);
    }
  } catch (err) {
    console.error("Error fetching durations:", err);
    setDurations([]);
  }
};

useEffect(() => {
  if (location_id) {
    fetchDurationsByLocation(location_id);
  }
}, [location_id]);
 
 
  
const [routes, setRoutes] = useState<{ id: number; route: string }[]>([]);

  // Fetch destination routes based on selectedDuration
  const fetchRoutesByDuration = async (durationId: number) => {
    try {
      const res = await fetch(`http://103.168.18.92/api/destinationroutes/joined/location/${durationId}`);
      const json = await res.json();
      if (json.status) {
        // Map API response to the shape DestinationRoutes expects
        const formattedRoutes = json.data.map((item: any) => ({
          id: item.destinationroutes_id,
          route: item.destinationroutes_name,
        }));
        setRoutes(formattedRoutes);
      } else {
        setRoutes([]); // empty array if no data or error
      }
    } catch (err) {
      console.error("Error fetching routes:", err);
      setRoutes([]);
    }
  };

  // Fetch routes whenever selectedDuration changes
  useEffect(() => {
    if (selectedDuration !== null) {
      fetchRoutesByDuration(selectedDuration);
    }
  }, [selectedDuration]);
  //  const [selectedRoute, setSelectedRoute] = useState<number | null>(routes[0].id); 
  //  const handleRouteSelect = (id: number | null) => {
  //   setSelectedRoute(id);
  //   if (id && location_id && selectedDuration && selectedCategory) {
  //     fetchPackage(location_id, selectedDuration, selectedCategory, id);
  //   }
  // };
 
   const categoryList = [
     { id: 1, category: "Standard" },
     { id: 2, category: "Deluxe" },
     { id: 3, category: "Luxury" },
   ];
  //  const [selectedCategory, setSelectedCategory] = useState<number | null>(1);
  //  const handleCategorySelect = (id: number | null) => {
  //   setSelectedCategory(id);
  //   if (id && location_id && selectedDuration && selectedRoute) {
  //     fetchPackage(location_id, selectedDuration, id, selectedRoute);
  //   }
  // };
 
   const itineraryData = [
     { day: 1, title: "Arrival & City Tour", details: "Welcome to the city! Explore the main attractions, enjoy local cuisine, and relax at the hotel." },
     { day: 2, title: "Adventure & Sightseeing", details: "Go on an adventure to the mountains, visit historical sites, and experience breathtaking views." },
     { day: 3, title: "Leisure & Departure", details: "Spend the last day at leisure, shopping, or enjoying a spa before heading to the airport." },
     { day: 4, title: "Back to Origin", details: "Back to origin from where trip begins." },
   ];
 
   const activitiesData = [
     { day: 1, title: "Burj Khalifa Tickets At the Top 124th 125th Floor - At the Top (Level 124 & 125) on a Private basis", isticketinclude: 1 },
     { day: 2, title: "IMG Worlds Of Adventure Tickets, Dubai - IMG World of Adventure Tickets on a Private basis", isticketinclude: 1 } 
   ];
 
   const stayData = [
     { day: 1, title: "Welcome to Dubai, 'The Pearl of the Gulf' | Day at Leisure", stayat: "Check-in at Standard Hotel in Dubai", checkintime: "3:00PM", checkouttime: "12:00PM", nights: 4, breakfast: 1, lunch: 0, dinner: 0 }
   ];
 
   const transferData = [
     { day: 1, title: "Welcome to Dubai, 'The Pearl of the Gulf' | Day at Leisure", transfertype: "Private", transferdetail: "Transfer in Toyota Sienna, Toyota Previa or similar", from: "Dubai International Airport", to: "Standard Hotel in Dubai" },
     { day: 2, title: "Visit the Iconic Burj Khalifa | Dubai Desert Safari with Bbq Dinner", transfertype: "Private", transferdetail: "Transfer in Toyota Sienna, Toyota Previa or similar", from: "Standard Hotel in Dubai", to: "Burj Khalifa Tickets At the Top 124th 125th Floor" },
     { day: 2, title: "Visit the Iconic Burj Khalifa | Dubai Desert Safari with Bbq Dinner", transfertype: "Shared", transferdetail: "Transfer in 4x4 Land Cruiser Jeep", from: "Burj Khalifa Tickets At the Top 124th 125th Floor", to: "Dubai Desert Safari with BBQ Dinner" }
   ];
 
   const inclusions = [
     'Round trip airfare',
     'Hotel stay for 5 nights',
     'Daily breakfast',
     'City tour',
     'Travel insurance',
   ];
   
   const exclusions = [
     'Personal expenses',
     'Meals outside the package',
     'Tips and gratuities',
     'Visa fees',
     'Optional activities',
   ];
 
   const clauses = [
     'Any breakage or damage of any items in the resort/hotel will be charged at actuals.',
     'All international and domestic airfare, visa fees, airport tax, or any kind of insurance cover is not a part of the package.',
     'All foreign nationals must share their passport and visa details at the time of arrival.',
     'Any personal expenses or items of personal nature will not be included in the package.',
     'Do not consume alcoholic beverages or drugs, if you are found intoxicated, you might be asked to leave the tour/premises.',
     'The hotels are subject to their availability. In case they are not available, the travelers will be accommodated in a property of similar standard.',
     'Meals in the restaurants or cafes are not included.',
     'Travel insurance is not included in the package.',
     'Any activities or transfers not specified in the itinerary are not part of the package and require separate arrangements.'
   ];



  return (
    <>
    <Navbar />
    <div className="mt-6 mx-6 md:px-10 flex-col md:flex-row">
     
     <ImageGrid />

     {/* Main Content Section */}
     <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden mt-6">
       {/* Left Section */}
       <div className="md:w-3/5 w-full p-6">
       <PackageTitle title={packageData?.packages_name || "Loading Package..."} />
         {/* <DurationCapsuel /> */}
         {/* <ItineraryHighlights itinerary={itineraryhighlightData} /> */}
         <ItineraryHighlights itinerary={itineraryHighlights.map(item => ({
        location: item.itineraryhighlights_where,
        nights: item.itineraryhighlights_noofnifhts
      }))} />
         <hr className="my-4 border-gray-300" />

         <IncludedTags items={includes} />

         <hr className="my-4 border-gray-300" />

         {/* <ChooseDuration items={durations} onSelectionChange={handleDurationSelect} /> */}
         <ChooseDuration items={durations} onSelectionChange={handleDurationSelect} />
         <hr className="my-4 border-gray-300" />

         <DestinationRoutes routes={routes} onSelectionChange={handleRouteSelect} />

         <hr className="my-4 border-gray-300" />

         <CategorySelector categories={categoryList} onCategorySelect={handleCategorySelect} />

         <hr className="my-4 border-gray-300" />

         <TripHighlights />

         <hr className="my-4 border-gray-300" />

         <MultiTabView itineraryData={itineraryData} activityData={activitiesData} stayData={stayData} transferData={transferData} />
         <hr className="my-4 border-gray-300" />
         <InclusionExclusion inclusions={inclusions} exclusions={exclusions} />
         <hr className="my-4 border-gray-300" />
         <KnowBeforeYouGo clauses={clauses} />
         
       </div>

       {/* Right Section (Price and Book Button) */}
       <div className="md:w-2/5 w-full p-6 bg-white border border-gray-200 h-36">
         <div className="text-xl font-semibold text-black mb-4">
           Rs. {packageData?.packages_offerprice || "Loading Package..."}/- per adult
         </div>
         <button className="w-full bg-black text-white py-2 rounded-md hover:bg-blue-600 transition">
           Send Inquiry
         </button>
       </div>
     </div>
   </div>
    
    </>
  );
};

export default PackageDetail;
