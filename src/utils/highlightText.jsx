import React from 'react';

export const highlightText = (text, query) => {
  if (!query || !text) return text;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  
  return parts.map((part, index) => 
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="text-red-500 font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
};