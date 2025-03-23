import React from 'react';
import SearchInput from './SearchInput';
import Image from 'next/image'; // Import the Image component
const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-300">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      
      {/* Left Side: Logo only */}
      <div className="flex items-center">
        {/* Logo with larger size */}
        <Image
          src="/images/logo.png" // Replace with your logo path
          alt="Logo"
          width={150} // Adjust to a larger size
          height={60} // Adjust to a larger size
          className="object-contain"
        />
      </div>
      
      {/* Center: Search Bar */}
      <div className="flex flex-1 justify-center hidden sm:block">
        <SearchInput />
      </div>
     
      {/* Right Side: Currency Selector and Login */}
      <div className="flex items-center space-x-4">
        {/* Login Link */}
        <a href="/login" className="text-black hover:underline">
          Login
        </a>
      </div>
    </div>
  </nav>
  );
};

export default Navbar;
