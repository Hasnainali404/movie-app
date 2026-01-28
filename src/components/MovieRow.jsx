// src/components/MovieRow.jsx
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovieCard from "../components/MovieCard";

const MovieRow = ({ title, fetchFn }) => {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(null);

  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const momentumId = useRef(null);
  const isClick = useRef(false);

  useEffect(() => {
    if (typeof fetchFn === "function") {
      fetchFn().then((data) => setMovies(data?.results || []));
    }
  }, [fetchFn]);

  /* =========================
     HELPERS
  ========================== */
  const cancelMomentum = () => {
    if (momentumId.current) {
      cancelAnimationFrame(momentumId.current);
      momentumId.current = null;
    }
  };

  const startMomentum = () => {
    cancelMomentum();
    const friction = 0.95;

    const animate = () => {
      velocity.current *= friction;
      sliderRef.current.scrollLeft -= velocity.current;

      if (Math.abs(velocity.current) > 0.5) {
        momentumId.current = requestAnimationFrame(animate);
      }
    };

    momentumId.current = requestAnimationFrame(animate);
  };

  const bounceBackIfNeeded = () => {
    const el = sliderRef.current;
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (el.scrollLeft < 0) {
      el.scrollTo({ left: 0, behavior: "smooth" });
    } else if (el.scrollLeft > maxScroll) {
      el.scrollTo({ left: maxScroll, behavior: "smooth" });
    }
  };

  /* =========================
     DRAG LOGIC (MOUSE + TOUCH)
  ========================== */
  const onDragStart = (x) => {
    isDragging.current = true;
    isClick.current = true;
    cancelMomentum();
    lastX.current = x;
  };

  const onDragMove = (x) => {
    if (!isDragging.current) return;

    const el = sliderRef.current;
    const dx = x - lastX.current;
    lastX.current = x;

    if (Math.abs(dx) > 5) isClick.current = false;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const isOverscroll = el.scrollLeft <= 0 || el.scrollLeft >= maxScroll;

    const resistance = isOverscroll ? 0.35 : 1;

    el.scrollLeft -= dx * resistance;
    velocity.current = dx;
  };

  const onDragEnd = () => {
    isDragging.current = false;

    if (!isClick.current) {
      startMomentum();
    }

    bounceBackIfNeeded();
  };

  /* =========================
     EVENTS
  ========================== */
  const onMouseDown = (e) => onDragStart(e.pageX);
  const onMouseMove = (e) => onDragMove(e.pageX);
  const onMouseUp = onDragEnd;

  const onTouchStart = (e) => onDragStart(e.touches[0].pageX);
  const onTouchMove = (e) => onDragMove(e.touches[0].pageX);
  const onTouchEnd = onDragEnd;

  /* =========================
     ARROWS
  ========================== */
  const scroll = (dir) => {
    cancelMomentum();
    sliderRef.current.scrollBy({
      left:
        dir === "left"
          ? -sliderRef.current.clientWidth
          : sliderRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative group py-4 px-4 md:px-12">
      <h2 className="text-white text-xl md:text-2xl font-bold mb-4">{title}</h2>

      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10
        bg-black/60 hover:bg-black text-white p-2 rounded-full
        opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Slider */}
      <div
        ref={sliderRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        className="flex gap-4 overflow-x-auto scrollbar-hide cursor-grab select-none"
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => cancelMomentum()} // 🚫 stop momentum on click
            className="min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px]"
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10
        bg-black/60 hover:bg-black text-white p-2 rounded-full
        opacity-0 group-hover:opacity-100 transition"
      >
        <ChevronRight size={28} />
      </button>
    </section>
  );
};

export default MovieRow;
