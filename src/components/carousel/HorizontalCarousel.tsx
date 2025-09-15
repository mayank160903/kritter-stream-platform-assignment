import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TVShow } from '@/types/tmdb';
import { TVShowCard, TVShowCardCompact } from '@/components/ui/TVShowCard';
import { LoadingSkeleton } from '@/components/ui/LoadingSkeleton';

interface HorizontalCarouselProps {
  title: string;
  shows: TVShow[];
  loading?: boolean;
  compact?: boolean;
  className?: string;
}

export const HorizontalCarousel: React.FC<HorizontalCarouselProps> = ({
  title,
  shows,
  loading = false,
  compact = false,
  className = '',
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const checkScrollButtons = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    
    setIsScrolling(true);
    const scrollAmount = 300;
    const currentScroll = scrollContainerRef.current.scrollLeft;
    const targetScroll = direction === 'left' 
      ? currentScroll - scrollAmount 
      : currentScroll + scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    setTimeout(() => {
      setIsScrolling(false);
      checkScrollButtons();
    }, 300);
  };

  useEffect(() => {
    checkScrollButtons();
    
    const handleResize = () => checkScrollButtons();
    const handleScroll = () => {
      if (!isScrolling) checkScrollButtons();
    };

    window.addEventListener('resize', handleResize);
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [shows, isScrolling]);

  if (loading) {
    return (
      <div className={`space-y-4 ${className}`}>
        <h2 className="text-2xl font-bold text-white px-4 md:px-6">
          {title}
        </h2>
        <div className="flex gap-4 px-4 md:px-6 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <LoadingSkeleton 
              key={index} 
              variant="poster" 
              className="flex-shrink-0" 
            />
          ))}
        </div>
      </div>
    );
  }

  if (!shows || shows.length === 0) {
    return null;
  }

  const ShowCard = compact ? TVShowCardCompact : TVShowCard;

  return (
    <div className={`space-y-4 ${className}`}>
      <h2 className="text-2xl font-bold text-white px-4 md:px-6">
        {title}
      </h2>
      
      <div className="relative group">
        {/* Left scroll button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Right scroll button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full p-2 text-white transition-all duration-200 opacity-0 group-hover:opacity-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 px-4 md:px-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {shows.map((show, index) => (
            <ShowCard
              key={show.id}
              show={show}
              className="flex-shrink-0"
              priority={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Custom hook for touch/swipe support on mobile
export const useTouchScroll = (ref: React.RefObject<HTMLDivElement>) => {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !ref.current) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      const scrollAmount = 300;
      const currentScroll = ref.current.scrollLeft;
      const targetScroll = isLeftSwipe 
        ? currentScroll + scrollAmount 
        : currentScroll - scrollAmount;
      
      ref.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd,
  };
};
