/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {useState,useEffect} from 'react';
import Navbar from '@/components/Navbar';
import HorizontalScroll from '@/components/HorizontalScroll';
import Tabs from '@/components/Tabs';
import LocationPackageCarousel from '@/components/LocationPackageCarousel'; 
import LocationActivityCarousel from '@/components/LocationActivityCarousel';
import Footer from '@/components/Footer';


export default function Home() {
  //handel location change
  const [selectedLocationId, setSelectedLocationId] = useState<number | null>(null);
  const [locations, setLocations] = useState<any[]>([]);
  const [locationwisePackages, setLocationwisePackages] = useState<any[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<any[]>([]);
  const [loadingPackages, setLoadingPackages] = useState(false);
  // const handleLocationClick = async (id: number) => {
  //   setSelectedLocationId(id);
  //   try {
  //     const res = await fetch(`http://103.168.18.92/api/locationpackages/locationwithpackages/${id}`);
  //     const json = await res.json();
  //     if (json.status && Array.isArray(json.data)) {
  //       const sanitized = json.data.map((pkg: any) => ({
  //         ...pkg,
  //         imageurl: pkg.imageurl || '/images/default.jpg',
  //       }));

  //       const locationName = locations.find(loc => loc.location_id === id)?.location_name || 'Selected Location';

  //       setFilteredPackages([
  //         {
  //           location_id: id,
  //           location_name: locationName,
  //           packages: sanitized
  //         }
  //       ]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching selected location packages:", error);
  //   }
  // };

  const handleLocationClick = async (id: number) => {
  if (selectedLocationId === id) {
    setSelectedLocationId(null);
    setFilteredPackages([]);
    return;
  }

  setSelectedLocationId(id);
  setLoadingPackages(true);

  try {
    const res = await fetch(`http://103.168.18.92/api/locationpackages/locationwithpackages/${id}`);
    const json = await res.json();
    console.log("Fetched packages for location", id, json);

    if (json.status && json.data && Array.isArray(json.data.packages)) {
      const locationData = {
        location_id: json.data.location_id,
        location_name: json.data.location_name,
        packages: json.data.packages.map((pkg: any) => ({
          ...pkg,
          imageurl: pkg.imageurl || '/images/default.jpg',
        })),
      };

      setFilteredPackages([locationData]);
    } else {
      console.warn("Unexpected API response format:", json);
      setFilteredPackages([]);
    }
  } catch (error) {
    console.error("Error fetching selected location packages:", error);
  } finally {
    setLoadingPackages(false);
  }
};

      //handel tab changes
      const [selectedTabValue, setSelectedTabValue] = useState<number>(0); // Default to tours (0)

      // Handle the tab change by setting the value from the child component
      const handleTabChange = (value: number) => {
        setSelectedTabValue(value);
      };
   // Fetch locations from API
   useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch('http://103.168.18.92/api/locations/active'); // Replace with your actual endpoint
        const json = await response.json();
        if (json.status && Array.isArray(json.data)) {
          setLocations(json.data);
        } else {
          console.error('Unexpected response format', json);
        }
      } catch (error) {
        console.error('Failed to fetch locations:', error);
      }
    };

    const fetchPackages = async () => {
      try {
        const res = await fetch('http://103.168.18.92/api/locationpackages/locations-with-packages'); // Replace with correct endpoint
        const json = await res.json();
        if (json.status && Array.isArray(json.data)) {
          // Set fallback for empty image URLs
          const sanitized = json.data.map((location: any) => ({
            ...location,
            packages: location.packages.map((pkg: any) => ({
              ...pkg,
              imageurl: pkg.imageurl || '/images/default.jpg',
            })),
          }));
          setLocationwisePackages(sanitized);
        } else {
          console.error('Unexpected package response format', json);
        }
      } catch (err) {
        console.error('Error fetching packages:', err);
      }
    };

    fetchLocations();
    fetchPackages();
  }, []);
     
    // Determine packages to show
  const displayedPackages = selectedLocationId ? filteredPackages : locationwisePackages;
  // const locationwisepackage = [
  //   {
  //       "location_id" : 1,
  //       "location_name" : "Dubai",
  //       "packages" : [
  //           {
  //           "package_id" : 1,
  //           "package_name" : "Dubai Highlights | Skyline and Sandscapes",
  //           "imageurl" : "/images/1.jpg",
  //           "duration_id" : 1,
  //           "actual_price" : "25999",
  //           "offer_price" : "22999",
  //           "rating" : 4.5
  //       },
  //       {
  //           "package_id" : 2,
  //           "package_name" : "Escape to Dubai | Flights Inclusive Deal",
  //           "imageurl" : "/images/2.jpg",
  //           "duration_id" : 1,
  //           "actual_price" : "65999",
  //           "offer_price" : "52999",
  //           "rating" : 4.5
  //       },
  //       {
  //           "package_id" : 3,
  //           "package_name" : "Discovering Dubai | A Journey to the Golden Emirates",
  //           "imageurl" : "/images/3.jpg",
  //           "duration_id" : 1,
  //           "actual_price" : "65999",
  //           "offer_price" : "52999",
  //           "rating" : 4.5
  //       },
  //       {
  //           "package_id" : 4,
  //           "package_name" : "Romantic Escape to Dubai | Love Amidst the Dunes",
  //           "imageurl" : "/images/4.jpg",
  //           "duration_id" : 1,
  //           "actual_price" : "65999",
  //           "offer_price" : "52999",
  //           "rating" : 4.5
  //       },
  //       {
  //         "package_id" : 5,
  //         "package_name" : "Dubai Highlights | Skyline and Sandscapes",
  //         "imageurl" : "/images/1.jpg",
  //         "duration_id" : 1,
  //         "actual_price" : "25999",
  //         "offer_price" : "22999",
  //         "rating" : 4.5
  //     },
  //     {
  //         "package_id" : 6,
  //         "package_name" : "Escape to Dubai | Flights Inclusive Deal",
  //         "imageurl" : "/images/2.jpg",
  //         "duration_id" : 1,
  //         "actual_price" : "65999",
  //         "offer_price" : "52999",
  //         "rating" : 4.5
  //     },
  //     {
  //         "package_id" : 7,
  //         "package_name" : "Discovering Dubai | A Journey to the Golden Emirates",
  //         "imageurl" : "/images/3.jpg",
  //         "duration_id" : 1,
  //         "actual_price" : "65999",
  //         "offer_price" : "52999",
  //         "rating" : 4.5
  //     },
  //     {
  //         "package_id" : 8,
  //         "package_name" : "Romantic Escape to Dubai | Love Amidst the Dunes",
  //         "imageurl" : "/images/4.jpg",
  //         "duration_id" : 1,
  //         "actual_price" : "65999",
  //         "offer_price" : "52999",
  //         "rating" : 4.5
  //     }
  //       ]
  //   },
  //   {
  //       "location_id" : 2,
  //       "location_name" : "Singapore",
  //       "packages" : [
  //           {
  //           "package_id" : 11,
  //           "package_name" : "Singapore and Bali Honeymoon Bliss | City Romance to Tropical Retreat",
  //           "imageurl" : "/images/14.jpg",
  //           "duration_id" : 1,
  //           "actual_price" : "25999",
  //           "offer_price" : "22999",
  //           "rating" : 4.5
  //       },
  //       {
  //           "package_id" : 12,
  //           "package_name" : "Best Of Singapore | FREE Universal Studio Tickets",
  //           "imageurl" : "/images/15.jpg",
  //           "duration_id" : 1,
  //           "actual_price" : "65999",
  //           "offer_price" : "52999",
  //           "rating" : 4.5
  //       },
  //       {
  //           "package_id" : 13,
  //           "package_name" : "Singapore & Malaysia Trip | FREE Night Safari Experience",
  //           "imageurl" : "/images/16.jpg",
  //           "duration_id" : 1,
  //           "actual_price" : "65999",
  //           "offer_price" : "52999",
  //           "rating" : 4.5
  //       },
  //       {
  //           "package_id" : 14,
  //           "package_name" : "Singapore Highlights | Group Tour Package",
  //           "imageurl" : "/images/17.jpg",
  //           "duration_id" : 1,
  //           "actual_price" : "65999",
  //           "offer_price" : "52999",    
  //           "rating" : 4.5
  //       }
  //       ]
  //   }
  // ];

  //activity list locationwise
  const locationwiseactivities = [
    {
        "location_id" : 1,
        "location_name" : "Dubai",
        "activities" : [
            {
            "activity_id" : 1,
            "activity_name" : "Museum of the Future Tickets, Dubai",
            "imageurl" : "/images/1.jpg",
            "duration" : "1 hour",
            "actual_price" : "4723",
            "offer_price" : "3774",
            "rating" : 4.7
        },
        {
            "activity_id" : 2,
            "activity_name" : "Burj Khalifa Tickets At the Top 124th 125th Floor",
            "imageurl" : "/images/2.jpg",
            "duration" : "1 hour to 2 hours",
            "actual_price" : "4723",
            "offer_price" : "3774",
            "rating" : 4.5
        },
        {
            "activity_id" : 3,
            "activity_name" : "Dubai Aquarium & Underwater Zoo Tickets",
            "imageurl" : "/images/3.jpg",
            "duration" : "5 hours",
            "actual_price" : "4723",
            "offer_price" : "3774",
            "rating" : 4.5
        },
        {
            "activity_id" : 4,
            "activity_name" : "Global Village Dubai Tickets",
            "imageurl" : "/images/4.jpg",
            "duration" : "5 hours to 6 hours",
            "actual_price" : "4723",
            "offer_price" : "3774",
            "rating" : 4.5
        },
        {
          "activity_id" : 5,
          "activity_name" : "The Green Planet Dubai Tickets",
          "imageurl" : "/images/1.jpg",
          "duration" : "8 hours",
          "actual_price" : "4723",
          "offer_price" : "3774",
          "rating" : 4.5
      },
     
        ]
    },
    {
        "location_id" : 2,
        "location_name" : "Singapore",
        "activities" : [
            {
            "activity_id" : 1,
            "activity_name" : "Universal Studios Singapore Tickets",
            "imageurl" : "/images/4.jpg",
            "duration" : "8 hours",
            "actual_price" : "5897",
            "offer_price" : "5373",
            "rating" : 4.5
        },
        {
            "activity_id" : 2,
            "activity_name" : "Gardens By The Bay Tickets, Singapore",
            "imageurl" : "/images/3.jpg",
            "duration" : "8 hours",
            "actual_price" : "5897",
            "offer_price" : "5373",
            "rating" : 4.5
        },
        {
            "activity_id" : 3,
            "activity_name" : "SEA Aquarium Singapore Tickets",
            "imageurl" : "/images/2.jpg",
            "duration" : "8 hours",
            "actual_price" : "5897",
            "offer_price" : "5373",
            "rating" : 4.5
        },
        {
            "activity_id" : 4,
            "activity_name" : "Marina Bay Sands Skypark Observation Deck Tickets, Singapore",
            "imageurl" : "/images/1.jpg",
            "duration" : "8 hours",
            "actual_price" : "5897",
            "offer_price" : "5373",   
            "rating" : 4.5
        },
        {
          "activity_id" : 5,
          "activity_name" : "Marina Bay Sands Skypark Observation Deck Tickets, Singapore",
          "imageurl" : "/images/2.jpg",
          "duration" : "8 hours",
          "actual_price" : "5897",
          "offer_price" : "5373",   
          "rating" : 4.5
      },
      {
        "activity_id" : 6,
        "activity_name" : "Marina Bay Sands Skypark Observation Deck Tickets, Singapore",
        "imageurl" : "/images/3.jpg",
        "duration" : "8 hours",
        "actual_price" : "5897",
        "offer_price" : "5373",   
        "rating" : 4.5
    }
        ]
    }
  ];
  return (
    <>
     <Navbar />
     <HorizontalScroll locations={locations} onLocationClick={handleLocationClick}/>
     <Tabs onTabChange={handleTabChange} />
     {selectedTabValue === 0 && (
        <div>
          {loadingPackages ? (
            <p>Loading packages...</p>
          ) : (
            displayedPackages.length > 0 ? (
              displayedPackages.map(location => (
                <LocationPackageCarousel key={location.location_id} location={location} />
              ))
            ) : (
              <p>No packages found.</p>
            )
          )}
        </div>
      )}

    {selectedTabValue === 1 && (
      <div>
        {locationwiseactivities.map((location) => (
        <LocationActivityCarousel key={location.location_id} location={location} />
      ))}
      </div>
    )}
     <Footer />

    </>
  );
}
