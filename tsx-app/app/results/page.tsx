import { getAvatars } from '../lib/getAvatars'
import AvatarList from '../components/AvatarList'
import Link from 'next/link'
import Navbar from '../components/Navbar'


export default async function Home() {
  const { avatars, count } = await getAvatars()

  return (
    <main className="container mx-auto">
      <Navbar />
      <div className='h-10'></div>
      <h1 className="text-l text-center font-extralight font-mono text-gray-400 mt-10">Found {count} matching results.</h1>
      {/* <Link href='/' className='flex items-center justify-center'>Back</Link> */}
      <AvatarList avatars={avatars} />
    </main>
  )
}

