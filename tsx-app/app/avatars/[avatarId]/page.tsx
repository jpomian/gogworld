import Navbar from '@/app/components/Navbar'
import { getAvatars } from '../../lib/getAvatars'
import Image from 'next/image'

export default async function AvatarPage({ params }: { params: Promise<{ avatarId: string }> }) {
  const { avatars, rarity, count } = await getAvatars()
  const { avatarId } = await params;
  const avatar = avatars.find(a => a.id === avatarId)

  if (!avatar) {
    return <div>Avatar not found</div>
  }

  const rarityPercentile = ((count - avatar.rank + 1) / count) * 100

  return (
    <div className="container mx-auto p-4">
      <div className='mb-12'>
        <Navbar />
      </div>
      <h1 className="text-3xl font-bold mb-4">{avatar.name}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src={avatar.image}
            alt={avatar.name}
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
          <div className="mt-4 bg-gray-700 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Rarity Information</h2>
            <p><strong>Total Rarity:</strong> {rarityPercentile.toFixed(2)}%</p>
            <p><strong>Rank:</strong> #{avatar.rank} out of {count}</p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Attributes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {avatar.attributes.map((attr) => (
              <div key={attr.trait_type} className="bg-gray-700 p-4 rounded-lg">
                <h3 className="font-semibold">{attr.trait_type}</h3>
                <p>{attr.value}</p>
                <p className="text-sm">
                  Rarity: {(rarity[attr.trait_type]?.[attr.value] * 100).toFixed(2)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const { avatars } = await getAvatars()
  return avatars.map((avatar) => ({
    avatarId: avatar.id,
  }))
}

