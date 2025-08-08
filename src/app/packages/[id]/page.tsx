/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'next/navigation';


import Navbar from '@/components/Navbar';
import ImageGrid from '@/components/ImageGrid';
import PackageTitle from "@/components/PackageTitle";
import ItineraryHighlights from "@/components/ItineraryHighlights";
import IncludedTags from "@/components/IncludedTags";
import ChooseDuration from "@/components/ChooseDuration";
import DestinationRoutes from "@/components/DestinationRoutes";
import CategorySelector from "@/components/CategorySelector";
import TripHighlights from "@/components/TripHighlights";
import MultiTabView from "@/components/MultiTabView";
import InclusionExclusion from "@/components/InclusionExclusion";
import KnowBeforeYouGo from "@/components/KnowBeforeYoGo";

const PackageDetail = () => {
  // ────────────────────────────────
  // Route + Search Parameters
  // ────────────────────────────────
  const params = useParams();
  const { id } = params;
  const searchParams = useSearchParams();

  const location_id = searchParams.get('location_id');
  const duration_id = searchParams.get('duration_id');
  const staycategory_id = searchParams.get('staycategory_id');
  const destination_routeid = searchParams.get('destination_routeid');
  const locationduration_id = searchParams.get('locationduration_id');
  const parsedDurationId = duration_id ? parseInt(duration_id) : null;
  // const parsedLocationDurationId = locationduration_id ? parseInt(locationduration_id) : null;
  // ────────────────────────────────
  // State: Package & Related Data
  // ────────────────────────────────
  const [packageId, setPackageId] = useState<number | null>(
    typeof id === 'string' ? parseInt(id) : Array.isArray(id) ? parseInt(id[0]) : null
  );
  const [packageData, setPackageData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [includes, setIncludes] = useState<string[]>([]);
  const [itineraryHighlights, setItineraryHighlights] = useState<
    { itineraryhighlights_id: number; itineraryhighlights_noofnifhts: number; itineraryhighlights_where: string }[]
  >([]);

  // ────────────────────────────────
  // State: User Selections (UI State)
  // ────────────────────────────────
  const [selectedDuration, setSelectedDuration] =  useState<number | null>(duration_id ? parseInt(duration_id) : null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(staycategory_id ? parseInt(staycategory_id) : null);
  const [selectedRoute, setSelectedRoute] = useState<number | null>(destination_routeid ? parseInt(destination_routeid) : null);
  const [selectedLocationDurationId, setSelectedLocationDurationId] = useState<number | null>(null);
  const [tripHighlights, setTripHighlights] = useState<string[]>([]);
  const [fetchedItineraryData, setFetchedItineraryData] = useState<
  { day: number; title: string; details: string }[]
>([]);
// const [activitiesData, setActivitiesData] = useState<any[]>([]);
const [stayData, setStayData] = useState<any[]>([]);
const [transferData, setTransferData] = useState<any[]>([]);
const [packageImages, setPackageImages] = useState<{ url: string; category: number }[]>([]);
const [durations, setDurations] = useState<
  {
    id: number;                    // same as locationDurationId
    locationDurationId: number;
    durationId: number;           // 👈 Add this line
    duration: string;
    imageurl: string;
    startsfrom: string;
  }[]
>([]);

  const [routes, setRoutes] = useState<{ id: number; route: string }[]>([]);
  const [inclusion, setInclusion] = useState<string[]>([]);
  const [exclusions, setExclusions] = useState<string[]>([]);
  const [clauses, setClauses] = useState<string[]>([]);

  const categoryList = [
    { id: 1, category: "Standard" },
    { id: 2, category: "Deluxe" },
    { id: 3, category: "Luxury" },
  ];

  // ────────────────────────────────
  // Fetch Functions
  // ────────────────────────────────

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
        setPackageId(newPackage.packages_id);
        setPackageData(newPackage);
      } else {
        setError('No package found for selected parameters');
      }
    } catch (err: any) {
      setError(err.message || 'Unknown fetch error');
    }
  };

  const fetchIncludes = async (pkgId: number) => {
    try {
      const res = await fetch(`http://103.168.18.92/api/include/package/${pkgId}`);
      const data = await res.json();
      if (res.ok && data.status) {
        const tags = data.data.map((item: any) => item.include_includtagname);
        setIncludes(tags);
      } else {
        setIncludes([]);
      }
    } catch (err) {
      console.error("Error fetching includes:", err);
      setIncludes([]);
    }
  };

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

  // const fetchDurationsByLocation = async (locationId: string) => {
  //   try {
  //     const res = await fetch(`http://103.168.18.92/api/locationdurations/location/${locationId}`);
  //     const json = await res.json();

  //     if (json.status && Array.isArray(json.data)) {
  //       const formatted = json.data.map((item: any) => ({
  //         id: item.locationdurations_id,                    // ← used as selectedDuration
  // locationDurationId: item.locationdurations_id,   
  // durationId: item.locationdurations_durations_id,
  // duration: item.locationdurations_tags,
  // imageurl: item.locationdurations_imageurl,
  // startsfrom: item.locationdurations_startsfrom,
  //       }));
  //       setDurations(formatted);
  //       const match = parsedLocationDurationId
  //       ? formatted.find((d: { locationDurationId: number; }) => d.locationDurationId === parsedLocationDurationId)
  //       : formatted[0];

  //     if (match) {
  //       setSelectedDuration(match.id);
  //       setSelectedLocationDurationId(match.locationDurationId);
  //     }

  //     } else {
  //       setDurations([]);
  //     }
  //   } catch (err) {
  //     console.error("Error fetching durations:", err);
  //     setDurations([]);
  //   }
  // };
  const fetchDurationsByLocation = async (locationId: string) => {
    try {
      const res = await fetch(`http://103.168.18.92/api/locationdurations/location/${locationId}`);
      const json = await res.json();
  
      if (json.status && Array.isArray(json.data)) {
        const formatted = json.data.map((item: any) => ({
          id: item.locationdurations_id,                    // UI selection ID
          locationDurationId: item.locationdurations_id,
          durationId: item.locationdurations_durations_id,  // 👈 This is important
          duration: item.locationdurations_tags,
          imageurl: item.locationdurations_imageurl,
          startsfrom: item.locationdurations_startsfrom,
        }));
  
        setDurations(formatted);
  
        // ✅ Select default based on parsedDurationId from URL
        const defaultMatch = parsedDurationId
          ? formatted.find((d: { durationId: number; }) => d.durationId === parsedDurationId)
          : formatted[0];
  
        if (defaultMatch) {
          setSelectedDuration(defaultMatch.id);
          setSelectedLocationDurationId(defaultMatch.locationDurationId);
        }
  
      } else {
        setDurations([]);
      }
    } catch (err) {
      console.error("Error fetching durations:", err);
      setDurations([]);
    }
  };

  const fetchRoutesByDuration = async (locationDurationId: number) => {
    try {
      const res = await fetch(`http://103.168.18.92/api/destinationroutes/joined/location/${locationDurationId}`);
      const json = await res.json();
      if (json.status) {
        const formattedRoutes = json.data.map((item: any) => ({
          id: item.destinationroutes_id,
          route: item.destinationroutes_name,
        }));
        console.log(`Fetching routes for ${locationDurationId}`);
        setRoutes(formattedRoutes);
          // ✅ Set selectedRoute if not already set
      // if (!selectedRoute) {
      //   const match = destination_routeid
      //     ? formattedRoutes.find((r: { id: number; }) => r.id === parseInt(destination_routeid))
      //     : formattedRoutes[0];

      //   if (match) {
      //     setSelectedRoute(match.id);
      //   }
      // }
      const routeIdFromUrl = destination_routeid ? parseInt(destination_routeid) : null;
      const defaultRoute = routeIdFromUrl
        ? formattedRoutes.find((r: { id: number }) => r.id === routeIdFromUrl)
        : formattedRoutes[0];

      if (defaultRoute) {
        setSelectedRoute(defaultRoute.id);
      }
      } else {
        setRoutes([]);
      }
    } catch (err) {
      console.error("Error fetching routes:", err);
      setRoutes([]);
    }
  };
