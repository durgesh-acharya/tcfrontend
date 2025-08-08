'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface ImageItem {
  id: number;
  url: string;
  category: number;
}

const TABS = [
  { label: 'All Images', key: 'all' },
  { label: 'Destination', key: '1' },
  { label: 'Stay', key: '2' },
  { label: 'Sightseeing', key: '3' },
  { label: 'Activity', key: '4' },
];

const ExplorePicComponent: React.FC = () => {
  const searchParams = useSearchParams();
  const packageId = searchParams.get('packageId');
  const categoryIdParam = searchParams.get('categoryId');

  const [images, setImages] = useState<ImageItem[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!packageId) return;

    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://103.168.18.92/api/packageimages/by-package/${packageId}`
        );
        const data = await res.json();

        const mapped: ImageItem[] = (data?.data || []).map((item: any) => ({
          id: item.packageimages_id,
          url: item.packageimages_url,
          category: item.packageimages_category,
        }));

        setImages(mapped);
      } catch (err) {
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [packageId]);

  useEffect(() => {
    if (categoryIdParam && TABS.find((tab) => tab.key === categoryIdParam)) {
      setActiveTab(categoryIdParam);
    }
  }, [categoryIdParam]);

  const filteredImages =
    activeTab === 'all'
      ? images
      : images.filter((img) => img.category === parseInt(activeTab));

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Explore Images</h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-3 mb-6 border-b pb-2">
        <span className="font-medium text-gray-700">Filter:</span>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-1 rounded-full text-sm border transition-colors duration-200 ${
              activeTab === tab.key
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400 hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Image Grid */}
      {loading ? (
        <p className="text-gray-500">Loading images...</p>
      ) : filteredImages.length === 0 ? (
        <p className="text-gray-500">No images found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={`http://103.168.18.92${img.url}`}
                  alt={`Image ${img.id}`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Exported with Suspense wrapper
export default function ExplorePicPage() {
  return (
    <Suspense fallback={<div className="p-6 text-gray-500">Loading pictures...</div>}>
      <ExplorePicComponent />
    </Suspense>
  );
}
