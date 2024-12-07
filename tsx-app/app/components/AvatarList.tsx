'use client'

import Image from 'next/image'
import { Avatar } from '../lib/getAvatars'

interface AvatarListProps {
  avatars: Avatar[]
}

export default function AvatarList({ avatars }: AvatarListProps) {
  // Function to extract numbers from a string
  const extractNumbers = (str: string): string => {
    return str.replace(/\D/g, ''); // Remove all non-digit characters
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-8">
      {avatars.map((avatar) => {
        const extractedNumber = extractNumbers(avatar.name);
        return (
          <li key={avatar.id} className="bg-white rounded-lg shadow-md overflow-hidden relative">
            <Image
              src={avatar.image}
              alt={avatar.name}
              width={200}
              height={200}
              className="w-full h-auto"
            />
            {extractedNumber && (
              <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded">
                {'#' + extractedNumber}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
