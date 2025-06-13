'use client';

import { useState, useEffect } from 'react';

// Predefined anime avatar URLs as fallback
const animeAvatars = [
  'https://i.pravatar.cc/150?img=1',
  'https://i.pravatar.cc/150?img=2',
  'https://i.pravatar.cc/150?img=3',
  'https://i.pravatar.cc/150?img=4',
  'https://i.pravatar.cc/150?img=5',
  'https://i.pravatar.cc/150?img=6',
  'https://i.pravatar.cc/150?img=7',
  'https://i.pravatar.cc/150?img=8',
  'https://i.pravatar.cc/150?img=9',
  'https://i.pravatar.cc/150?img=10',
  'https://avatars.dicebear.com/api/avataaars/1.svg',
  'https://avatars.dicebear.com/api/avataaars/2.svg',
  'https://avatars.dicebear.com/api/avataaars/3.svg',
  'https://avatars.dicebear.com/api/avataaars/4.svg',
  'https://avatars.dicebear.com/api/avataaars/5.svg',
];

export const useAnimeAvatar = (userId?: string) => {
  const [avatarUrl, setAvatarUrl] = useState<string>('');

  useEffect(() => {
    if (userId) {
      // Generate consistent avatar based on user ID
      const hash = userId.split('').reduce((a, b) => {
        a = ((a << 5) - a) + b.charCodeAt(0);
        return a & a;
      }, 0);
      
      const index = Math.abs(hash) % animeAvatars.length;
      setAvatarUrl(animeAvatars[index]);
    } else {
      // Random avatar if no user ID
      const randomIndex = Math.floor(Math.random() * animeAvatars.length);
      setAvatarUrl(animeAvatars[randomIndex]);
    }
  }, [userId]);

  const getRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * animeAvatars.length);
    setAvatarUrl(animeAvatars[randomIndex]);
  };

  return {
    avatarUrl,
    getRandomAvatar,
  };
};