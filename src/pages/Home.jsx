// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import { tmdb } from "../services/tmdb"; // Ensure this path is correct!
import MovieRow from "../components/MovieRow";
import Hero from "../components/Hero";

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);

  useEffect(() => {
    // Check if tmdb and getTrending exist before calling
    if (tmdb?.getTrending) {
      tmdb
        .getTrending()
        .then((data) => {
          if (data.results) {
            const random = Math.floor(Math.random() * data.results.length);
            setFeaturedMovie(data.results[random]);
          }
        })
        .catch((err) => console.error("Home Fetch Error:", err));
    }
  }, []);

  return (
    <div className="bg-[#141414]">
      <Hero movie={featuredMovie} />

      <div className="-mt-32 relative z-20 pb-10">
        {/* Double check these function names match tmdb.js exactly */}
        <MovieRow title="Trending Now" fetchFn={tmdb.getTrending} />
        <MovieRow title="Popular on Netflix" fetchFn={tmdb.getPopular} />
        <MovieRow title="Top Rated" fetchFn={tmdb.getTopRated} />
      </div>
    </div>
  );
};

export default Home;
