import fs from 'fs/promises';
import path from 'path';

export interface Avatar {
  id: string;
  name: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
  totalRarity: number;
  rank: number;
}

export interface AttributeRarity {
  [key: string]: {
    [value: string]: number;
  };
}

export interface AvatarData {
  avatars: Avatar[];
  count: number;
  attributes: {
    [key: string]: Set<string>;
  };
  rarity: AttributeRarity;
}

export async function getAvatars(): Promise<AvatarData> {
  const filePath = path.join(process.cwd(), 'public', 'avatars.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const avatars = JSON.parse(jsonData);

  const avatarArray: Avatar[] = [];
  const attributes: { [key: string]: Set<string> } = {};
  const attributeCounts: { [key: string]: { [value: string]: number } } = {};

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.entries(avatars[0]).forEach(([id, avatar]: [string, any]) => {
    const newAvatar: Avatar = {
      id,
      name: avatar.name,
      image: avatar.image,
      attributes: avatar.attributes,
      totalRarity: 0,
      rank: 0,
    };

    avatarArray.push(newAvatar);

    avatar.attributes.forEach((attr: { trait_type: string; value: string }) => {
      if (!attributes[attr.trait_type]) {
        attributes[attr.trait_type] = new Set();
        attributeCounts[attr.trait_type] = {};
      }
      attributes[attr.trait_type].add(attr.value);
      
      if (!attributeCounts[attr.trait_type][attr.value]) {
        attributeCounts[attr.trait_type][attr.value] = 0;
      }
      attributeCounts[attr.trait_type][attr.value]++;
    });
  });

  const rarity: AttributeRarity = {};
  
  Object.entries(attributeCounts).forEach(([traitType, valueCounts]) => {
    rarity[traitType] = {};

    Object.entries(valueCounts).forEach(([value, count]) => {
      rarity[traitType][value] = count / avatarArray.length;
    });
  });

  // Calculate total rarity for each avatar
  avatarArray.forEach(avatar => {
    avatar.totalRarity = avatar.attributes.reduce((total, attr) => {
      return total * rarity[attr.trait_type][attr.value];
    }, 1);
  });

  // Sort avatars by total rarity (ascending) and assign ranks
  avatarArray.sort((a, b) => a.totalRarity - b.totalRarity);
  
  avatarArray.forEach((avatar, index) => {
    avatar.rank = index + 1;
  });

  return {
    avatars: avatarArray,
    count: avatarArray.length,
    attributes,
    rarity,
  };
}

