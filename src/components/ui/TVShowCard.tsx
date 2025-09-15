import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TVShow } from '@/types/tmdb';
import { getPosterUrl, formatRating, truncateText } from '@/lib/tmdb';
import { Star, Calendar } from 'lucide-react';

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
  const posterUrl = getPosterUrl(show.poster_path, 'w500');
  const fallbackUrl = '/placeholder-poster.svg';

  return (
    <Link 
      href={`/show/${show.id}`}
      className={`group block transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800">
        {/* Poster Image */}
        <div className="relative w-full h-72 overflow-hidden">
          <Image
            src={show.poster_path ? posterUrl : fallbackUrl}
            alt={show.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            priority={priority}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackUrl;
            }}
          />
          
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Rating badge */}
          <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-yellow-400 text-sm font-medium">
            <Star className="w-3 h-3 fill-current" />
            <span>{formatRating(show.vote_average)}</span>
          </div>
        </div>

        {/* Show Info */}
        <div className="p-4">
          <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
            {show.name}
          </h3>
          
          {show.overview && (
            <p className="text-gray-300 text-sm line-clamp-3 mb-3">
              {truncateText(show.overview, 120)}
            </p>
          )}
          
          <div className="flex items-center justify-between text-sm text-gray-400">
            {show.first_air_date && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(show.first_air_date).getFullYear()}</span>
              </div>
            )}
            
            <div className="text-xs bg-gray-700 px-2 py-1 rounded">
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
  const posterUrl = getPosterUrl(show.poster_path, 'w342');
  const fallbackUrl = '/placeholder-poster.svg';

  return (
    <Link 
      href={`/show/${show.id}`}
      className={`group block transition-transform duration-300 hover:scale-105 ${className}`}
    >
      <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800">
        <div className="relative w-32 h-48 overflow-hidden">
          <Image
            src={show.poster_path ? posterUrl : fallbackUrl}
            alt={show.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="128px"
            priority={priority}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = fallbackUrl;
            }}
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute top-1 right-1 bg-black/70 backdrop-blur-sm rounded-full px-1.5 py-0.5 flex items-center gap-1 text-yellow-400 text-xs font-medium">
            <Star className="w-2.5 h-2.5 fill-current" />
            <span>{formatRating(show.vote_average)}</span>
          </div>
        </div>

        <div className="p-2">
          <h3 className="font-medium text-white text-sm line-clamp-2 group-hover:text-blue-400 transition-colors">
            {show.name}
          </h3>
          
          {show.first_air_date && (
            <p className="text-gray-400 text-xs mt-1">
              {new Date(show.first_air_date).getFullYear()}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
