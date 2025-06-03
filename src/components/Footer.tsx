import React from 'react';
import Image from 'next/image';
import Link from 'next/link'
const Footer: React.FC = () => {
  return (
    <footer className="relative w-full bg-black py-10 mt-24">
      {/* Full width background */}
      <div className="absolute inset-0 bg-black z-10"></div>

      {/* Centered white box */}
      <div className="relative z-20 flex justify-center -mt-20 ">
        <div className="bg-white p-10 w-11/12 md:w-9/12 lg:w-9/12 xl:w-9/12 shadow-lg rounded-lg border border-gray-300">
          {/* Content inside the white box */}
          <div className="flex justify-between space-x-6">
            {/* Column 1 */}
            <div className="flex-1">
              <h4 className="text-md font-bold text-gray-700">About TravelersClan</h4>
              <p className="text-sm text-gray-600 mt-1">About Us</p>
              <p className="text-sm text-gray-600 mt-1">We are Hiring</p>
              <p className="text-sm text-gray-600 mt-1">Reviews</p>
              <Link href={"/blogs"} className="text-sm text-gray-600 mt-1">Blogs</Link>
              <p className="text-sm text-gray-600 mt-1">Terms & Conditions</p>
              <p className="text-sm text-gray-600 mt-1">Privacy Policies</p>
              <p className="text-sm text-gray-600 mt-1">Supports</p>
              <p className="text-sm text-red-800 mt-1">Beware of Frauds</p>
            </div>

            {/* Divider */}
            <div className="border-r border-gray-300 mx-6"></div>

            {/* Column 2 */}
            <div className="flex-1">
              <h4 className="text-md font-bold text-gray-700">For Suppliers</h4>
              <p className="text-sm text-gray-600 mt-1">List Your Activities</p>
              <h4 className="text-md font-bold text-gray-700 mt-2">For Brands</h4>
              <p className="text-sm text-gray-600 mt-1">Partner With Us</p>
              <p className="text-sm text-gray-600 mt-1">Destination Marketing</p>
            </div>

            {/* Divider */}
            <div className="border-r border-gray-300 mx-6"></div>

            {/* Column 3 */}
            <div className="flex-1">
            <h4 className="text-md font-bold text-gray-700">For Travellers</h4>
              <p className="text-sm text-gray-600 mt-1">Gift an Experience</p>
            </div>
          </div>
          <hr className="my-4 border-gray-300 ml-6 mr-6 mt-6" />
           {/* Social svg */}
           <div className="mt-8 flex justify-center space-x-6">
            {/* Instagram Icon (SVG) */}
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <Image src="/svg/facebook.svg" alt="Facebook" className="w-6 h-6" width={100} height={100} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <Image src="/svg/youtube.svg" alt="Twitter" className="w-6 h-6" width={100} height={100} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <Image src="/svg/insta.svg" alt="Instagram" className="w-6 h-6" width={100} height={100}/>
      </a>
       <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <Image src="/svg/linkedin.svg" alt="Instagram" className="w-6 h-6" width={100} height={100} />
      </a>
          </div>
        </div>
       
      </div>
    </footer>
  );
};

export default Footer;
