'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { EpisodeCard } from '@/components/ui/EpisodeCard';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';
import { useShowDetails, useSeasonDetails } from '@/hooks/useTMDB';
import { getBackdropUrl, getPosterUrl, formatDate, formatRating } from '@/lib/tmdb';
import { ArrowLeft, Star, Calendar, Users, Globe, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/components/ui/Toast';

export default function ShowDetailsPage() {
  const params = useParams();
  const showId = parseInt(params.id as string);
  const [selectedSeason, setSelectedSeason] = useState(1);

  const { data: show, loading: showLoading, error: showError } = useShowDetails(showId);
  const { isFavorite, toggle } = useFavorites();
  const { show: showToast } = useToast();
  const { data: seasonData, loading: seasonLoading } = useSeasonDetails(showId, selectedSeason);

  if (showLoading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="pt-8 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <LoadingSkeleton variant="card" className="h-96 mb-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <LoadingSkeleton key={index} variant="episode" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showError || !show) {
    return (
      <div className="min-h-screen bg-black">
        <div className="pt-8 px-4 md:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Show Not Found</h1>
            <p className="text-gray-400 mb-6">The TV show you&apos;re looking for doesn&apos;t exist or has been removed.</p>
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const backdropUrl = getBackdropUrl(show.backdrop_path, 'w1920');
  const posterUrl = getPosterUrl(show.poster_path, 'w500');

  return (
    <div className="min-h-screen bg-black">
      
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-[position:center_60%] md:bg-[position:center_55%] lg:bg-[position:center_50%] bg-no-repeat"
          style={{
            backgroundImage: `url(${backdropUrl})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 pt-24 md:pt-28 px-6 md:px-12 pb-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster */}
              <div className="hidden md:block flex-shrink-0">
                <Image
                  src={posterUrl}
                  alt={show.name}
                  width={300}
                  height={450}
                  className="rounded-lg shadow-2xl"
                />
              </div>
              
              {/* Show Info */}
              <div className="flex-1 text-white">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{show.name}</h1>
                
                {show.tagline && (
                  <p className="text-xl text-gray-300 mb-4 italic">&quot;{show.tagline}&quot;</p>
                )}
                
                <p className="text-lg text-gray-200 mb-6 line-clamp-4">
                  {show.overview}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-sm">
                  {show.first_air_date && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(show.first_air_date)}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span>{formatRating(show.vote_average)}</span>
                  </div>
                  
                  {show.number_of_seasons && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{show.number_of_seasons} Season{show.number_of_seasons !== 1 ? 's' : ''}</span>
                    </div>
                  )}
                  
                  {show.origin_country && show.origin_country.length > 0 && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      <span>{show.origin_country.join(', ')}</span>
                    </div>
                  )}

                  {/* Favorite pill button - highly visible */}
                  <button
                    type="button"
                    aria-label={isFavorite(show.id) ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={() => {
                      const wasFav = isFavorite(show.id);
                      toggle({
                        id: show.id,
                        name: show.name,
                        poster_path: show.poster_path,
                        backdrop_path: show.backdrop_path,
                        vote_average: show.vote_average,
                        first_air_date: show.first_air_date,
                      });
                      showToast(wasFav ? `Removed bookmark for ${show.name}` : `Successfully bookmarked ${show.name}`);
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border shadow-sm backdrop-blur-sm transition-colors
                      ${isFavorite(show.id)
                        ? 'bg-red-600 text-white border-red-500 hover:bg-red-700'
                        : 'bg-black/70 text-white border-gray-700 hover:bg-black/80'}
                    `}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(show.id) ? 'fill-current' : ''}`} />
                    <span className="text-sm">{isFavorite(show.id) ? 'Bookmarked' : 'Bookmark'}</span>
                  </button>
                </div>
                
                {show.genres && show.genres.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {show.genres.map((genre) => (
                      <span 
                        key={genre.id}
                        className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Section */}
      <section className="py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Season Selector */}
          {show.seasons && show.seasons.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">Episodes</h2>
              <div className="flex flex-wrap gap-2">
                {show.seasons.map((season) => (
                  <button
                    key={season.id}
                    onClick={() => setSelectedSeason(season.season_number)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedSeason === season.season_number
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    Season {season.season_number}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Episodes Grid */}
          {seasonLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <LoadingSkeleton key={index} variant="episode" />
              ))}
            </div>
          ) : seasonData?.episodes && seasonData.episodes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonData.episodes.map((episode) => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 text-lg">No episodes available for this season.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
