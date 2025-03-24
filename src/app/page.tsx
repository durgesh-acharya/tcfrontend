"use client";
import React, {useState} from 'react';
import Navbar from '@/components/Navbar';
import HorizontalScroll from '@/components/HorizontalScroll';
import Tabs from '@/components/Tabs';
import LocationPackageCarousel from '@/components/LocationPackageCarousel'; 
import LocationActivityCarousel from '@/components/LocationActivityCarousel';
import Footer from '@/components/Footer';


export default function Home() {
      //handel tab changes
      const [selectedTabValue, setSelectedTabValue] = useState<number>(0); // Default to tours (0)

      // Handle the tab change by setting the value from the child component
      const handleTabChange = (value: number) => {
        setSelectedTabValue(value);
      };
  //list of locations for horizontal scrrol
  const locations = [
    {
      imageUrl: '/images/1.jpg',
      locationName: 'New York',
    },
    {
      imageUrl: '/images/2.jpg',
      locationName: 'Paris',
    },
    {
      imageUrl: '/images/3.jpg',
      locationName: 'Tokyo',
    },
    {
        imageUrl: '/images/1.jpg',
        locationName: 'New York',
      },
      {
        imageUrl: '/images/2.jpg',
        locationName: 'Paris',
      },
      {
        imageUrl: '/images/3.jpg',
        locationName: 'Tokyo',
      },
      {
        imageUrl: '/images/1.jpg',
        locationName: 'New York',
      },
      {
        imageUrl: '/images/2.jpg',
        locationName: 'Paris',
      },
      {
        imageUrl: '/images/3.jpg',
        locationName: 'Tokyo',
      },
      {
        imageUrl: '/images/1.jpg',
        locationName: 'New York',
      },
      {
        imageUrl: '/images/2.jpg',
        locationName: 'Paris',
      },
      {
        imageUrl: '/images/3.jpg',
        locationName: 'Tokyo',
      },
      {
          imageUrl: '/images/1.jpg',
          locationName: 'New York',
        },
        {
          imageUrl: '/images/2.jpg',
          locationName: 'Paris',
        },
        {
          imageUrl: '/images/3.jpg',
          locationName: 'Tokyo',
        },
        {
          imageUrl: '/images/1.jpg',
          locationName: 'New York',
        },
        {
          imageUrl: '/images/2.jpg',
          locationName: 'Paris',
        },
        {
          imageUrl: '/images/3.jpg',
          locationName: 'Tokyo',
        },
    // Add more locations as needed
  ];
  const locationwisepackage = [
    {
        "location_id" : 1,
        "location_name" : "Dubai",
        "packages" : [
            {
            "package_id" : 1,
            "package_name" : "Dubai Highlights | Skyline and Sandscapes",
            "imageurl" : "/images/1.jpg",
            "duration_id" : 1,
            "actual_price" : "25999",
            "offer_price" : "22999",
            "rating" : 4.5
        },
        {
            "package_id" : 2,
            "package_name" : "Escape to Dubai | Flights Inclusive Deal",
            "imageurl" : "/images/2.jpg",
            "duration_id" : 1,
            "actual_price" : "65999",
            "offer_price" : "52999",
            "rating" : 4.5
        },
        {
            "package_id" : 3,
            "package_name" : "Discovering Dubai | A Journey to the Golden Emirates",
            "imageurl" : "/images/3.jpg",
            "duration_id" : 1,
            "actual_price" : "65999",
            "offer_price" : "52999",
            "rating" : 4.5
        },
        {
            "package_id" : 4,
            "package_name" : "Romantic Escape to Dubai | Love Amidst the Dunes",
            "imageurl" : "/images/4.jpg",
            "duration_id" : 1,
            "actual_price" : "65999",
            "offer_price" : "52999",
            "rating" : 4.5
        },
        {
          "package_id" : 5,
          "package_name" : "Dubai Highlights | Skyline and Sandscapes",
          "imageurl" : "/images/1.jpg",
          "duration_id" : 1,
          "actual_price" : "25999",
          "offer_price" : "22999",
          "rating" : 4.5
      },
      {
          "package_id" : 6,
          "package_name" : "Escape to Dubai | Flights Inclusive Deal",
          "imageurl" : "/images/2.jpg",
          "duration_id" : 1,
          "actual_price" : "65999",
          "offer_price" : "52999",
          "rating" : 4.5
      },
      {
          "package_id" : 7,
          "package_name" : "Discovering Dubai | A Journey to the Golden Emirates",
          "imageurl" : "/images/3.jpg",
          "duration_id" : 1,
          "actual_price" : "65999",
          "offer_price" : "52999",
          "rating" : 4.5
      },
      {
          "package_id" : 8,
          "package_name" : "Romantic Escape to Dubai | Love Amidst the Dunes",
          "imageurl" : "/images/4.jpg",
          "duration_id" : 1,
          "actual_price" : "65999",
          "offer_price" : "52999",
          "rating" : 4.5
      }
        ]
    },
    {
        "location_id" : 2,
        "location_name" : "Singapore",
        "packages" : [
            {
            "package_id" : 1,
            "package_name" : "Singapore and Bali Honeymoon Bliss | City Romance to Tropical Retreat",
            "imageurl" : "/images/14.jpg",
            "duration_id" : 1,
            "actual_price" : "25999",
            "offer_price" : "22999",
            "rating" : 4.5
        },
        {
            "package_id" : 2,
            "package_name" : "Best Of Singapore | FREE Universal Studio Tickets",
            "imageurl" : "/images/15.jpg",
            "duration_id" : 1,
            "actual_price" : "65999",
            "offer_price" : "52999",
            "rating" : 4.5
        },
        {
            "package_id" : 3,
            "package_name" : "Singapore & Malaysia Trip | FREE Night Safari Experience",
            "imageurl" : "/images/16.jpg",
            "duration_id" : 1,
            "actual_price" : "65999",
            "offer_price" : "52999",
            "rating" : 4.5
        },
        {
            "package_id" : 4,
            "package_name" : "Singapore Highlights | Group Tour Package",
            "imageurl" : "/images/17.jpg",
            "duration_id" : 1,
            "actual_price" : "65999",
            "offer_price" : "52999",    
            "rating" : 4.5
        }
        ]
    }
  ];

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
     <HorizontalScroll locations={locations}/>
     <Tabs onTabChange={handleTabChange} />
     {selectedTabValue === 0 &&   <div>
      {locationwisepackage.map((location) => (
        <LocationPackageCarousel key={location.location_id} location={location} />
      ))}
    </div>}
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
