import React, { useState } from 'react';
import Link from 'next/link';
import { SearchBar } from '@/components/ui/SearchBar';
import { TVShow } from '@/types/tmdb';

interface HeaderProps {
  onShowSelect?: (show: TVShow) => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowSelect }) => {
  return (
    <header className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-red-600 to-gray-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TV</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">ShowHub</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <SearchBar 
              onShowSelect={onShowSelect}
              placeholder="Search for TV shows..."
            />
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              href="/trending" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Trending
            </Link>
            <Link 
              href="/top-rated" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Top Rated
            </Link>
            {(() => {
              const [open, setOpen] = useState(false);
              return (
                <div 
                  className="relative"
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                  <button 
                    className="text-gray-300 hover:text-white transition-colors font-medium"
                    onFocus={() => setOpen(true)}
                    onBlur={() => setOpen(false)}
                  >
                    Genres
                  </button>
                  {open && (
                    <div className="absolute right-0 top-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg min-w-[220px] z-50 pt-2">
                      {/* The top padding creates a hover buffer, preventing flicker when moving from button to menu */}
                      <div className="py-2 max-h-80 overflow-y-auto">
                        {require('@/lib/genres').TV_GENRES.map((g: {id:number; name:string}) => (
                          <Link
                            key={g.id}
                            href={`/genres/${g.id}`}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white"
                            onClick={() => setOpen(false)}
                          >
                            {g.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-300 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
