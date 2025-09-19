import { useState, useEffect, useCallback } from 'react';
import { TMDBService } from '@/lib/tmdb';
import { TVShow, TVShowDetails, SeasonDetails, TMDBResponse } from '@/types/tmdb';
// import { TV_GENRES } from '@/lib/genres';
import { cacheGet, cacheSet } from '@/lib/cache';

// Hook for fetching trending shows
export const useTrendingShows = (timeWindow: 'day' | 'week' = 'day') => {
  const [data, setData] = useState<TMDBResponse<TVShow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cacheKey = `trending:${timeWindow}`;
      const cached = cacheGet<TMDBResponse<TVShow>>(cacheKey);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }
      const result = await TMDBService.getTrendingShows({ time_window: timeWindow });
      setData(result);
      cacheSet(cacheKey, result, 20 * 60_000, 'local');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch trending shows');
    } finally {
      setLoading(false);
    }
  }, [timeWindow]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for fetching top rated shows
export const useTopRatedShows = () => {
  const [data, setData] = useState<TMDBResponse<TVShow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cacheKey = 'top-rated';
      const cached = cacheGet<TMDBResponse<TVShow>>(cacheKey);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }
      const result = await TMDBService.getTopRatedShows();
      setData(result);
      cacheSet(cacheKey, result, 30 * 60_000, 'local');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch top rated shows');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for fetching popular shows
export const usePopularShows = () => {
  const [data, setData] = useState<TMDBResponse<TVShow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const cacheKey = 'popular';
      const cached = cacheGet<TMDBResponse<TVShow>>(cacheKey);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }
      const result = await TMDBService.getPopularShows();
      setData(result);
      cacheSet(cacheKey, result, 20 * 60_000, 'local');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch popular shows');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for searching shows
export const useSearchShows = (query: string, enabled: boolean = true) => {
  const [data, setData] = useState<TMDBResponse<TVShow> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchShows = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || !enabled) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const cacheKey = `search:${searchQuery.toLowerCase()}`;
      const cached = cacheGet<TMDBResponse<TVShow>>(cacheKey);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }
      const result = await TMDBService.searchShows({ query: searchQuery });
      setData(result);
      cacheSet(cacheKey, result, 5 * 60_000, 'session');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search shows');
    } finally {
      setLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchShows(query);
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(timeoutId);
  }, [query, searchShows]);

  return { data, loading, error, searchShows };
};

// Lightweight type-ahead suggestions (names only)
export const useTypeaheadShows = (query: string) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const cacheKey = `typeahead:${searchQuery.toLowerCase()}`;
      const cached = cacheGet<TMDBResponse<TVShow>>(cacheKey);
      let result: TMDBResponse<TVShow> | null = null;
      if (cached) {
        result = cached;
      } else {
        result = await TMDBService.searchShows({ query: searchQuery });
        cacheSet(cacheKey, result, 5 * 60_000, 'session');
      }
      const names = (result.results || [])
        .map((s) => s.name)
        .filter(Boolean)
        .slice(0, 6);
      setSuggestions(names);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch suggestions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      fetchSuggestions(query);
    }, 200);
    return () => clearTimeout(id);
  }, [query, fetchSuggestions]);

  return { suggestions, loading, error };
};

// Hook to fetch shows for a single genre id
export const useGenreShows = (genreId: number) => {
  const [data, setData] = useState<TMDBResponse<TVShow> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await TMDBService.getShowsByGenre(genreId);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch genre shows');
    } finally {
      setLoading(false);
    }
  }, [genreId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

// Hook for fetching show details
export const useShowDetails = (showId: number | null) => {
  const [data, setData] = useState<TVShowDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchShowDetails = useCallback(async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await TMDBService.getShowDetails(id);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch show details');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (showId) {
      fetchShowDetails(showId);
    } else {
      setData(null);
      setLoading(false);
      setError(null);
    }
  }, [showId, fetchShowDetails]);

  return { data, loading, error, refetch: fetchShowDetails };
};

// Hook for fetching season details
export const useSeasonDetails = (showId: number | null, seasonNumber: number | null) => {
  const [data, setData] = useState<SeasonDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSeasonDetails = useCallback(async (id: number, season: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await TMDBService.getSeasonDetails(id, season);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch season details');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (showId && seasonNumber !== null) {
      fetchSeasonDetails(showId, seasonNumber);
    } else {
      setData(null);
      setLoading(false);
      setError(null);
    }
  }, [showId, seasonNumber, fetchSeasonDetails]);

  return { data, loading, error, refetch: fetchSeasonDetails };
};
