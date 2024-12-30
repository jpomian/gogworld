'use client';

import Spinner from "./Spinner";
import Image from "next/image";
import { Avatar } from "../lib/getAvatars";
import { useState } from 'react';
import { useRouter } from 'next/navigation'

interface ImageProps {
    avatar: Avatar | null;
}


const AvatarImage = ({ avatar }: ImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter()

    if (!avatar) return null;

    return (
        <div className="w-1/2 rounded-lg shadow-md overflow-hidden relative border-solid border-2 border-zinc-700 cursor-pointer">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Spinner />
            </div>
          )}
          <Image
            src={avatar.image}
            alt={avatar.name}
            width={300}
            height={300}
            onLoad={() => setIsLoading(false)}
            onClick={() => router.push(`avatars/${avatar.id}`)}
            className={`w-full h-auto transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>
    )

}

export default AvatarImage;