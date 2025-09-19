"use client";

import React from 'react';
import { TVShowCard } from '@/components/ui/TVShowCard';
import { useFavorites } from '@/hooks/useFavorites';

export default function FavoritesPage() {
  const { list } = useFavorites();

  return (
    <div className="min-h-screen bg-black">
      <main className="px-4 md:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">Favorites</h1>
            <p className="text-gray-300 mt-2">Your saved TV shows.</p>
          </div>

          {list.length === 0 ? (
            <p className="text-gray-400">No favorites yet.</p>
          ) : (
            <div className="mx-auto grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 place-items-stretch">
              {list.map((show) => (
                <TVShowCard key={show.id} show={show as any} className="w-full" />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


