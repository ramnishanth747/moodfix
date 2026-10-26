import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import FeaturedHero from './components/FeaturedHero';
import MovieRow from './components/MovieRow';
import MoodFinderModal from './components/MoodFinderModal';
import MovieDetailModal from './components/MovieDetailModal';
import WatchlistPage from './components/WatchlistPage';
import CataloguePage from './components/CataloguePage';
import RecommendationsPage from './components/RecommendationsPage';
import { movieService } from './services/api';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import './App.css';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [movies, setMovies] = useState([]);
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [isMoodModalOpen, setIsMoodModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);

  // Status state
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Set of IDs in watchlist for O(1) quick lookups
  const watchlistIds = useMemo(() => {
    return new Set(watchlist.map(item => item.movieId));
  }, [watchlist]);

  // Show transient toast notifications
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Fetch initial data from PostgreSQL via Express
  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const [moviesRes, featuredRes, watchlistRes] = await Promise.all([
        movieService.getMovies(),
        movieService.getFeatured(),
        movieService.getWatchlist()
      ]);

      setMovies(moviesRes.data || []);
      setFeaturedMovie(featuredRes.data || (moviesRes.data && moviesRes.data[0]));
      setWatchlist(watchlistRes.data || []);
    } catch (err) {
      console.error('Failed to load initial data:', err);
      setErrorMessage('Could not connect to the MoodFlix backend server. Please verify the PostgreSQL service and backend are running.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Watchlist Actions
  const handleToggleWatchlist = async (movie) => {
    const existing = watchlist.find(item => item.movieId === movie.id);

    try {
      if (existing) {
        await movieService.removeFromWatchlist(existing.id);
        setWatchlist(prev => prev.filter(i => i.id !== existing.id));
        showToast(`Removed "${movie.title}" from watchlist`);
      } else {
        const res = await movieService.addToWatchlist(movie.id);
        setWatchlist(prev => [res.data, ...prev]);
        showToast(`Added "${movie.title}" to watchlist`);
      }
    } catch (err) {
      console.error('Watchlist action error:', err);
      showToast('Could not update watchlist. Please check connection.');
    }
  };

  const handleUpdateWatchlistStatus = async (watchlistId, newStatus) => {
    try {
      const res = await movieService.updateWatchlistItem(watchlistId, newStatus);
      setWatchlist(prev => prev.map(item => item.id === watchlistId ? res.data : item));
      showToast(`Updated status to ${newStatus === 'WATCHED' ? 'Watched' : 'Want to Watch'}`);
    } catch (err) {
      console.error('Failed to update status:', err);
      showToast('Could not update status.');
    }
  };

  const handleRemoveFromWatchlist = async (watchlistId) => {
    try {
      await movieService.removeFromWatchlist(watchlistId);
      setWatchlist(prev => prev.filter(item => item.id !== watchlistId));
      showToast('Movie removed from watchlist');
    } catch (err) {
      console.error('Failed to remove from watchlist:', err);
      showToast('Could not remove item.');
    }
  };

  // 1. Trending: Defined by high ratings in database
  const trendingMovies = useMemo(() => {
    return [...movies].sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 12);
  }, [movies]);

  // Sidebar recommendations: top rated movies distinct from featuredMovie to prevent repetition
  const sidebarRecommendations = useMemo(() => {
    if (!featuredMovie) return trendingMovies.slice(0, 3);
    return movies
      .filter(m => m.id !== featuredMovie.id)
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  }, [movies, featuredMovie, trendingMovies]);

  // 2. Recently Added: Defined by creation date
  const recentlyAddedMovies = useMemo(() => {
    return [...movies].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 12);
  }, [movies]);

  // 3. User Watchlist Movies (populated from actual watchlist table)
  const watchlistMovies = useMemo(() => {
    return watchlist.map(w => w.movie).filter(Boolean);
  }, [watchlist]);

  return (
    <div className="moodflix-app">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onOpenMoodFinder={() => setIsMoodModalOpen(true)}
        watchlistCount={watchlist.length}
      />

      <main className="main-content">
        {/* Error State Banner */}
        {errorMessage && (
          <div className="error-banner">
            <AlertTriangle size={20} color="#ef4444" />
            <div className="error-text">
              <strong>Connection Error:</strong> {errorMessage}
            </div>
            <button className="btn-retry" onClick={loadInitialData}>
              <RefreshCw size={15} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Connecting to MoodFlix catalog...</p>
          </div>
        )}

        {!isLoading && !errorMessage && (
          <Routes>
            {/* ROUTE 1: Home */}
            <Route
              path="/"
              element={
                <>
                  <FeaturedHero
                    featuredMovie={featuredMovie}
                    sideRecommendations={sidebarRecommendations}
                    onSelectMovie={(movie, analysis) => {
                      setSelectedMovie(movie);
                      setSelectedAnalysis(analysis || null);
                    }}
                    onToggleWatchlist={handleToggleWatchlist}
                    watchlistIds={watchlistIds}
                    onOpenMoodFinder={() => setIsMoodModalOpen(true)}
                  />

                  {/* 1. Trending */}
                  <MovieRow
                    title="Trending Movies"
                    movies={trendingMovies}
                    onSelectMovie={(movie) => {
                      setSelectedMovie(movie);
                      setSelectedAnalysis(null);
                    }}
                    onToggleWatchlist={handleToggleWatchlist}
                    watchlistIds={watchlistIds}
                  />

                  {/* 2. Recently Added */}
                  <MovieRow
                    title="Recently Added"
                    movies={recentlyAddedMovies}
                    onSelectMovie={(movie) => {
                      setSelectedMovie(movie);
                      setSelectedAnalysis(null);
                    }}
                    onToggleWatchlist={handleToggleWatchlist}
                    watchlistIds={watchlistIds}
                  />

                  {/* 3. Watchlist (if user has saved items) */}
                  {watchlistMovies.length > 0 && (
                    <MovieRow
                      title="Your Watchlist"
                      movies={watchlistMovies}
                      onSelectMovie={(movie) => {
                        setSelectedMovie(movie);
                        setSelectedAnalysis(null);
                      }}
                      onToggleWatchlist={handleToggleWatchlist}
                      watchlistIds={watchlistIds}
                    />
                  )}
                </>
              }
            />

            {/* ROUTE 2: Dedicated Recommendations Results Page */}
            <Route
              path="/discover/results"
              element={
                <RecommendationsPage
                  onSelectMovie={(movie, analysis) => {
                    setSelectedMovie(movie);
                    setSelectedAnalysis(analysis || null);
                  }}
                  onToggleWatchlist={handleToggleWatchlist}
                  watchlistIds={watchlistIds}
                  onOpenMoodFinder={() => setIsMoodModalOpen(true)}
                />
              }
            />

            {/* ROUTE 3: Movie Catalogue / Search */}
            <Route
              path="/movies"
              element={
                <CataloguePage
                  movies={movies}
                  selectedGenre={selectedGenre}
                  onSelectGenre={setSelectedGenre}
                  searchTerm={searchTerm}
                  onSelectMovie={(movie) => {
                    setSelectedMovie(movie);
                    setSelectedAnalysis(null);
                  }}
                />
              }
            />

            {/* ROUTE 4: Watchlist */}
            <Route
              path="/watchlist"
              element={
                <WatchlistPage
                  watchlist={watchlist}
                  onSelectMovie={(movie) => {
                    setSelectedMovie(movie);
                    setSelectedAnalysis(null);
                  }}
                  onRemove={handleRemoveFromWatchlist}
                  onUpdateStatus={handleUpdateWatchlistStatus}
                />
              }
            />
          </Routes>
        )}
      </main>

      {/* Mood Discovery Modal */}
      <MoodFinderModal
        isOpen={isMoodModalOpen}
        onClose={() => setIsMoodModalOpen(false)}
      />

      {/* Movie Details Modal */}
      <MovieDetailModal
        movie={selectedMovie}
        analysisData={selectedAnalysis}
        onClose={() => {
          setSelectedMovie(null);
          setSelectedAnalysis(null);
        }}
        onToggleWatchlist={handleToggleWatchlist}
        isSaved={selectedMovie ? watchlistIds.has(selectedMovie.id) : false}
        onUpdateWatchlistStatus={handleUpdateWatchlistStatus}
        watchlistItem={selectedMovie ? watchlist.find(item => item.movieId === selectedMovie.id) : null}
      />

      {/* Footer */}
      <footer className="footer-bar">
        <div className="footer-content">
          <div className="footer-left">
            <span className="footer-logo">Mood<span className="brand-highlight">Flix</span></span>
            <span className="footer-tagline">• Stop scrolling. Find your vibe.</span>
          </div>
          <div className="footer-right">
            <span>Academic Micro-Project • React + React Router + Node.js + PostgreSQL + Prisma</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
