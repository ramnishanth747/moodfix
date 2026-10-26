import React from 'react';
import { Bookmark, Trash2, CheckCircle2, RotateCcw, Clock } from 'lucide-react';

export default function WatchlistPage({
  watchlist = [],
  onSelectMovie,
  onRemove,
  onUpdateStatus
}) {
  if (watchlist.length === 0) {
    return (
      <div className="empty-state-container">
        <div className="empty-icon-wrap amber-glow">
          <Bookmark size={36} className="amber-text" />
        </div>
        <h2 className="empty-title">Your Watchlist is Empty</h2>
        <p className="empty-desc">
          Browse movies or use the "Find by Mood" tool to save your favorite titles here.
        </p>
      </div>
    );
  }

  const wantToWatch = watchlist.filter(item => item.status === 'WANT_TO_WATCH');
  const watched = watchlist.filter(item => item.status === 'WATCHED');

  return (
    <div className="watchlist-page-content">
      <div className="watchlist-page-header">
        <h1 className="watchlist-heading">My Saved Movies</h1>
        <p className="watchlist-sub">
          {watchlist.length} {watchlist.length === 1 ? 'title' : 'titles'} saved to your demo watchlist in PostgreSQL
        </p>
      </div>

      {/* Want To Watch section */}
      {wantToWatch.length > 0 && (
        <div className="watchlist-group">
          <h2 className="group-title">Up Next ({wantToWatch.length})</h2>
          <div className="watchlist-grid">
            {wantToWatch.map((item) => (
              <WatchlistCard
                key={item.id}
                item={item}
                onSelectMovie={onSelectMovie}
                onRemove={onRemove}
                onUpdateStatus={onUpdateStatus}
              />
            ))}
          </div>
        </div>
      )}

      {/* Watched section */}
      {watched.length > 0 && (
        <div className="watchlist-group">
          <h2 className="group-title">Watched ({watched.length})</h2>
          <div className="watchlist-grid">
            {watched.map((item) => (
              <WatchlistCard
                key={item.id}
                item={item}
                onSelectMovie={onSelectMovie}
                onRemove={onRemove}
                onUpdateStatus={onUpdateStatus}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function WatchlistCard({ item, onSelectMovie, onRemove, onUpdateStatus }) {
  const { movie } = item;
  if (!movie) return null;

  return (
    <div className="watchlist-card" onClick={() => onSelectMovie(movie)}>
      <div className="watchlist-poster-container">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="watchlist-poster-img"
          loading="lazy"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400';
          }}
        />
        <div className="watchlist-badge-status">
          {item.status === 'WATCHED' ? 'WATCHED' : 'SAVED'}
        </div>
      </div>

      <div className="watchlist-info">
        <h3 className="watchlist-title" title={movie.title}>{movie.title}</h3>

        <div className="watchlist-meta-row">
          <span>{movie.releaseYear}</span>
          <span>•</span>
          <span>{movie.language}</span>
          <span>•</span>
          <span>{movie.runtime}m</span>
        </div>

        <div className="watchlist-card-actions" onClick={(e) => e.stopPropagation()}>
          {item.status === 'WANT_TO_WATCH' ? (
            <button
              className="btn-mark-watched"
              onClick={() => onUpdateStatus(item.id, 'WATCHED')}
              title="Mark as watched"
            >
              <CheckCircle2 size={14} />
              <span>Mark Watched</span>
            </button>
          ) : (
            <button
              className="btn-mark-unwatched"
              onClick={() => onUpdateStatus(item.id, 'WANT_TO_WATCH')}
              title="Move back to unwatched"
            >
              <RotateCcw size={14} />
              <span>Rewatch</span>
            </button>
          )}

          <button
            className="btn-remove-item"
            onClick={() => onRemove(item.id)}
            title="Remove from watchlist"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
