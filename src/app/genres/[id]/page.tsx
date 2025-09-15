'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { TVShowCard } from '@/components/ui/TVShowCard';
import { useGenreShows } from '@/hooks/useTMDB';
import { TV_GENRES, getGenreName } from '@/lib/genres';

export default function GenrePage() {
  const params = useParams();
  const router = useRouter();
  const genreId = parseInt(params.id as string, 10);
  const { data, loading } = useGenreShows(genreId);

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    router.push(`/genres/${val}`);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main className="px-4 md:px-6 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">{getGenreName(genreId)}</h1>
              <p className="text-gray-300 mt-2">Browse TV shows by genre.</p>
            </div>
            <select
              value={String(genreId)}
              onChange={handleGenreChange}
              className="bg-gray-800 text-gray-200 border border-gray-600 rounded px-3 py-2"
            >
              {TV_GENRES.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
          </div>

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


