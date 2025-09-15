import React from 'react';
import { HorizontalCarousel } from '@/components/carousel/HorizontalCarousel';
import { useGenreShows } from '@/hooks/useTMDB';

interface GenreCarouselProps {
  genreId: number;
  title: string;
}

export const GenreCarousel: React.FC<GenreCarouselProps> = ({ genreId, title }) => {
  const { data, loading } = useGenreShows(genreId);
  return (
    <div style={{ contentVisibility: 'auto', containIntrinsicSize: '420px' }}>
      <HorizontalCarousel
        title={title}
        shows={data?.results || []}
        loading={loading}
      />
    </div>
  );
};


