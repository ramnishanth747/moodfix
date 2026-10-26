import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { movieService } from '../services/api';
import {
  Sparkles,
  SlidersHorizontal,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  Bookmark,
  BookmarkCheck,
  ArrowLeft,
  RefreshCw,
  Film,
  Info
} from 'lucide-react';

export default function RecommendationsPage({
  onSelectMovie,
  onToggleWatchlist,
  watchlistIds = new Set(),
  onOpenMoodFinder
}) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);

  // Extract preferences from URL search parameters
  const mood = searchParams.get('mood');
  const genre = searchParams.get('genre') || undefined;
  const language = searchParams.get('language') || undefined;
  const maxRuntime = searchParams.get('maxRuntime') || undefined;
  const experience = searchParams.get('experience') || undefined;

  const fetchRecommendations = async () => {
    // If user navigates directly without mood parameter
    if (!mood) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const payload = {
        mood,
        genre,
        language,
        maxRuntime,
        experience,
        limit: 9
      };

      const response = await movieService.getRecommendations(payload);
      setResults(response.data || []);
    } catch (err) {
      console.error('Failed to fetch recommendations:', err);
      setError(err.response?.data?.error || 'Unable to connect to the recommendation engine. Please verify the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, [searchParams]);

  // Case 1: Missing mood preference (Direct navigation or wiped URL)
  if (!mood) {
    return (
      <div className="results-container">
        <div className="empty-results-box">
          <div className="empty-icon-wrap amber-glow">
            <SlidersHorizontal size={36} className="amber-text" />
          </div>
          <h2 className="empty-title">No Vibe Selected Yet</h2>
          <p className="empty-desc">
            To generate personalized recommendations, select your current mood and viewing preferences.
          </p>
          <button className="btn-amber-submit" onClick={onOpenMoodFinder}>
            <Sparkles size={16} />
            <span>Tune Into Your Vibe</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="results-container">
      {/* Results Header */}
      <div className="results-header-banner">
        <div className="results-header-top">
          <button className="btn-back-link" onClick={() => navigate('/')}>
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </button>

          <button className="btn-secondary" onClick={onOpenMoodFinder}>
            <SlidersHorizontal size={14} />
            <span>Change Preferences</span>
          </button>
        </div>

        <div className="results-title-group">
          <h1 className="results-main-title">
            Your recommendations
          </h1>
          <p className="results-subtitle">
            Based on your selected mood ({mood}) and viewing preferences.
          </p>
        </div>

        {/* Selected Criteria Tags */}
        <div className="active-preferences-row">
          <span className="pref-tag">Mood: {mood}</span>
          {genre && <span className="pref-tag">Genre: {genre}</span>}
          {language && <span className="pref-tag">Language: {language}</span>}
          {maxRuntime && <span className="pref-tag">Runtime: {maxRuntime}</span>}
          {experience && <span className="pref-tag">Experience: {experience}</span>}
        </div>
      </div>

      {/* State 1: Loading */}
      {loading && (
        <div className="results-loading-state">
          <div className="spinner"></div>
          <p>Finding movies that match your mood...</p>
        </div>
      )}

      {/* State 2: Error */}
      {!loading && error && (
        <div className="results-error-state">
          <AlertCircle size={28} className="error-icon" />
          <h3>Could not load recommendations</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={fetchRecommendations}>
            <RefreshCw size={14} />
            <span>Try Again</span>
          </button>
        </div>
      )}

      {/* State 3: Empty Results */}
      {!loading && !error && results.length === 0 && (
        <div className="empty-results-box">
          <Film size={32} />
          <h2 className="empty-title">No movies found</h2>
          <p className="empty-desc">
            No films matched this exact set of preferences. Try broadening your criteria or setting Genre/Language to "Any".
          </p>
          <button className="btn-primary" onClick={onOpenMoodFinder}>
            Change Preferences
          </button>
        </div>
      )}

      {/* State 4: Recommendation Cards Grid */}
      {!loading && !error && results.length > 0 && (
        <div className="recommendations-display-grid">
          {results.map((item, index) => {
            const { movie, matchPercentage, matchReasons } = item;
            const isSaved = watchlistIds.has(movie.id);

            return (
              <div
                key={movie.id}
                className="rec-card"
                onClick={() => onSelectMovie(movie, item)}
              >
                {/* Poster Container */}
                <div className="rec-poster-container">
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    className="rec-poster-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400';
                    }}
                  />

                  {/* Score Badge */}
                  <div className="rec-score-badge">
                    <span>{matchPercentage}% Match</span>
                  </div>

                  {/* Watchlist Button */}
                  <button
                    className={`rec-bookmark-btn ${isSaved ? 'saved' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatchlist(movie);
                    }}
                    title={isSaved ? 'In Watchlist' : 'Add to Watchlist'}
                  >
                    {isSaved ? <BookmarkCheck size={16} color="#10b981" /> : <Bookmark size={16} />}
                  </button>
                </div>

                {/* Card Details */}
                <div className="rec-info-pane">
                  <div className="rec-title-row">
                    <h3 className="rec-title" title={movie.title}>{movie.title}</h3>
                  </div>

                  <div className="rec-meta-row">
                    <span>{movie.releaseYear}</span>
                    <span>•</span>
                    <span>{movie.language}</span>
                    <span>•</span>
                    <span>{movie.runtime}m</span>
                    {movie.rating && (
                      <>
                        <span>•</span>
                        <span className="rec-rating">★ {movie.rating}</span>
                      </>
                    )}
                  </div>

                  <p className="rec-description">{movie.description}</p>

                  {/* Match Explanation */}
                  {matchReasons && matchReasons.length > 0 && (
                    <div className="rec-reasons-preview">
                      {matchReasons.slice(0, 2).map((reason, rIdx) => (
                        <div key={rIdx} className="rec-reason-item">
                          <CheckCircle2 size={13} className="check-icon" />
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="rec-card-actions">
                    <span className="btn-details-link">
                      <Info size={14} />
                      <span>Details</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
