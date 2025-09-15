import axios from 'axios';
import {
  TMDBResponse,
  TVShow,
  TVShowDetails,
  SeasonDetails,
  SearchParams,
  TrendingParams,
  TopRatedParams,
  TMDBConfig,
} from '@/types/tmdb';

// API Configuration
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

if (!API_KEY) {
  throw new Error('TMDB API key is not configured. Please set NEXT_PUBLIC_TMDB_API_KEY in your environment variables.');
}

// Create axios instance with default config
const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

// API Service Class
export class TMDBService {
  // Get trending TV shows
  static async getTrendingShows(params: TrendingParams = {}): Promise<TMDBResponse<TVShow>> {
    const { time_window = 'day', page = 1, language = 'en-US' } = params;
    
    try {
      const response = await tmdbApi.get(`/trending/tv/${time_window}`, {
        params: { page, language },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching trending shows:', error);
      throw new Error('Failed to fetch trending shows');
    }
  }

  // Get top rated TV shows
  static async getTopRatedShows(params: TopRatedParams = {}): Promise<TMDBResponse<TVShow>> {
    const { page = 1, language = 'en-US' } = params;
    
    try {
      const response = await tmdbApi.get('/tv/top_rated', {
        params: { page, language },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top rated shows:', error);
      throw new Error('Failed to fetch top rated shows');
    }
  }

  // Get popular TV shows
  static async getPopularShows(params: TopRatedParams = {}): Promise<TMDBResponse<TVShow>> {
    const { page = 1, language = 'en-US' } = params;
    
    try {
      const response = await tmdbApi.get('/tv/popular', {
        params: { page, language },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular shows:', error);
      throw new Error('Failed to fetch popular shows');
    }
  }

  // Search TV shows
  static async searchShows(params: SearchParams): Promise<TMDBResponse<TVShow>> {
    const { query, page = 1, language = 'en-US' } = params;
    
    if (!query.trim()) {
      return { page: 1, results: [], total_pages: 0, total_results: 0 };
    }
    
    try {
      const response = await tmdbApi.get('/search/tv', {
        params: { query: query.trim(), page, language },
      });
      return response.data;
    } catch (error) {
      console.error('Error searching shows:', error);
      throw new Error('Failed to search shows');
    }
  }

  // Get TV show details
  static async getShowDetails(showId: number): Promise<TVShowDetails> {
    try {
      const response = await tmdbApi.get(`/tv/${showId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching show details:', error);
      throw new Error('Failed to fetch show details');
    }
  }

  // Get season details with episodes
  static async getSeasonDetails(showId: number, seasonNumber: number): Promise<SeasonDetails> {
    try {
      const response = await tmdbApi.get(`/tv/${showId}/season/${seasonNumber}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching season details:', error);
      throw new Error('Failed to fetch season details');
    }
  }

  // Get TMDB configuration (for image URLs)
  static async getConfiguration(): Promise<TMDBConfig> {
    try {
      const response = await tmdbApi.get('/configuration');
      return response.data;
    } catch (error) {
      console.error('Error fetching TMDB configuration:', error);
      throw new Error('Failed to fetch TMDB configuration');
    }
  }
}

// Image URL helpers
export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) {
    return '/placeholder-poster.svg'; // Fallback image
  }
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path: string | null, size: string = 'w500'): string => {
  return getImageUrl(path, size);
};

export const getBackdropUrl = (path: string | null, size: string = 'w1280'): string => {
  return getImageUrl(path, size);
};

export const getStillUrl = (path: string | null, size: string = 'w780'): string => {
  return getImageUrl(path, size);
};

// Utility functions
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'TBA';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};
