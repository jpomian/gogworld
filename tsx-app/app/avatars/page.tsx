import { getAvatars } from '../lib/getAvatars'
import AvatarList from '../components/AvatarList'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'


export default async function Home() {
  const { avatars } = await getAvatars()

  return (
    <main className="container mx-auto">
      <Navbar />
      <div className='h-20'></div>
      {/* <h1 className="text-l text-center font-extralight font-mono text-gray-400 mt-10">Found {count} matching results.</h1> */}
      <Searchbar />
      <AvatarList avatars={avatars} />
    </main>
  )
}

