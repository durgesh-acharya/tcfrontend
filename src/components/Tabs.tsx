import React, { useState } from 'react';

interface TabsProps {
  onTabChange: (value: number) => void; // Callback to send value to parent
}

const Tabs: React.FC<TabsProps> = ({ onTabChange }) => {
  const [selectedTab, setSelectedTab] = useState<'tours' | 'activity'>('tours');

  const handleTabChange = (tab: 'tours' | 'activity') => {
    setSelectedTab(tab);
    // Pass the corresponding value (0 for tours, 1 for activity)
    onTabChange(tab === 'tours' ? 0 : 1);
  };

  return (
    <div className="flex justify-center">
      <div className="flex border-2 border-black rounded-xl overflow-hidden">
        {/* Tours Tab */}
        <button
          onClick={() => handleTabChange('tours')}
          className={`${
            selectedTab === 'tours' ? 'bg-black text-white' : 'bg-white text-black border-r-2'
          } py-2 px-6 text-lg font-semibold transition duration-300`}
        >
          Tours
        </button>

        {/* Activity Tab */}
        <button
          onClick={() => handleTabChange('activity')}
          className={`${
            selectedTab === 'activity' ? 'bg-black text-white' : 'bg-white text-black'
          } py-2 px-6 text-lg font-semibold transition duration-300`}
        >
          Activity
        </button>
      </div>
    </div>
  );
};

export default Tabs;
