import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { tmdb } from '../services/tmdb';
import { Play, Info, Star } from 'lucide-react';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;

  useEffect(() => {
    tmdb.getMovieDetails(id).then(setMovie);
    window.scrollTo(0, 0); // Scroll to top on navigation
  }, [id]);

  if (!movie) return <div className="h-screen bg-black animate-pulse" />;

  const backdrop = `${IMAGE_BASE}${movie.backdrop_path}`;

  return (
    <div className="relative min-h-screen">
      <div 
        className="absolute inset-0 h-[70vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-[#141414] via-[#141414]/60 to-transparent" />
      </div>

      <div className="relative pt-[40vh] px-4 md:px-12 space-y-6">
        <h1 className="text-4xl md:text-7xl font-bold max-w-4xl text-white">{movie.title}</h1>
        
        <div className="flex items-center gap-4 text-sm font-semibold">
          <span className="text-green-500">{movie.release_date.split('-')[0]}</span>
          <span className="border px-1 text-xs border-gray-500 text-white">HD</span>
          <div className="flex items-center text-white gap-1"><Star className='text-yellow-500' size={16} /> {movie.vote_average.toFixed(1)}</div>
        </div>

        <p className="text-lg text-gray-300 max-w-2xl leading-relaxed">
          {movie.overview}
        </p>

        <div className="flex gap-4">
          <button className="bg-white text-black px-8 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-white/80 transition-colors">
            <Play fill="black" /> Play
          </button>
          <button className="bg-zinc-600/80 text-white px-8 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-zinc-600 transition-colors">
            <Info /> More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;