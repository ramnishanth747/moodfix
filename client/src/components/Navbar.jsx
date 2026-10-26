import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bookmark, Sparkles, Film, Compass, Layers, Menu, X } from 'lucide-react';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  onOpenMoodFinder,
  watchlistCount
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isCurrent = (path) => location.pathname === path;

  return (
    <nav className="nav-container">
      <div className="nav-content">
        {/* Brand Logo */}
        <div className="nav-brand" onClick={() => navigate('/')}>
          <Film size={20} className="amber-text" />
          <span className="brand-title">Mood<span className="brand-highlight">Flix</span></span>
        </div>

        {/* Desktop Nav Links: Home, Find by Mood, Movies, Watchlist */}
        <div className="nav-links">
          <button
            className={`nav-link ${isCurrent('/') ? 'active' : ''}`}
            onClick={() => navigate('/')}
            id="nav-home"
          >
            <span>Home</span>
          </button>
          <button
            className="nav-link"
            onClick={onOpenMoodFinder}
            id="nav-find-mood"
          >
            <span>Find by Mood</span>
          </button>
          <button
            className={`nav-link ${isCurrent('/movies') ? 'active' : ''}`}
            onClick={() => navigate('/movies')}
            id="nav-movies"
          >
            <span>Movies</span>
          </button>
          <button
            className={`nav-link ${isCurrent('/watchlist') ? 'active' : ''}`}
            onClick={() => navigate('/watchlist')}
            id="nav-watchlist"
          >
            <span>Watchlist</span>
            {watchlistCount > 0 && (
              <span className="badge-count">{watchlistCount}</span>
            )}
          </button>
        </div>

        {/* Right Actions: Search + Find by Mood */}
        <div className="nav-actions">
          <div className="search-bar">
            <Search size={15} className="search-icon" />
            <input
              type="text"
              placeholder="Search title, genre, language..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (location.pathname !== '/movies' && e.target.value.trim()) {
                  navigate('/movies');
                }
              }}
              className="search-input"
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                <X size={13} />
              </button>
            )}
          </div>

          <button
            className="btn-mood-action"
            onClick={onOpenMoodFinder}
            title="Discover movies by your current vibe"
          >
            <Sparkles size={15} />
            <span>Find by Mood</span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu">
          <button
            className={`mobile-link ${isCurrent('/') ? 'active' : ''}`}
            onClick={() => { navigate('/'); setMobileMenuOpen(false); }}
          >
            <span>Home</span>
          </button>
          <button
            className="mobile-link"
            onClick={() => { onOpenMoodFinder(); setMobileMenuOpen(false); }}
          >
            <span>Find by Mood</span>
          </button>
          <button
            className={`mobile-link ${isCurrent('/movies') ? 'active' : ''}`}
            onClick={() => { navigate('/movies'); setMobileMenuOpen(false); }}
          >
            <span>Movies</span>
          </button>
          <button
            className={`mobile-link ${isCurrent('/watchlist') ? 'active' : ''}`}
            onClick={() => { navigate('/watchlist'); setMobileMenuOpen(false); }}
          >
            <span>Watchlist ({watchlistCount})</span>
          </button>
        </div>
      )}
    </nav>
  );
}
