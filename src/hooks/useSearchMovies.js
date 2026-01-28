import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const useSearchMovies = (query) => {
  const [data, setData] = useState({ results: [], loading: false, error: null });

  useEffect(() => {
    if (query.length < 2) {
      setData({ results: [], loading: false, error: null });
      return;
    }

    const controller = new AbortController();
    
    const fetchMovies = async () => {
      setData(prev => ({ ...prev, loading: true }));
      try {
        const res = await fetch(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&include_adult=false`,
          { signal: controller.signal }
        );
        const json = await res.json();
        setData({ results: json.results || [], loading: false, error: null });
      } catch (err) {
        if (err.name !== 'AbortError') {
          setData({ results: [], loading: false, error: err.message });
        }
      }
    };

    fetchMovies();
    return () => controller.abort();
  }, [query]);

  return data;
};