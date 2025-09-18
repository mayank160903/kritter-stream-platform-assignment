'use client';

import { useRouter } from 'next/navigation';
import { Header } from './Header';
import { TVShow } from '@/types/tmdb';

export const ClientHeader = () => {
  const router = useRouter();

  const handleShowSelect = (show: TVShow) => {
    router.push(`/show/${show.id}`);
  };

  return <Header onShowSelect={handleShowSelect} />;
};