// fetch trip highlights
const fetchTripHighlights = async (pkgId: number) => {
  try {
    const res = await fetch(`http://103.168.18.92/api/triphighlights/package/${pkgId}`);
    const json = await res.json();
    if (res.ok && json.status) {
      const highlights = json.data.map((item: any) => item.triphighlights_name);
      setTripHighlights(highlights);
    } else {
      setTripHighlights([]);
    }
  } catch (err) {
    console.error("Error fetching trip highlights:", err);
    setTripHighlights([]);
  }
};
const fetchInclusion = async (pkgId: number) => {
  try {
    const res = await fetch(`http://103.168.18.92/api/tourinclusion/package/${pkgId}`);
    const data = await res.json();
    if (res.ok && data.status) {
      const tags = data.data.map((item: any) => item.packageinclusion_inclusion);
      setInclusion(tags);
    } else {
      setInclusion([]);
    }
  } catch (err) {
    console.error("Error fetching includes:", err);
    setInclusion([]);
  }
};

// NEW: Fetch exclusions data function
const fetchExclusions = async (pkgId: number) => {
  try {
    const res = await fetch(`http://103.168.18.92/api/tourexclusion/package/${pkgId}`);
    const data = await res.json();
    if (res.ok && data.status) {
      const tags = data.data.map((item: any) => item.packageexclusion_exclusion);
      setExclusions(tags);
    } else {
      setExclusions([]);
    }
  } catch (err) {
    console.error("Error fetching exclusions:", err);
    setExclusions([]);
  }
};

