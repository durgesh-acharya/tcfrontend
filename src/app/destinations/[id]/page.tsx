/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import DestinationPackage from '@/components/DestinationPackage'; // adjust path as needed

interface Package {
  package_id: number;
  package_name: string;
  imageurl: string;
  duration_id: number;
  actual_price: string;
  offer_price: string;
  destinationroute_id: number;
  staycategories_id: number;
  rating: number;
  duration_tags: string;
}

interface Location {
  location_id: number;
  location_name: string;
  packages: Package[];
}

const Destination = () => {
  const params = useParams();
  const { id } = params as { id: string };

  const [locationData, setLocationData] = useState<Location | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPackages = async () => {
      try {
        const res = await fetch(`http://103.168.18.92/api/locationpackages/locationwithpackages/${id}`);
        const json = await res.json();
        if (json.status && json.data) {
          setLocationData(json.data);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
      }
    };

    fetchPackages();
  }, [id]);

  return (
    <>
      <Navbar />
      {locationData && (
      <DestinationPackage location={locationData} />
      )}
    </>
  );
};

export default Destination;
