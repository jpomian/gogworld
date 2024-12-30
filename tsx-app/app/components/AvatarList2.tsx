'use client';

import Sidebar from "./Sidebar";
import { AvatarData, Avatar } from "../lib/getAvatars";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import DropdownMenu from "./Dropdown";

interface AvatarListProps {
  avatarData: AvatarData;
}

export default function AvatarList2({ avatarData }: AvatarListProps) {
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({});
  const [filteredAvatars, setFilteredAvatars] = useState<Avatar[]>(avatarData.avatars);
  const [currentPage, setCurrentPage] = useState(1);
  const [avatarsPerPage, setAvatarsPerPage] = useState(20);
  const pageSettings = [20, 40, 60, 80];

  const handleFilterChange = (traitType: string, value: string) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      if (!newFilters[traitType]) {
        newFilters[traitType] = [];
      }
      const index = newFilters[traitType].indexOf(value);
      if (index > -1) {
        newFilters[traitType].splice(index, 1);
      } else {
        newFilters[traitType].push(value);
      }
      if (newFilters[traitType].length === 0) {
        delete newFilters[traitType];
      }
      return newFilters;
    });
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newAvatarsPerPage = parseInt(event.target.value, 10);
    setAvatarsPerPage(newAvatarsPerPage);
    setCurrentPage(1);
  };

  useEffect(() => {
    const newFilteredAvatars = avatarData.avatars.filter((avatar) => {
      return Object.entries(selectedFilters).every(([traitType, values]) => {
        if (values.length === 0) return true;
        const avatarValue = avatar.attributes.find((attr) => attr.trait_type === traitType)?.value;
        return values.includes(avatarValue || "");
      });
    });
    setFilteredAvatars(newFilteredAvatars);
    setCurrentPage(1);
  }, [selectedFilters, avatarData.avatars]);

  const indexOfLastAvatar = currentPage * avatarsPerPage;
  const indexOfFirstAvatar = indexOfLastAvatar - avatarsPerPage;
  const currentAvatars = filteredAvatars.slice(indexOfFirstAvatar, indexOfLastAvatar);

  const renderPagination = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(filteredAvatars.length / avatarsPerPage);
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`mr-5 p-4 cursor-pointer ${
            currentPage === i ? "bg-slate-700 text-white" : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-col md:flex-row">
      <Sidebar
        attributes={avatarData.attributes}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />
      <div className="flex-1 p-4">
        <div className="mb-4">
          <DropdownMenu
            avatarsPerPage={avatarsPerPage}
            pageSettings={pageSettings}
            onDropdownChange={handleDropdownChange}
          />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {currentAvatars.map((avatar) => (
            <li
              key={avatar.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={avatar.image}
                alt={avatar.name}
                width={200}
                height={200}
                className="w-full h-auto object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1 rounded">
                #{avatar.id}
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center mt-8">
          {currentPage > 1 && (
            <button
              className="mr-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          )}
          {renderPagination()}
          {currentPage < Math.ceil(filteredAvatars.length / avatarsPerPage) && (
            <button
              className="ml-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

