import React from 'react';
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
            className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
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
