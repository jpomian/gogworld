'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Markazi_Text  } from 'next/font/google'

const medievalFont = Markazi_Text({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-zinc-800 text-white shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center items-center h-20">
          <Link href="/" className={`flex items-center text-5xl font-bold ${medievalFont.className}`}>
            GoG
            <Image
              src="/gem-blue.png"
              width={35}
              height={35}
              alt="Gem Blue"
              className='mx-2 mt-3'
            />
            World
          </Link>
        </div>
      </div>
    </nav>
  );
}

