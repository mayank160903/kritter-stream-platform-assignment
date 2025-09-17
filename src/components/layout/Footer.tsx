import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-black/90 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-white font-semibold">
              <div className="w-7 h-7 bg-gradient-to-br from-red-600 to-gray-600 rounded-md flex items-center justify-center">
                <span className="text-xs">TV</span>
              </div>
              <span>ShowHub</span>
            </div>
            <p className="text-sm text-gray-400">
              © {year} ShowHub. Built for discovering great TV. Data provided by TMDB.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <Link href="/trending" className="hover:text-white transition-colors">Trending</Link>
            <Link href="/top-rated" className="hover:text-white transition-colors">Top Rated</Link>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >TMDB</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};


