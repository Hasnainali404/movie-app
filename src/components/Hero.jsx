import React from 'react';
import { Play, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Hero = ({ movie }) => {
  const navigate = useNavigate();
  const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;

  if (!movie) return <div className="h-[80vh] bg-zinc-900 animate-pulse" />;

  // Truncate long descriptions for better UI
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div className="relative h-screen w-full text-white">
      {/* Background Image with Gradient Overlays */}
      <div className="absolute inset-0">
        <img
          src={`${IMAGE_BASE}${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover object-top"
        />
        {/* Left Gradient (for text readability) */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
        {/* Bottom Gradient (to blend with the rows) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex flex-col justify-center px-4 md:px-12 space-y-4 max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
          {movie.title || movie.name}
        </h1>
        
        <p className="text-sm md:text-lg text-gray-200 drop-shadow-md leading-relaxed">
          {truncate(movie.overview, 150)}
        </p>

        <div className="flex items-center gap-3 pt-2">
          <button 
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded font-bold hover:bg-white/80 transition-colors"
          >
            <Play size={20} fill="black" /> Play
          </button>
          
          <button 
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="flex items-center gap-2 bg-zinc-500/70 text-white px-6 py-2 rounded font-bold hover:bg-zinc-500/50 transition-colors"
          >
            <Info size={20} /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;