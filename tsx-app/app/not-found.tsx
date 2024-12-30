import Navbar from './components/Navbar'
import Link from 'next/link'


export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-24">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-6rem)]">
          <h1 className="text-6xl mb-4 text-yellow-500">404</h1>
          <div className="border-t border-b border-yellow-500 py-4 px-6 mb-8">
            <p className="text-lg text-center">The page you seek is lost in the mists of fates.</p>
          </div>
          <Link href="/" className="text-2xl bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg hover:bg-yellow-400 transition-colors duration-300">
            Return to Camp
          </Link>
        </div>
      </div>
    </div>
  )
}
