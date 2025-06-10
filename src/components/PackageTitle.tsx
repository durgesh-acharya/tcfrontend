// components/PackageTitle.tsx
import React from 'react';

interface PackageTitleProps {
  title: string;
}

const PackageTitle: React.FC<PackageTitleProps> = ({ title }) => {
  return (
    <h1 className="text-black text-2xl font-bold m-2">{title}</h1>
    
  );
};

export default PackageTitle;
