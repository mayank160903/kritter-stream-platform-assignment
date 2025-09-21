import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'poster' | 'card' | 'text' | 'episode';
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className = '', 
  variant = 'card' 
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'poster':
        return 'w-48 h-72 rounded-lg';
      case 'card':
        return 'w-full h-32 rounded-lg';
      case 'text':
        return 'w-full h-4 rounded';
      case 'episode':
        return 'w-full h-24 rounded-lg';
      default:
        return 'w-full h-32 rounded-lg';
    }
  };

  return (
    <div 
      className={`animate-pulse bg-gray-700 ${getVariantClasses()} ${className}`}
      role="status"
      aria-label="Loading..."
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const PosterSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-700 w-48 h-72 rounded-lg ${className}`}>
    <span className="sr-only">Loading poster...</span>
  </div>
);

export const EpisodeSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-700 w-full h-24 rounded-lg ${className}`}>
    <span className="sr-only">Loading episode...</span>
  </div>
);

export const TextSkeleton: React.FC<{ 
  lines?: number; 
  className?: string; 
}> = ({ lines = 1, className = '' }) => (
  <div className={className}>
    {Array.from({ length: lines }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse bg-gray-700 h-4 rounded mb-2 last:mb-0"
        style={{ width: index === lines - 1 ? '75%' : '100%' }}
      >
        <span className="sr-only">Loading text...</span>
      </div>
    ))}
  </div>
);
