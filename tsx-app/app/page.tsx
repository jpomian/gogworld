import Link from 'next/link';
import Image from 'next/image';
import { User, Bolt, ChartSpline } from 'lucide-react';
import { Markazi_Text  } from 'next/font/google'

const medievalFont = Markazi_Text({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default async function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <main className="container mx-auto text-center">
        <p className={`flex justify-center items-center text-8xl font-bold ${medievalFont.className}`}>
          GoG
          <Image
            src="/gem-blue.png"
            width={60}
            height={60}
            alt="Gem Blue"
            className='mx-2 mt-3'
          />
          World
        </p>
        <h1 className="text-3xl p-10">Explore any of the <b>10.000 NFTs</b> with no bounds.</h1>
        <div className='mt-10 flex justify-center space-x-4'>
          <Link 
            href="/results" 
            className="text-2xl font-semibold px-6 py-3 mx-3 bg-blue-500 text-white rounded-lg transition-all duration-300 hover:bg-blue-900 hover:shadow-lg hover:scale-105 flex items-center justify-center"
          >
            <Bolt className="mr-2" />
            GoG Avatars
          </Link>
          <Link 
            href="/wip" 
            className="text-2xl font-semibold px-6 py-3 bg-blue-500 text-white rounded-lg transition-all duration-300 hover:bg-blue-900 hover:shadow-lg hover:scale-105 flex items-center justify-center"
          >
            <ChartSpline className="mr-2" />
            Game Leaderboards
          </Link>
        </div>
      </main>
    </div>
  );
}


