// // // components/ImageGrid.tsx
// // import React from "react";

// // interface ImageProps {
// //   imageUrl: string;
// //   tag: string;
// // }

// // const ImageGrid: React.FC = () => {
// //   return (
// //     <div className="flex flex-col sm:flex-row gap-2 w-full px-6">
// //       {/* First part: Cover image */}
// //       <div className="relative w-full sm:w-3/5 h-80 sm:h-96 bg-cover bg-center rounded-lg" style={{ backgroundImage: 'url("/images/1.jpg")' }}>
// //         {/* Tag for the cover image */}
// //       </div>

// //       {/* Second part: 4 smaller images */}
// //       <div className="grid grid-cols-2 grid-rows-2 gap-2 w-full sm:w-2/5">
// //         <ImageWithTag imageUrl="/images/2.jpg" tag="Tag 1" />
// //         <ImageWithTag imageUrl="/images/3.jpg" tag="Tag 2" />
// //         <ImageWithTag imageUrl="/images/4.jpg" tag="Tag 3" />
// //         <ImageWithTag imageUrl="/images/5.jpg" tag="Tag 4" />
// //       </div>
// //     </div>
// //   );
// // };

// // const ImageWithTag: React.FC<ImageProps> = ({ imageUrl, tag }) => {
// //   return (
// //     <div className="relative w-full h-full">
// //       <div
// //         className="w-full h-full bg-cover bg-center rounded-lg"
// //         style={{ backgroundImage: `url(${imageUrl})` }}
// //       />
// //       <div className="absolute bottom-2 left-2 bg-black text-white text-xs py-1 px-2 rounded">
// //         {tag}
// //       </div>
// //     </div>
// //   );
// // };

// import React from 'react';

// const ImageGrid: React.FC = () => {
//   const images = [
//     '/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg'
//   ];

//   const tags = ['Stay', 'Sightseeing', 'Activities', 'More'];

//   return (
//     <div className="flex flex-col md:flex-row gap-2 h-96"> {/* Increased height here */}
//       {/* Cover Image - takes 50% of the width on medium and larger screens */}
//       <div className="md:w-1/2 w-full h-full bg-cover bg-center rounded-lg" style={{ backgroundImage: `url('/images/1.jpg')` }}>
//         {/* Cover image */}
//       </div>

//       {/* Image Grid - 4 images (2 horizontal and 2 vertical) */}
//       <div className="md:w-1/2 w-full grid grid-cols-2 gap-2 h-full"> {/* Decreased gap here and set height to full */}
//         {images.map((image, index) => (
//           <div
//             key={index}
//             className="relative h-full bg-cover bg-center rounded-lg"
//             style={{ backgroundImage: `url(${image})` }}
//           >
//             {/* Tag - Positioned at the bottom left corner */}
//             <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs py-1 px-2 rounded-md">
//               {tags[index]}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageGrid;



// // export default ImageGrid;

'use client';
import React from 'react';
import Image from 'next/image';

const ImageGrid: React.FC = () => {
  const images = [
    '/images/1.jpg', '/images/2.jpg', '/images/3.jpg', '/images/4.jpg'
  ];

  const tags = ['Stay', 'Sightseeing', 'Activities', 'More'];

  return (
    <div className="flex flex-col md:flex-row gap-2 h-96">
      {/* Cover Image */}
      <div className="relative md:w-1/2 w-full h-full rounded-lg overflow-hidden">
        <Image
          src="/images/1.jpg"
          alt="Cover"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* Grid of 4 images */}
      <div className="md:w-1/2 w-full grid grid-cols-2 gap-2 h-full">
        {images.map((image, index) => (
          <div key={index} className="relative h-full rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={tags[index]}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white text-xs py-1 px-2 rounded-md">
              {tags[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;