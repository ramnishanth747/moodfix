import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Bookmark, BookmarkCheck } from 'lucide-react';

export default function MovieRow({
  title,
  subtitle,
  badgeText,
  movies = [],
  onSelectMovie,
  onToggleWatchlist,
  watchlistIds = new Set(),
  isRecommendations = false
}) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -550 : 550;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="movie-row-section">
      <div className="row-header">
        <div>
          <div className="row-title-wrap">
            {badgeText && <span className="row-badge-pill">{badgeText}</span>}
            <h2 className="row-title">{title}</h2>
          </div>
          {subtitle && <p className="row-subtitle">{subtitle}</p>}
        </div>

        <div className="row-controls">
          <button
            className="row-arrow left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            className="row-arrow right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="row-cards-container" ref={rowRef}>
        {movies.map((item) => {
          const movie = item.movie || item;
          const isSaved = watchlistIds.has(movie.id);
          const matchPercent = item.matchPercentage;

          return (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => onSelectMovie(movie, item)}
            >
              <div className="poster-wrapper">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="poster-img"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400';
                  }}
                />

                {/* Score badge for recommendation engine results */}
                {isRecommendations && matchPercent !== undefined && (
                  <div className="match-badge">
                    <span>{matchPercent}%</span>
                  </div>
                )}

                {/* Watchlist toggle button */}
                <button
                  className={`card-bookmark-btn ${isSaved ? 'saved' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWatchlist(movie);
                  }}
                  title={isSaved ? "In watchlist" : "Add to watchlist"}
                >
                  {isSaved ? <BookmarkCheck size={15} color="#10b981" /> : <Bookmark size={15} />}
                </button>
              </div>

              <div className="card-info">
                <h3 className="card-title" title={movie.title}>{movie.title}</h3>
                <div className="card-meta">
                  <span>{movie.releaseYear}</span>
                  <span className="dot">•</span>
                  <span>{movie.language}</span>
                  {movie.rating && (
                    <>
                      <span className="dot">•</span>
                      <span className="card-rating">
                        <Star size={11} fill="#f59e0b" color="#f59e0b" />
                        {movie.rating}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
