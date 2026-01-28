import { useState, useEffect } from 'react';

export const useRecentSearches = () => {
  const [searches, setSearches] = useState(() => {
    const saved = localStorage.getItem('recent_searches');
    return saved ? JSON.parse(saved) : [];
  });

  const addSearch = (term) => {
    const cleanTerm = term.trim();
    if (!cleanTerm) return;

    setSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== cleanTerm.toLowerCase());
      const updated = [cleanTerm, ...filtered].slice(0, 5);
      localStorage.setItem('recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const clearSearches = () => {
    setSearches([]);
    localStorage.removeItem('recent_searches');
  };

  return { searches, addSearch, clearSearches };
};