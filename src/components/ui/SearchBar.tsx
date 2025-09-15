import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { TVShow } from '@/types/tmdb';
import { useSearchShows, useTypeaheadShows } from '@/hooks/useTMDB';
import { TVShowCardCompact } from './TVShowCard';

interface SearchBarProps {
  onShowSelect?: (show: TVShow) => void;
  className?: string;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onShowSelect,
  className = '',
  placeholder = 'Search TV shows...',
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const { data: searchResults, loading, error } = useSearchShows(query, query.length > 2);
  const { suggestions } = useTypeaheadShows(query);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.length > 2);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!searchResults?.results) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && searchResults.results[selectedIndex]) {
          handleShowSelect(searchResults.results[selectedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const handleShowSelect = (show: TVShow) => {
    setQuery(show.name);
    setIsOpen(false);
    setSelectedIndex(-1);
    onShowSelect?.(show);
  };

  const clearSearch = () => {
    setQuery('');
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {loading ? (
            <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
          ) : (
            <Search className="h-5 w-5 text-gray-400" />
          )}
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 2 && setIsOpen(true)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-10 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto">
          {error ? (
            <div className="p-4 text-red-400 text-center">
              Failed to search shows. Please try again.
            </div>
          ) : searchResults?.results && searchResults.results.length > 0 ? (
            <div className="p-2">
              {/* Typeahead suggestions row */}
              {suggestions.length > 0 && (
                <div className="px-2 pb-2">
                  <div className="flex flex-wrap gap-2">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setQuery(s);
                          inputRef.current?.focus();
                        }}
                        className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-200 px-2 py-1 rounded"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {searchResults.results.slice(0, 8).map((show, index) => (
                <button
                  key={show.id}
                  onClick={() => handleShowSelect(show)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    index === selectedIndex
                      ? 'bg-blue-600 text-white'
                      : 'hover:bg-gray-700 text-gray-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-16 bg-gray-600 rounded flex-shrink-0 overflow-hidden">
                      {show.poster_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w92${show.poster_path}`}
                          alt={show.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No Image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium truncate">{show.name}</h3>
                      {show.first_air_date && (
                        <p className="text-sm text-gray-400">
                          {new Date(show.first_air_date).getFullYear()}
                        </p>
                      )}
                      {show.overview && (
                        <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                          {show.overview}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
              
              {searchResults.results.length > 8 && (
                <div className="p-2 text-center text-gray-400 text-sm">
                  Showing first 8 results
                </div>
              )}
            </div>
          ) : query.length > 2 && !loading ? (
            <div className="p-4 text-gray-400 text-center">
              No shows found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
