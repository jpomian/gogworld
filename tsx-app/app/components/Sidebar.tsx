import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SidebarProps {
  attributes: { [key: string]: Set<string> };
  selectedFilters: { [key: string]: string[] };
  onFilterChange: (traitType: string, value: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ attributes, selectedFilters, onFilterChange }) => {
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  const toggleDropdown = (traitType: string) => {
    setOpenDropdowns(prev => ({ ...prev, [traitType]: !prev[traitType] }));
  };

  return (
    <div className="w-1/2 shadow-md p-4 overflow-y-auto h-screen">
      <h2 className="text-xl font-semibold mb-4">Filters</h2>
      {Object.entries(attributes).map(([traitType, values]) => (
        <div key={traitType} className="mb-4">
          <button
            className="flex justify-between items-center w-full text-lg font-medium mb-2 focus:outline-none"
            onClick={() => toggleDropdown(traitType)}
          >
            <h3>{traitType}</h3>
            {openDropdowns[traitType] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          {openDropdowns[traitType] && (
            <div className="pl-4">
              {Array.from(values).map((value) => (
                <label key={value} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={selectedFilters[traitType]?.includes(value)}
                    onChange={() => onFilterChange(traitType, value)}
                  />
                  {value}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
