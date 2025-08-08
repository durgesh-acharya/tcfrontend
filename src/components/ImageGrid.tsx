'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
interface ImageItem {
  url: string;
  category: number;
}

interface ImageGridProps {
  images: ImageItem[];
  packageId: number | null;
  categoryId: number | null;
}

const ImageGrid: React.FC<ImageGridProps> = ({ images,packageId, categoryId }) => {
  const tags = ['Stay', 'Sightseeing', 'Activities', 'More'];

  // Group images by category
  const groupedByCategory: Record<number, ImageItem[]> = images.reduce((acc, img) => {
    if (!acc[img.category]) acc[img.category] = [];
    acc[img.category].push(img);
    return acc;
  }, {} as Record<number, ImageItem[]>);

  // Get images for each slot
  const moreImages = groupedByCategory[1] || [];
  const coverImage = moreImages[0];     // First "More" image — used as cover (no tag)
  const secondMoreImage = moreImages[1]; // Second "More" image — used in grid with tag

  const stayImage = groupedByCategory[2]?.[0];
  const sightseeingImage = groupedByCategory[3]?.[0];
  const activitiesImage = groupedByCategory[4]?.[0];

  const gridImages = [
    { image: stayImage, tag: tags[0] },        // Top-left
    { image: sightseeingImage, tag: tags[1] }, // Top-right
    { image: activitiesImage, tag: tags[2] },  // Bottom-left
    { image: secondMoreImage, tag: tags[3] },  // Bottom-right — 2nd More image
  ];

  return (
    <div className="flex flex-col md:flex-row gap-2 h-96">
      {/* Left Cover: First "More" image without tag */}
      <div className="relative md:w-1/2 w-full h-full rounded-lg overflow-hidden">
        {coverImage && (
          <Image
            src={`http://103.168.18.92${coverImage.url}`}
            alt="Cover image"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        )}
      </div>

      {/* Right Grid: 2x2 */}
      <div className="md:w-1/2 w-full grid grid-cols-2 gap-2 h-full">
        {gridImages.map(({ image, tag }, idx) => (
         
          <div key={idx} className="relative h-full rounded-lg overflow-hidden">
            {image ? (
              
              <Link passHref legacyBehavior href={`/explorepic?packageId=${packageId ?? ''}&categoryId=${categoryId ?? ''}`} className="block w-full h-full">
                <a target="_blank" rel="noopener noreferrer" className="block w-full h-full">
              <div className="w-full h-full relative">
                <Image
                  src={`http://103.168.18.92${image.url}`}
                  alt={tag}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs py-1 px-2 rounded-md">
                  {tag}
                </div>
              </div>
              </a>
            </Link>
            ) : (
              <div className="bg-gray-200 w-full h-full flex items-center justify-center text-sm text-gray-500">
                No Image
              </div>
            )}
          </div>
        
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
