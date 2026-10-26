import React from 'react';
import { X, Star, Clock, Globe, Calendar, Bookmark, BookmarkCheck, Play, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function MovieDetailModal({
  movie,
  analysisData,
  onClose,
  onToggleWatchlist,
  isSaved,
  onUpdateWatchlistStatus,
  watchlistItem
}) {
  if (!movie) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container detail-modal" onClick={(e) => e.stopPropagation()}>
        {/* Backdrop Banner with warm gradient overlay */}
        <div
          className="detail-backdrop"
          style={{
            backgroundImage: `url(${movie.backdropUrl || movie.posterUrl})`
          }}
        >
          <button className="detail-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
          <div className="detail-backdrop-gradient"></div>
        </div>

        {/* Modal Body */}
        <div className="detail-body">
          <div className="detail-top-row">
            <div>
              <div className="detail-badges">
                <span className="badge-lang">{movie.language}</span>
                {movie.rating && (
                  <span className="badge-rating">
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    {movie.rating} / 10
                  </span>
                )}
                <span className="badge-year">{movie.releaseYear}</span>
                <span className="badge-runtime">
                  <Clock size={12} />
                  {movie.runtime} min
                </span>
              </div>
              <h1 className="detail-title">{movie.title}</h1>
            </div>

            <div className="detail-actions">
              <button
                className={`btn-action-primary ${isSaved ? 'in-watchlist' : ''}`}
                onClick={() => onToggleWatchlist(movie)}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck size={16} color="#10b981" />
                    <span>In Watchlist</span>
                  </>
                ) : (
                  <>
                    <Bookmark size={16} />
                    <span>Add to Watchlist</span>
                  </>
                )}
              </button>

              {movie.trailerUrl && (
                <a
                  href={movie.trailerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-amber-trailer"
                >
                  <Play size={14} fill="currentColor" />
                  <span>Trailer</span>
                </a>
              )}
            </div>
          </div>

          {/* Watchlist status toggling */}
          {watchlistItem && (
            <div className="watchlist-status-bar">
              <span className="status-label">Watchlist Status:</span>
              <div className="status-toggle-group">
                <button
                  className={`status-btn ${watchlistItem.status === 'WANT_TO_WATCH' ? 'active' : ''}`}
                  onClick={() => onUpdateWatchlistStatus(watchlistItem.id, 'WANT_TO_WATCH')}
                >
                  Want to Watch
                </button>
                <button
                  className={`status-btn ${watchlistItem.status === 'WATCHED' ? 'active' : ''}`}
                  onClick={() => onUpdateWatchlistStatus(watchlistItem.id, 'WATCHED')}
                >
                  <CheckCircle2 size={13} />
                  Mark as Watched
                </button>
              </div>
            </div>
          )}

          {/* Explainable Recommendation Breakdown (Viva Highlight) */}
          {analysisData && analysisData.matchPercentage !== undefined && (
            <div className="recommendation-explanation-box">
              <div className="match-score-header">
                <div className="score-circle">
                  <span className="score-number">{analysisData.matchPercentage}%</span>
                </div>
                <div>
                  <h3 className="score-title">Recommendation Match Score</h3>
                  <p className="score-desc">Calculated by the MoodFlix multi-factor deterministic scoring engine</p>
                </div>
              </div>

              {analysisData.matchReasons && analysisData.matchReasons.length > 0 && (
                <div className="match-reasons-list">
                  <h4 className="reasons-heading">Why this matches your vibe:</h4>
                  <ul>
                    {analysisData.matchReasons.map((reason, idx) => (
                      <li key={idx}>
                        <CheckCircle2 size={14} className="reason-icon-success" />
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {analysisData.mismatches && analysisData.mismatches.length > 0 && (
                <div className="mismatches-list">
                  <ul>
                    {analysisData.mismatches.map((item, idx) => (
                      <li key={idx}>
                        <AlertCircle size={14} className="reason-icon-warning" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Movie Description */}
          <div className="detail-section">
            <h3 className="section-title">Overview</h3>
            <p className="detail-overview">{movie.description}</p>
          </div>

          {/* Tags & Categories Grid */}
          <div className="tags-grid">
            <div className="tag-group">
              <span className="tag-group-title">Genres</span>
              <div className="tag-items">
                {(movie.genres || []).map(g => (
                  <span key={g.id || g.name} className="pill-tag">{g.name}</span>
                ))}
              </div>
            </div>

            <div className="tag-group">
              <span className="tag-group-title">Mood Vibe</span>
              <div className="tag-items">
                {(movie.moodTags || []).map(m => (
                  <span key={m.id || m.name} className="pill-tag mood">{m.name}</span>
                ))}
              </div>
            </div>

            <div className="tag-group">
              <span className="tag-group-title">Experience</span>
              <div className="tag-items">
                {(movie.experienceTags || []).map(e => (
                  <span key={e.id || e.name} className="pill-tag experience">{e.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
