import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Film } from "lucide-react";
import { useDebounce } from "../hooks/useDebounce";
import { useSearchMovies } from "../hooks/useSearchMovies";
import { useRecentSearches } from "../hooks/useRecentSearches";
import { highlightText } from "../utils/highlightText";
import RecentSearchList from "../components/RecentSearchList";

const SearchInput = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const debouncedQuery = useDebounce(query, 500);
  const { results, loading } = useSearchMovies(debouncedQuery);
  const { searches, addSearch, clearSearches } = useRecentSearches();

 useEffect(() => {
  const handleClickOutside = (e) => {
    // Only close on desktop
    if (window.innerWidth < 768) return;

    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  const handleSearchSubmit = (term) => {
    if (!term.trim()) return;
    addSearch(term);
    setIsOpen(false);
    setQuery("");
    navigate(`/search?query=${encodeURIComponent(term)}`);
  };

  const handleKeyDown = (e) => {
    const hasResults = query.length >= 2 && results.length > 0;
    const hasRecent = query.length === 0 && searches.length > 0;

    // Determine the list we are currently navigating
    const currentList = hasResults ? results : hasRecent ? searches : [];

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < currentList.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      if (activeIndex >= 0) {
        const selected = currentList[activeIndex];
        const term = typeof selected === "string" ? selected : selected.title;
        handleSearchSubmit(term);
      } else {
        handleSearchSubmit(query);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <>
      {/* ================= DESKTOP SEARCH ================= */}
      <div
        ref={dropdownRef}
        className="relative hidden md:block w-full max-w-75 md:max-w-100"
      >
        {/* Input */}
        <div className="relative flex items-center group">
          <Search
            className={`absolute left-3 w-4 h-4 transition-colors ${
              isOpen ? "text-white" : "text-gray-400"
            }`}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setActiveIndex(-1);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Titles, people, genres..."
            className="w-full bg-black/20 border border-gray-600 text-white pl-10 pr-10 py-1.5 text-sm focus:outline-none focus:bg-black focus:border-white transition-all rounded"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute top-full mt-2 w-full bg-black/95 border border-zinc-800 rounded shadow-2xl overflow-hidden z-50">
            {query.length === 0 && (
              <RecentSearchList
                searches={searches}
                activeIndex={activeIndex}
                onSelect={handleSearchSubmit}
                onClear={clearSearches}
              />
            )}

            {query.length >= 2 && (
              <div className="max-h-100 overflow-y-auto">
                {loading && (
                  <div className="p-4 text-xs text-gray-500 animate-pulse">
                    Searching...
                  </div>
                )}

                {!loading && results.length === 0 && (
                  <div className="p-4 text-xs text-gray-500">
                    No results found for "{query}"
                  </div>
                )}

                {results.slice(0, 6).map((movie, index) => (
                  <button
                    key={movie.id}
                    onClick={() => handleSearchSubmit(movie.title)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-b border-zinc-800/50 last:border-0
                    ${
                      activeIndex === index
                        ? "bg-zinc-800"
                        : "hover:bg-zinc-900"
                    }`}
                  >
                    <Film size={14} className="text-gray-500 shrink-0" />
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-medium text-white truncate">
                        {highlightText(movie.title, query)}
                      </span>
                      <span className="text-[10px] text-gray-500 uppercase tracking-tighter">
                        {movie.release_date?.split("-")[0] || "N/A"} • Movie
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= MOBILE SEARCH ================= */}
      <div className="md:hidden">
        {/* Search Icon */}
        <button
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 50);
          }}
          aria-label="Open search"
          className="text-white mt-1.5"
        >
          <Search size={22} />
        </button>

        {/* Fullscreen Search */}
        {isOpen && (
          <div className="fixed inset-0 z-[60] bg-black px-4 pt-6">
            <div className="relative flex items-center mb-4">
              <Search className="absolute left-3 w-5 h-5 text-gray-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(-1);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search movies, shows..."
                className="w-full bg-black border border-gray-700 text-white pl-10 pr-10 py-3 text-base focus:outline-none focus:border-white rounded"
              />
              <button
                onClick={() => {
                  setIsOpen(false);
                  setQuery("");
                }}
                className="absolute right-3 text-gray-400 hover:text-white"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile Results */}
            <div className="bg-black/95 border border-zinc-800 rounded overflow-hidden">
              {query.length === 0 && (
                <RecentSearchList
                  searches={searches}
                  activeIndex={activeIndex}
                  onSelect={handleSearchSubmit}
                  onClear={clearSearches}
                />
              )}

              {query.length >= 2 && (
                <div className="max-h-[70vh] overflow-y-auto">
                  {loading && (
                    <div className="p-4 text-sm text-gray-500 animate-pulse">
                      Searching...
                    </div>
                  )}

                  {!loading && results.length === 0 && (
                    <div className="p-4 text-sm text-gray-500">
                      No results found
                    </div>
                  )}

                  {results.slice(0, 8).map((movie, index) => (
                    <button
                      key={movie.id}
                      onClick={() => handleSearchSubmit(movie.title)}
                      className={`w-full flex items-center gap-3 px-4 py-4 text-left border-b border-zinc-800/50 last:border-0
                      ${
                        activeIndex === index
                          ? "bg-zinc-800"
                          : "hover:bg-zinc-900"
                      }`}
                    >
                      <Film size={16} className="text-gray-500 shrink-0" />
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-base font-medium text-white truncate">
                          {highlightText(movie.title, query)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {movie.release_date?.split("-")[0] || "N/A"} • Movie
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchInput;
