'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TVShowCard } from '@/components/ui/TVShowCard';
import { useTopRatedShows } from '@/hooks/useTMDB';

export default function TopRatedPage() {
  const { data, loading } = useTopRatedShows();

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="px-4 md:px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">Top Rated Shows</h1>
          <p className="text-gray-300 mb-8">Highest rated TV shows by the community.</p>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-[420px] bg-gray-800/60 rounded-lg animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {data?.results?.map((show) => (
                <TVShowCard key={show.id} show={show} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}


