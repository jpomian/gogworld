import Link from "next/link";
import Navbar from "../components/Navbar";

export default async function Search() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Navbar />
      <main className="container mx-auto text-center">
        <h1 className="text-3xl p-10">Select optional filters to narrow search results</h1>
        <Link href='../results'
          className='text-2xl font-semibold px-4 py-3 bg-blue-500 text-white rounded-lg transition-all duration-300 hover:bg-blue-900 hover:shadow-lg hover:scale-105 flex items-center justify-center'>
            Search
        </Link>
      </main>
    </div>
  );
}