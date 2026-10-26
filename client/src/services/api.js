import axios from 'axios';

// Connect to the real Express backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const movieService = {
  // GET /api/movies with query filters
  async getMovies(params = {}) {
    const res = await api.get('/movies', { params });
    return res.data;
  },

  // GET /api/movies/featured
  async getFeatured() {
    const res = await api.get('/movies/featured');
    return res.data;
  },

  // GET /api/movies/:id
  async getMovieById(id) {
    const res = await api.get(`/movies/${id}`);
    return res.data;
  },

  // GET /api/moods (lists tags, genres, and metadata)
  async getMoodMetadata() {
    const res = await api.get('/moods');
    return res.data;
  },

  // POST /api/recommendations
  async getRecommendations(preferences) {
    const res = await api.post('/recommendations', preferences);
    return res.data;
  },

  // Watchlist endpoints
  async getWatchlist() {
    const res = await api.get('/watchlist');
    return res.data;
  },

  async addToWatchlist(movieId, status = 'WANT_TO_WATCH') {
    const res = await api.post('/watchlist', { movieId, status });
    return res.data;
  },

  async updateWatchlistItem(id, status) {
    const res = await api.patch(`/watchlist/${id}`, { status });
    return res.data;
  },

  async removeFromWatchlist(id) {
    const res = await api.delete(`/watchlist/${id}`);
    return res.data;
  }
};

export default api;
