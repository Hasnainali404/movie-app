// src/components/MovieCard.jsx
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // ERROR FIX: Do not use fetchFn here.
  // Line 12 should NOT have a fetch call.

  if (!movie) return null;

  const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="flex-none w-48 rounded overflow-hidden"
    >
      <img
        src={`${IMAGE_BASE}${movie.poster_path}`}
        alt={movie.title}
        className="hover:scale-105 transition-transform duration-300"
      />
    </Link>
  );
};

export default MovieCard;
