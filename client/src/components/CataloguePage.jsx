import React, { useMemo, useState } from 'react';
import GenreChips from './GenreChips';
import { Film, ChevronDown, Check } from 'lucide-react';

const INITIAL_BATCH_SIZE = 24;
const LOAD_MORE_INCREMENT = 24;

export default function CataloguePage({
  movies = [],
  selectedGenre,
  onSelectGenre,
  searchTerm,
  onSelectMovie
}) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH_SIZE);

  // Filter movies memoized
  const filtered = useMemo(() => {
    return movies.filter(m => {
      const matchesSearch = !searchTerm.trim() ||
        m.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        m.language.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        (m.genres || []).some(g => g.name.toLowerCase().includes(searchTerm.toLowerCase().trim()));

      const matchesGenre = !selectedGenre ||
        (m.genres || []).some(g => g.name.toLowerCase() === selectedGenre.toLowerCase());

      return matchesSearch && matchesGenre;
    });
  }, [movies, searchTerm, selectedGenre]);

  // Sliced movies for rendering
  const displayedMovies = useMemo(() => {
    return filtered.slice(0, visibleCount);
  }, [filtered, visibleCount]);

  const handleShowMore = () => {
    setVisibleCount(prev => prev + LOAD_MORE_INCREMENT);
  };

  return (
    <div className="browse-all-container">
      <div className="browse-header">
        <h1 className="browse-title">
          {searchTerm ? `Search Results for "${searchTerm}"` : 'Complete Film Catalogue'}
        </h1>
        <p className="browse-subtitle">
          Showing {displayedMovies.length} of {filtered.length} matching titles ({movies.length} total in PostgreSQL library)
        </p>
      </div>

      <GenreChips
        selectedGenre={selectedGenre}
        onSelectGenre={(genre) => {
          onSelectGenre(genre);
          setVisibleCount(INITIAL_BATCH_SIZE); // Reset pagination on genre switch
        }}
      />

      {filtered.length === 0 ? (
        <div className="empty-results-box">
          <Film size={36} className="empty-icon" />
          <h3 className="empty-title">No movies found</h3>
          <p className="empty-desc">Try clearing your search or selecting a different genre.</p>
        </div>
      ) : (
        <>
          <div className="movies-dense-grid">
            {displayedMovies.map(movie => (
              <div
                key={movie.id}
                className="movie-grid-card"
                onClick={() => onSelectMovie(movie)}
              >
                <div className="grid-poster-wrap">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="grid-poster-img"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400';
                    }}
                  />
                  <div className="grid-card-overlay">
                    <span className="grid-details-pill">Quick View</span>
                  </div>
                </div>
                <h4 className="grid-card-title" title={movie.title}>{movie.title}</h4>
                <div className="grid-card-sub">
                  <span>{movie.releaseYear}</span>
                  <span>•</span>
                  <span>{movie.language}</span>
                  {movie.rating && (
                    <>
                      <span>•</span>
                      <span className="card-rating">★ {movie.rating}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Show More pagination button if items exceed visible count */}
          {visibleCount < filtered.length && (
            <div className="show-more-container">
              <button className="btn-show-more" onClick={handleShowMore}>
                <span>Show More Movies ({filtered.length - visibleCount} remaining)</span>
                <ChevronDown size={16} />
              </button>
            </div>
          )}

          {visibleCount >= filtered.length && filtered.length > INITIAL_BATCH_SIZE && (
            <div className="end-of-catalogue-note">
              <Check size={14} className="amber-text" />
              <span>You have reached the end of the catalogue ({filtered.length} films loaded).</span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

