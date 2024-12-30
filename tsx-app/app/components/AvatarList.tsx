"use client";

import Modal from "./Modal";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Avatar } from "../lib/getAvatars";
import DropdownMenu from "./Dropdown";

interface AvatarListProps {
  avatars: Avatar[];
}

export default function AvatarList({ avatars }: AvatarListProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [avatarsPerPage, setAvatarsPerPage] = useState(20);
  const pageSettings = [20, 40, 60, 80];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const handleAvatarClick = (avatar: Avatar) => {
    setSelectedAvatar(avatar);
  };

  const handleCloseModal = () => {
    setSelectedAvatar(null);
  };

  const extractNumbers = (str: string): number | null => {
    const numbers = str.match(/\d+/g);
    return numbers ? parseInt(numbers[0], 10) : null;
  };

  // Pagination Logic

  const indexOfLastAvatar = currentPage * avatarsPerPage;
  const indexOfFirstAvatar = indexOfLastAvatar - avatarsPerPage;
  const currentAvatars = avatars.slice(indexOfFirstAvatar, indexOfLastAvatar);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const renderPagination = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(avatars.length / avatarsPerPage);

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mr-5 p-4 cursor-pointer ${
              currentPage === i ? "bg-slate-700" : ""
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push(
          <span key={i} className="mr-5">
            ...
          </span>
        );
      }
    }

    return pageNumbers;
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newAvatarsPerPage = parseInt(event.target.value, 10);
    const firstAvatarIndex = (currentPage - 1) * avatarsPerPage;
    const newCurrentPage = Math.ceil(
      (firstAvatarIndex + 1) / newAvatarsPerPage
    );
    setAvatarsPerPage(newAvatarsPerPage);
    setCurrentPage(newCurrentPage); // Update current page based on the first avatar index
  };
  return (
    <>
       <DropdownMenu
          avatarsPerPage={avatarsPerPage}
          pageSettings={pageSettings}
          onDropdownChange={handleDropdownChange}
        />

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-8">
        {currentAvatars.map((avatar) => {
          const extractedNumber = extractNumbers(avatar.name);
          return (
            <li
              key={avatar.id}
              className="bg-white rounded-lg shadow-md overflow-hidden relative border-solid border-2 border-black hover:scale-110"
              onClick={() => handleAvatarClick(avatar)}
            >
              <Image
                src={avatar.image}
                alt={avatar.name}
                width={200}
                height={200}
                className="w-full h-auto"
              />
              {extractedNumber && (
                <div className="absolute top-2 right-2 bg-black bg-opacity-30 text-white p-1 rounded">
                  {"#" + extractedNumber}
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <div className="flex items-center justify-center p-4">
        {currentPage > 1 && (
          <p
            className="mr-4 cursor-pointer font-semibold"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Back
          </p>
        )}
        {renderPagination()}
        {currentPage < Math.ceil(avatars.length / avatarsPerPage) && (
          <p
            className="mr-4 cursor-pointer font-semibold"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </p>
        )}
      </div>

      {selectedAvatar && (
        <Modal avatar={selectedAvatar} onClose={handleCloseModal} />
      )}
    </>
  );
}
