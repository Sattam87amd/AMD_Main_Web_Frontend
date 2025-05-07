import React, { useState } from 'react';
import { X } from 'lucide-react';

// Add CSS to hide scrollbars
const scrollbarHideStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

const ScrollableTags = () => {
  const topics = [
    "Startups", "Fundraising", "Early Stage Marketing", "Marketing & Growth", 
    "Scaling", "Product", "Company Culture", "E-Commerce",
    "Sales & Business Development", "Operation",
    "Home", "Wellness",
    "Sales & Business Development", "Operations"
  ];
  
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [unselectedTopics, setUnselectedTopics] = useState([...topics]);

  const handleSelect = (topic) => {
    if (!selectedTopics.includes(topic)) {
      setSelectedTopics([...selectedTopics, topic]);
      setUnselectedTopics(unselectedTopics.filter(t => t !== topic));
    }
  };

  const handleRemove = (topic) => {
    setSelectedTopics(selectedTopics.filter(t => t !== topic));
    setUnselectedTopics([...unselectedTopics, topic]);
  };

  return (
    <div className="w-full">
      <style>{scrollbarHideStyles}</style>
      {/* All topics in a single row */}
      <div className="flex overflow-x-auto py-2 space-x-2 scrollbar-hide">
        {selectedTopics.map((topic, index) => (
          <div key={`selected-${index}`} className="flex-shrink-0">
            <div className="relative flex items-center px-4 py-2 rounded-full bg-black text-white text-sm">
              {topic}
              <button
                onClick={() => handleRemove(topic)}
                className="ml-2 flex items-center justify-center w-5 h-5 bg-gray-800 rounded-full"
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          </div>
        ))}
        {unselectedTopics.map((topic, index) => (
          <button
            key={`unselected-${index}`}
            className="flex-shrink-0 px-4 py-2 text-sm rounded-full border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
            onClick={() => handleSelect(topic)}
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollableTags;