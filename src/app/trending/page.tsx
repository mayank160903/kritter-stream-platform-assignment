'use client';

import React from 'react';
import { TVShowCard } from '@/components/ui/TVShowCard';
import { useTrendingShows } from '@/hooks/useTMDB';

export default function TrendingPage() {
  const { data, loading } = useTrendingShows('day');

  return (
    <div className="min-h-screen bg-black">

      <main className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Trending Shows</h1>
          <p className="text-gray-300 mb-6">What&apos;s popular today across TV.</p>

          {loading ? (
            <div className="mx-auto grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 place-items-stretch">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-[360px] sm:h-[400px] md:h-[420px] bg-gray-800/60 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="mx-auto grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 place-items-stretch">
              {data?.results?.map((show) => (
                <TVShowCard key={show.id} show={show} className="w-full" />
              ))}
            </div>
          )}
        </div>
      </main>

    </div>
  );
}


