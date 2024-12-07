import fs from 'fs/promises';
import path from 'path';

export interface Avatar {
  id: string;
  name: string;
  image: string;
}

export interface AvatarData {
  avatars: Avatar[];
  count: number;
}

export async function getAvatars(): Promise<AvatarData> {
  const filePath = path.join(process.cwd(), 'public', 'avatars.json');
  const jsonData = await fs.readFile(filePath, 'utf8');
  const avatars = JSON.parse(jsonData);

  const avatarArray = Object.entries(avatars[0]).map(([id, avatar]: [string, any]) => ({
    id,
    name: avatar.name,
    image: avatar.image,
  }));

  return {
    avatars: avatarArray,
    count: avatarArray.length
  };
}