const fetchClauses = async (pkgId: number) => {
  try {
    const res = await fetch(`http://103.168.18.92/api/knowbeforeyougo/package/${pkgId}`);
    const data = await res.json();
    if (res.ok && data.status) {
      const list = data.data.map((item: any) => item.knowbeforeyougo_point);
      setClauses(list);
    } else {
      setClauses([]);
    }
  } catch (err) {
    console.error("Error fetching clauses:", err);
    setClauses([]);
  }
};

//function to fetch images
const fetchPackageImages = async (pkgId: number) => {
  try {
    const res = await fetch(`http://103.168.18.92/api/packageimages/by-package/${pkgId}`);
    const json = await res.json();

    if (res.ok && json.status) {
      const formatted = json.data.map((item: any) => ({
        url: item.packageimages_url,
        category: item.packageimages_category,
      }));
      setPackageImages(formatted);
    } else {
      setPackageImages([]);
    }
  } catch (err) {
    console.error("Error fetching package images:", err);
    setPackageImages([]);
  }
};
  // ────────────────────────────────
  // Event Handlers
  // ────────────────────────────────


  const handleDurationSelect = (id: number) => {
    setSelectedDuration(id);
    const match = durations.find((d) => d.id === id);
    if (match) {
      setSelectedLocationDurationId(match.locationDurationId);
      
      // 👇 Set this explicitly so it fetches the correct package
      fetchPackage(location_id!, match.durationId, selectedCategory, selectedRoute);
    }
  };

  const handleRouteSelect = (id: number | null) => {
    setSelectedRoute(id);
  };

  const handleCategorySelect = (id: number | null) => {
    setSelectedCategory(id);
  };
//fetch itinerary
const fetchItineraries = async (pkgId: number) => {
  try {
    const res = await fetch(`http://103.168.18.92/api/itineraries/package/${pkgId}`);
    const json = await res.json();

    if (res.ok && json.status) {
      const formatted = json.data.map((item: any) => ({
        day: item.itineraries_day,
        title: item.itineraries_tiitle,
        details: item.itineraries_description,
      }));
      setFetchedItineraryData(formatted);
    } else {
      setFetchedItineraryData([]);
    }
  } catch (err) {
    console.error("Error fetching itineraries:", err);
    setFetchedItineraryData([]);
  }
};
// const fetchActivities = async (pkgId: number) => {
//   try {
//     const res = await fetch(`http://103.168.18.92/api/activities/package/${pkgId}`);
//     const json = await res.json();
//     if (res.ok && json.status) {
//       const formatted = json.data.map((item: any) => ({
//         day: item.day,
//         title: item.title,
//         isticketinclude: item.isticketinclude,
//         // Map other fields as needed
//       }));
//       setActivitiesData(formatted);
//     } else {
//       setActivitiesData([]);
//     }
//   } catch (err) {
//     console.error("Error fetching activities:", err);
//     setActivitiesData([]);
//   }
// };

const fetchStay = async (pkgId: number) => {
  try {
    const res = await fetch(`http://103.168.18.92/api/stays/package/${pkgId}`);
    const json = await res.json();
    if (res.ok && json.status) {
      const formatted = json.data.map((item: any) => ({
        id: item.stays_id,
        day: parseInt(item.stays_day),
        title: item.stays_title,
        stayat: item.stays_stysat, // seems like a typo in API, but using as-is
        checkintime: item.stays_checkin,
        checkouttime: item.stays_checkout,
        nights: parseInt(item.stays_numofnight),
        breakfast: item.stays_isbreakfastinclude === 1,
        lunch: item.stays_islunchinclude === 1,
        dinner: item.stays_isdinnerinclude === 1,
        image1:item.stays_image1,
        image2:item.stays_image2
      }));
      console.log(formatted);
      setStayData(formatted);
    } else {
      setStayData([]);
    }
  } catch (err) {
    console.error("Error fetching stay data:", err);
    setStayData([]);
  }
};

