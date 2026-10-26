import React from 'react';
import { Info, Bookmark, BookmarkCheck, Star, Clock } from 'lucide-react';

export default function FeaturedHero({
  featuredMovie,
  sideRecommendations,
  onSelectMovie,
  onToggleWatchlist,
  watchlistIds,
  onOpenMoodFinder
}) {
  if (!featuredMovie) return null;

  const isSaved = watchlistIds.has(featuredMovie.id);

  return (
    <div className="hero-grid">
      {/* Main Featured Movie Banner */}
      <div className="featured-panel">
        <div
          className="featured-backdrop"
          style={{
            backgroundImage: `url(${featuredMovie.backdropUrl || featuredMovie.posterUrl})`
          }}
        >
          <div className="featured-overlay"></div>
        </div>

        <div className="featured-content">
          <div className="featured-meta-top">
            <span className="featured-year">{featuredMovie.releaseYear}</span>
            <span className="meta-separator">•</span>
            <span className="featured-runtime">
              <Clock size={13} />
              {featuredMovie.runtime} min
            </span>
            <span className="meta-separator">•</span>
            <span className="featured-language">{featuredMovie.language}</span>
            {featuredMovie.rating && (
              <>
                <span className="meta-separator">•</span>
                <span className="featured-rating">
                  <Star size={13} fill="#f59e0b" color="#f59e0b" />
                  {featuredMovie.rating}
                </span>
              </>
            )}
          </div>

          <h1 className="featured-title">{featuredMovie.title}</h1>

          <div className="featured-genres">
            {(featuredMovie.genres || []).map(g => g.name).join(', ')}
          </div>

          <p className="featured-description">{featuredMovie.description}</p>

          <div className="featured-actions">
            <button
              className="btn-primary"
              onClick={() => onSelectMovie(featuredMovie)}
            >
              <Info size={16} />
              <span>View Details</span>
            </button>

            <button
              className={`btn-secondary ${isSaved ? 'saved' : ''}`}
              onClick={() => onToggleWatchlist(featuredMovie)}
            >
              {isSaved ? <BookmarkCheck size={16} color="#10b981" /> : <Bookmark size={16} />}
              <span>{isSaved ? 'In Watchlist' : 'Add to Watchlist'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recommendations Sidebar */}
      <div className="sidebar-picks-panel">
        <div className="sidebar-header">
          <h2 className="sidebar-title">Recommended</h2>
        </div>

        <div className="sidebar-list">
          {(sideRecommendations || []).slice(0, 3).map((item, idx) => {
            const movie = item.movie || item;
            return (
              <div
                key={movie.id || idx}
                className="side-pick-item"
                onClick={() => onSelectMovie(movie, item)}
              >
                <div className="side-pick-thumb-wrapper">
                  <img
                    src={movie.backdropUrl || movie.posterUrl}
                    alt={movie.title}
                    className="side-pick-thumb"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400';
                    }}
                  />
                </div>

                <div className="side-pick-meta">
                  <h4 className="side-pick-title">{movie.title}</h4>
                  <div className="side-pick-subtext">
                    <span>{movie.releaseYear}</span>
                    <span>•</span>
                    <span>{movie.runtime}m</span>
                    <span>•</span>
                    <span>{movie.language}</span>
                  </div>
                  <div className="side-pick-genre">
                    {(movie.genres || []).slice(0, 2).map(g => g.name).join(', ')}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
