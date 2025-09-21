'use client';

import React from 'react';
import { HorizontalCarousel } from '@/components/carousel/HorizontalCarousel';
import { TV_GENRES } from '@/lib/genres';
import { GenreCarousel } from '@/components/GenreCarousel';
import { useTrendingShows, useTopRatedShows, usePopularShows } from '@/hooks/useTMDB';

export default function Home() {
  const { data: trendingData, loading: trendingLoading } = useTrendingShows('day');
  const { data: topRatedData, loading: topRatedLoading } = useTopRatedShows();
  const { data: popularData, loading: popularLoading } = usePopularShows();


  return (
    <div className="min-h-screen bg-black">

      <main className="pt-0 pb-16 space-y-12">
        <section className="relative h-96 md:h-[500px] overflow-hidden">
          {trendingData?.results?.[0] && (
            <div className="absolute inset-0">
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/w1920${trendingData.results[0].backdrop_path})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 pt-20 md:pt-28 px-6 md:px-12 pb-6">
                <div className="max-w-4xl">
                  <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    {trendingData.results[0].name}
                  </h1>
                  <p className="text-lg md:text-xl text-gray-200 mb-6 line-clamp-3">
                    {trendingData.results[0].overview}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    {trendingData.results[0].first_air_date && (
                      <span>{new Date(trendingData.results[0].first_air_date).getFullYear()}</span>
                    )}
                    <span className="flex items-center gap-1">
                      ⭐ {trendingData.results[0].vote_average.toFixed(1)}
                    </span>
                    <span className="bg-red-600 px-2 py-1 rounded text-xs font-medium">
                      TRENDING
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        <div className="space-y-12">
          <HorizontalCarousel
            title="Trending Today"
            shows={trendingData?.results || []}
            loading={trendingLoading}
          />
          
          <HorizontalCarousel
            title="Top Rated"
            shows={topRatedData?.results || []}
            loading={topRatedLoading}
          />
          
          <HorizontalCarousel
            title="Popular Shows"
            shows={popularData?.results || []}
            loading={popularLoading}
          />
 
          {TV_GENRES.slice(0, 6).map((genre) => (
            <GenreCarousel key={genre.id} genreId={genre.id} title={genre.name} />
          ))}
        </div>
      </main>
    </div>
  );
}
