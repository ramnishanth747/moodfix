import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Sparkles, SlidersHorizontal, ArrowRight } from 'lucide-react';

const MOODS = [
  { name: 'Happy', emoji: '☀️', desc: 'Uplifting & joyful' },
  { name: 'Sad', emoji: '🌧️', desc: 'Reflective & moving' },
  { name: 'Heartbroken', emoji: '💔', desc: 'Deep & cathartic' },
  { name: 'Bored', emoji: '⚡', desc: 'Fast-paced & thrilling' },
  { name: 'Adventurous', emoji: '🏔️', desc: 'Epic journeys & quests' },
  { name: 'Relaxed', emoji: '🍃', desc: 'Cozy & feel-good' },
  { name: 'Curious', emoji: '🔍', desc: 'Mysteries & twists' },
  { name: 'Nostalgic', emoji: '📼', desc: 'Warm vintage memories' }
];

const GENRES = [
  'Any', 'Action', 'Comedy', 'Thriller', 'Drama',
  'Romance', 'Science Fiction', 'Mystery', 'Animation', 'Horror', 'Fantasy'
];

const LANGUAGES = [
  'Any', 'Telugu', 'Hindi', 'English', 'Tamil',
  'Malayalam', 'Kannada', 'Korean', 'Japanese'
];

const RUNTIMES = [
  'Any',
  'Under 90 minutes',
  '90–120 minutes',
  'More than 120 minutes'
];

const EXPERIENCES = [
  'Any',
  'Mind-bending plot',
  'Emotional storytelling',
  'Lighthearted entertainment',
  'Suspense and mystery',
  'Feel-good experience',
  'Action and adventure'
];

export default function MoodFinderModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const [mood, setMood] = useState('Curious');
  const [genre, setGenre] = useState('Any');
  const [language, setLanguage] = useState('Any');
  const [maxRuntime, setMaxRuntime] = useState('Any');
  const [experience, setExperience] = useState('Any');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Build URL search params for bookmarkable, refresh-safe, router-friendly navigation
    const params = new URLSearchParams();
    if (mood) params.set('mood', mood);
    if (genre && genre !== 'Any') params.set('genre', genre);
    if (language && language !== 'Any') params.set('language', language);
    if (maxRuntime && maxRuntime !== 'Any') params.set('maxRuntime', maxRuntime);
    if (experience && experience !== 'Any') params.set('experience', experience);

    // Close modal
    onClose();

    // Navigate to dedicated route in same tab
    navigate(`/discover/results?${params.toString()}`);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container mood-modal" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Find by Mood</h2>
            <p className="modal-subtitle">Select what you feel like watching right now.</p>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="mood-form">
          {/* Mood Selection: Simple Selectable Buttons */}
          <div className="form-group">
            <label className="form-label">How are you feeling?</label>
            <div className="mood-buttons-grid">
              {MOODS.map((m) => (
                <button
                  type="button"
                  key={m.name}
                  className={`mood-select-btn ${mood === m.name ? 'active' : ''}`}
                  onClick={() => setMood(m.name)}
                >
                  <span className="mood-emoji">{m.emoji}</span>
                  <span className="mood-name">{m.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="form-two-cols">
            {/* Preferred Genre */}
            <div className="form-group">
              <label className="form-label">Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="form-select"
              >
                {GENRES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Language */}
            <div className="form-group">
              <label className="form-label">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="form-select"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-two-cols">
            {/* Runtime */}
            <div className="form-group">
              <label className="form-label">Runtime</label>
              <select
                value={maxRuntime}
                onChange={(e) => setMaxRuntime(e.target.value)}
                className="form-select"
              >
                {RUNTIMES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Desired Experience */}
            <div className="form-group">
              <label className="form-label">Viewing Experience</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="form-select"
              >
                {EXPERIENCES.map((exp) => (
                  <option key={exp} value={exp}>{exp}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Find My Movie
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
