import { getAvatars, AvatarData } from '../lib/getAvatars';
import AvatarList from '../components/AvatarList';

export default async function Home() {
  const avatarData: AvatarData = await getAvatars();
  

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">Guild of Guardians Avatars</h1>
        <p>Total Avatars: {avatarData.count}</p>
      </header>
      <AvatarList avatars={avatarData.avatars} />
      <section className="p-8 text-zinc-800">

        <h2 className="text-2xl font-bold mb-4">Attribute Rarity</h2>

        {Object.entries(avatarData.rarity).map(([traitType, values]) => (

          <div key={traitType} className="mb-6">
            
            <h3 className="text-xl font-semibold mb-2">{traitType}</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(values).map(([value, rarity]) => (

                <li key={value} className="bg-white rounded-lg shadow p-4">
                  <span className="font-medium">{value}:</span>{' '}
                  {(rarity * 100).toFixed(2)}%
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}

