'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { SearchBar } from '@/components/ui/SearchBar';
import { TVShow } from '@/types/tmdb';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { DesktopGenres } from '@/components/ui/DesktopGenres';
import { TV_GENRES } from '@/lib/genres';

interface HeaderProps {
  onShowSelect?: (show: TVShow) => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowSelect }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGenresOpen, setMobileGenresOpen] = useState(false);
  
  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);
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
            <Link 
              href="/favorites" 
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Favorites
            </Link>
            <DesktopGenres />
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(prev => !prev)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        {/* Mobile navigation drawer (portal to body to avoid clipping by header effects) */}
        {mobileOpen && createPortal(
          <div className="fixed inset-0 z-[9999] md:hidden" aria-modal="true" role="dialog">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />
            {/* Sliding panel */}
            <div className="absolute left-0 top-0 h-full w-80 max-w-[85%] bg-black border-r border-gray-800 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between px-4 h-16 border-b border-gray-800 flex-shrink-0">
                <span className="text-white font-semibold">Menu</span>
                <button className="p-2 text-gray-400 hover:text-white" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto">
                <div className="flex flex-col py-2">
                  <Link href="/" className="px-4 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Home</Link>
                  <Link href="/trending" className="px-4 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Trending</Link>
                  <Link href="/top-rated" className="px-4 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Top Rated</Link>
                  <Link href="/favorites" className="px-4 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors" onClick={() => setMobileOpen(false)}>Favorites</Link>
                  <button 
                    className="text-left px-4 py-3 text-gray-300 hover:bg-gray-900 hover:text-white transition-colors"
                    onClick={() => setMobileGenresOpen(prev => !prev)}
                    aria-expanded={mobileGenresOpen}
                  >
                    Genres {mobileGenresOpen ? <ChevronUpIcon className="w-4 h-4 inline-block ml-2 text-gray-300" /> : <ChevronDownIcon className="w-4 h-4 inline-block ml-2 text-gray-300" />}
                  </button>
                  {mobileGenresOpen && (
                    <div className="px-2 pb-2 h-full overflow-y-auto">
                      {TV_GENRES.map((g: {id:number; name:string}) => (
                        <Link 
                          key={g.id} 
                          href={`/genres/${g.id}`} 
                          className="block px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white rounded"
                          onClick={() => setMobileOpen(false)}
                        >
                          {g.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>, document.body
        )}
      </div>
    </header>
  );
};
