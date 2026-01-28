// src/services/tmdb.js
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const fetchFromTMDB = async (endpoint) => {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const tmdb = {
  getTrending: () => fetchFromTMDB('/trending/movie/week'),
  getPopular: () => fetchFromTMDB('/movie/popular'),
  getTopRated: () => fetchFromTMDB('/movie/top_rated'),
  getMovieDetails: (id) => fetchFromTMDB(`/movie/${id}`),
};