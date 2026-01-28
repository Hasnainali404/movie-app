import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchMovies } from '../hooks/useSearchMovies';
import MovieCard from '../components/MovieCard';
import { MovieRowSkeleton } from '../components/Skeletons/MovieRowSkeleton';

const SearchResults = () => {
  // 1. Get the query from the URL: /search?query=batman
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  
  // 2. Use our existing search hook
  const { results, loading, error } = useSearchMovies(query);

  if (error) {
    return (
      <div className="pt-32 text-center text-gray-400">
        <p>Something went wrong: {error}</p>
      </div>
    );
  }

  return (
    <div className="pt-24 px-4 md:px-12 min-h-screen">
      <header className="mb-8">
        <h1 className="text-gray-400 text-lg">
          Showing results for: <span className="text-white font-bold text-2xl ml-2 italic">"{query}"</span>
        </h1>
      </header>

      {/* 3. Loading State using Skeleton logic */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="aspect-[2/3] bg-zinc-800 animate-pulse rounded-md" />
          ))}
        </div>
      ) : (
        <>
          {/* 4. Results Grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-y-10 gap-x-4 md:gap-x-6">
              {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            /* 5. Empty State */
            <div className="flex flex-col items-center justify-center pt-20 text-gray-500">
              <p className="text-xl">Your search for "{query}" did not have any matches.</p>
              <ul className="mt-4 text-sm list-disc list-inside space-y-1">
                <li>Try different keywords</li>
                <li>Looking for a movie? Try the title</li>
                <li>Try a genre, like Comedy, Romance, or Action</li>
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;