import React from 'react';
import { Clock, Trash2 } from 'lucide-react';

const RecentSearchList = ({ searches, activeIndex, onSelect, onClear }) => {
  if (searches.length === 0) return null;

  return (
    <div className="p-2">
      <div className="flex items-center justify-between px-3 py-2">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recent Searches</span>
        <button 
          onClick={(e) => { e.stopPropagation(); onClear(); }}
          className="text-[10px] text-red-500 hover:underline flex items-center gap-1"
        >
          <Trash2 size={10} /> Clear
        </button>
      </div>
      {searches.map((term, index) => (
        <button
          key={term}
          onClick={() => onSelect(term)}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 rounded transition-colors
            ${activeIndex === index ? 'bg-zinc-800 text-white' : 'hover:bg-zinc-900'}`}
        >
          <Clock size={14} className="text-gray-500" />
          {term}
        </button>
      ))}
    </div>
  );
};

export default RecentSearchList;