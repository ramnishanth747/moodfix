import React from 'react';
import { Film } from 'lucide-react';

const GENRES = [
  'All',
  'Action',
  'Comedy',
  'Thriller',
  'Drama',
  'Romance',
  'Science Fiction',
  'Mystery',
  'Horror',
  'Animation',
  'Fantasy'
];

export default function GenreChips({ selectedGenre, onSelectGenre }) {
  return (
    <div className="genre-chips-section">
      <div className="chips-scroll-container">
        {GENRES.map((genre) => {
          const isActive = (selectedGenre === genre) || (!selectedGenre && genre === 'All');
          return (
            <button
              key={genre}
              className={`genre-chip ${isActive ? 'active' : ''}`}
              onClick={() => onSelectGenre(genre === 'All' ? null : genre)}
            >
              {genre === 'All' && <Film size={14} />}
              <span>{genre}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
