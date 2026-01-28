// src/components/MovieRow.jsx
import React, { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

const MovieRow = ({ title, fetchFn }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Only call fetchFn if it actually exists as a function
    if (typeof fetchFn === "function") {
      fetchFn().then((data) => setMovies(data.results || []));
    } else {
      console.error(`fetchFn is missing for row: ${title}`);
    }
  }, [fetchFn, title]);

  return (
    <div className="py-4 px-12">
      <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {movies.map((movie) => (
          // We pass the movie OBJECT here, NOT the fetch function
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieRow;
