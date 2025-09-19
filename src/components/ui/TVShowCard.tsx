"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TVShow } from '@/types/tmdb';
import { getPosterUrl, formatRating, truncateText } from '@/lib/tmdb';
import { Star, Calendar, Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';
import { useToast } from '@/components/ui/Toast';

interface TVShowCardProps {
  show: TVShow;
  className?: string;
  priority?: boolean;
}

export const TVShowCard: React.FC<TVShowCardProps> = ({ 
  show, 
  className = '',
  priority = false 
}) => {
  const posterUrl = getPosterUrl(show.poster_path, 'w342');
  const fallbackUrl = '/placeholder-poster.svg';
  const { toggle, isFavorite } = useFavorites();
  const { show: showToast } = useToast();

  return (
    <Link 
      href={`/show/${show.id}`}
      className={`group/card block transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800 w-full">
        {/* Poster Image */}
        <div className="relative w-full h-80 overflow-hidden">
          <Image
            src={show.poster_path ? posterUrl : fallbackUrl}
            alt={show.name}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover/card:scale-110"
            sizes="(max-width: 640px) 50vw, (max-width: 1200px) 25vw, 256px"
            priority={priority}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackUrl;
            }}
          />
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
          
          {/* Favorite toggle */}
          <button
            type="button"
            aria-label={isFavorite(show.id) ? 'Remove from favorites' : 'Add to favorites'}
            onClick={(e) => { 
              e.preventDefault(); 
              const wasFav = isFavorite(show.id);
              toggle(show);
              showToast(wasFav ? `Removed bookmark for ${show.name}` : `Successfully bookmarked ${show.name}`);
            }}
            className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-full p-1 text-white hover:text-red-400"
          >
            <Heart className={`w-5 h-5 ${isFavorite(show.id) ? 'fill-red-600 text-red-600' : ''}`} />
          </button>

          {/* Rating badge */}
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-yellow-400 text-sm font-medium">
            <Star className="w-3 h-3 fill-current" />
            <span>{formatRating(show.vote_average)}</span>
          </div>
        </div>

        {/* Show Info */}
        <div className="p-4 space-y-3">
          {/* Fixed-height title area with hover marquee to reveal full title */}
          <div className="marquee h-12">
            <h3 className="marquee-content font-semibold text-white text-lg leading-tight group-hover/card:text-red-400 transition-colors">
              {show.name}
            </h3>
          </div>
          
          {/* Fixed-height overview area to keep cards equal */}
          {show.overview ? (
            <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed h-[3.75rem]">
              {truncateText(show.overview, 120)}
            </p>
          ) : (
            <div className="h-[3.75rem]" />
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-400 pt-1 h-6">
            {show.first_air_date && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>{new Date(show.first_air_date).getFullYear()}</span>
              </div>
            )}
            
            <div className="text-xs bg-gray-700 px-2 py-1 rounded font-medium">
              {show.original_language?.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Compact version for smaller spaces
export const TVShowCardCompact: React.FC<TVShowCardProps> = ({ 
  show, 
  className = '',
  priority = false 
}) => {
  const posterUrl = getPosterUrl(show.poster_path, 'w185');
  const fallbackUrl = '/placeholder-poster.svg';

  return (
    <Link 
      href={`/show/${show.id}`}
      className={`group/card block transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800 w-full">
        <div className="relative w-full h-56 overflow-hidden">
          <Image
            src={show.poster_path ? posterUrl : fallbackUrl}
            alt={show.name}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover/card:scale-110"
            sizes="128px"
            priority={priority}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackUrl;
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-1 right-1 bg-black/70 backdrop-blur-sm rounded-full px-1.5 py-0.5 flex items-center gap-1 text-yellow-400 text-xs font-medium">
            <Star className="w-2.5 h-2.5 fill-current" />
            <span>{formatRating(show.vote_average)}</span>
          </div>
        </div>

        <div className="p-3 space-y-2">
          <div className="marquee h-8">
            <h3 className="marquee-content font-medium text-white text-sm leading-tight group-hover/card:text-red-400 transition-colors">
              {show.name}
            </h3>
          </div>
          
          {show.first_air_date && (
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Calendar className="w-3 h-3 flex-shrink-0" />
              <span>{new Date(show.first_air_date).getFullYear()}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
