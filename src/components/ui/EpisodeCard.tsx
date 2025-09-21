import React from 'react';
import Image from 'next/image';
import { Episode } from '@/types/tmdb';
import { getStillUrl, formatDate, formatRating } from '@/lib/tmdb';
import { Star, Calendar, Clock } from 'lucide-react';

interface EpisodeCardProps {
  episode: Episode;
  className?: string;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({ 
  episode, 
  className = '' 
}) => {
  const stillUrl = getStillUrl(episode.still_path, 'w780');
  const fallbackUrl = '/placeholder-poster.svg';

  return (
    <div className={`bg-gray-800 rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src={episode.still_path ? stillUrl : fallbackUrl}
          alt={episode.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = fallbackUrl;
          }}
        />
        
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
          E{episode.episode_number}
        </div>
        
        {episode.vote_average > 0 && (
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1 text-yellow-400 text-sm">
            <Star className="w-3 h-3 fill-current" />
            <span>{formatRating(episode.vote_average)}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-white text-lg mb-2 line-clamp-2">
          {episode.name}
        </h3>
        
        {episode.overview && (
          <p className="text-gray-300 text-sm line-clamp-3 mb-3">
            {episode.overview}
          </p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-400">
          {episode.air_date && (
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(episode.air_date)}</span>
            </div>
          )}
          
          {episode.runtime && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{episode.runtime}m</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
