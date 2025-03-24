"use client";
import React from 'react';
import Navbar from '@/components/Navbar';
import HorizontalScroll from '@/components/HorizontalScroll';
export default function Home() {
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
  return (
    <>
     <Navbar />
     <HorizontalScroll locations={locations}/>
    </>
  );
}