const fetchTransfers = async (pkgId: number) => {
  try {
    const res = await fetch(`http://103.168.18.92/api/transfers/package/${pkgId}`);
    const json = await res.json();

    if (res.ok && json.status) {
      const formatted = json.data.map((item: any) => ({
        id: item.transfers_id,
        day: parseInt(item.transfers_day),
        title: item.transfers_title,
        transfertype: item.transfers_type,
        transferin: item.transfers_transferin, 
        from: item.transfers_from,
        to: item.transfers_to,
      }));
      setTransferData(formatted);
    } else {
      setTransferData([]);
    }
  } catch (err) {
    console.error("Error fetching transfers:", err);
    setTransferData([]);
  }
};


  // ────────────────────────────────
  // Effects
  // ────────────────────────────────
  useEffect(() => {
    if (packageId !== null) {
      fetchIncludes(packageId);
      fetchItineraryHighlights(packageId);
      fetchTripHighlights(packageId);
      fetchItineraries(packageId);
      // fetchActivities(packageId);
      fetchStay(packageId);
      fetchTransfers(packageId);
      fetchInclusion(packageId);
      fetchExclusions(packageId); 
      fetchClauses(packageId);
      fetchPackageImages(packageId);
    }
  }, [packageId]);

  // useEffect(() => {
  //   if (location_id && selectedDuration && selectedCategory && selectedRoute) {
  //     fetchPackage(location_id, selectedDuration, selectedCategory, selectedRoute);
  //   }
  // }, [location_id, selectedDuration, selectedCategory, selectedRoute]);
  useEffect(() => {
    console.log("🔍 Ready to fetch:", {
      location_id,
      selectedDuration,
      selectedCategory,
      selectedRoute,
    });
    if (
      location_id &&
      selectedDuration !== null &&
      selectedCategory !== null &&
      selectedRoute !== null
    ) {
      fetchPackage(location_id, selectedDuration, selectedCategory, selectedRoute);
    }
  }, [location_id, selectedDuration, selectedCategory, selectedRoute]);

  useEffect(() => {
    if (location_id) {
      fetchDurationsByLocation(location_id);
    }
  }, [location_id]);

  useEffect(() => {
    if (selectedLocationDurationId !== null) {
      fetchRoutesByDuration(selectedLocationDurationId);
    }
  }, [selectedLocationDurationId]);

  useEffect(() => {
    if (!selectedCategory) {
      const defaultCategory = staycategory_id
        ? parseInt(staycategory_id)
        : categoryList[0].id;
  
      setSelectedCategory(defaultCategory);
    }
  }, [staycategory_id, selectedCategory]);

 

  const activitiesData = [
    { day: 1, title: "Burj Khalifa Tickets At the Top 124th 125th Floor - At the Top (Level 124 & 125) on a Private basis", isticketinclude: 1 },
    { day: 2, title: "IMG Worlds Of Adventure Tickets, Dubai - IMG World of Adventure Tickets on a Private basis", isticketinclude: 1 }
  ];

  

  // ────────────────────────────────
  // Render
  // ────────────────────────────────
  return (
    <>
      <Navbar />
      <div className="mt-6 mx-6 md:px-10 flex-col md:flex-row">
      <ImageGrid images={packageImages}   packageId={packageId}
  categoryId={selectedCategory} />

        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden mt-6">
          <div className="md:w-3/5 w-full p-6">
            <PackageTitle title={packageData?.packages_name || "Loading Package..."} />
            <ItineraryHighlights itinerary={itineraryHighlights.map(item => ({
              location: item.itineraryhighlights_where,
              nights: item.itineraryhighlights_noofnifhts
            }))} />
            <hr className="my-4 border-gray-300" />
            <IncludedTags items={includes} />
            <hr className="my-4 border-gray-300" />
            <ChooseDuration
              items={durations}
               selectedId={selectedDuration}
              onSelectionChange={handleDurationSelect}
                />
            <hr className="my-4 border-gray-300" />
            <DestinationRoutes
  routes={routes}
  selectedId={selectedRoute} // 👈 Pass the selectedRoute here
  onSelectionChange={handleRouteSelect}
/>
            <hr className="my-4 border-gray-300" />
            <CategorySelector categories={categoryList} onCategorySelect={handleCategorySelect}  selectedCategory={selectedCategory} />
            <hr className="my-4 border-gray-300" />
            <TripHighlights highlights={tripHighlights}  />
            <hr className="my-4 border-gray-300" />
            <MultiTabView itineraryData={fetchedItineraryData} activityData={activitiesData}
  stayData={stayData}
  transferData={transferData} />
            <hr className="my-4 border-gray-300" />
            <InclusionExclusion inclusions={inclusion} exclusions={exclusions} />
            <hr className="my-4 border-gray-300" />
            <KnowBeforeYouGo clauses={clauses} />
          </div>

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
