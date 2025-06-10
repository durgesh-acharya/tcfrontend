// components/IncludedTags.tsx
import React from 'react';

interface IncludedTagsProps {
  items: string[];
}

const IncludedTags: React.FC<IncludedTagsProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap space-x-4 p-2 m-2">
      {items.map((item, index) => (
        <li key={index} className="flex items-center mt-2">
        <span className="mr-2 text-green-500">✔️</span>
        {item}
      </li>
      ))}
    </div>
  );
};

export default IncludedTags;
