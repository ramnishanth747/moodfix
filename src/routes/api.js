const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');
const recommendationController = require('../controllers/recommendationController');
const watchlistController = require('../controllers/watchlistController');

// Movie routes
router.get('/movies', movieController.getMovies);
router.get('/movies/featured', movieController.getFeaturedMovie);
router.get('/movies/:id', movieController.getMovieById);

// Recommendation routes
router.post('/recommendations', recommendationController.getRecommendations);
router.get('/moods', recommendationController.getMoodMetadata);

// Watchlist routes
router.get('/watchlist', watchlistController.getWatchlist);
router.post('/watchlist', watchlistController.addToWatchlist);
router.patch('/watchlist/:id', watchlistController.updateWatchlistItem);
router.delete('/watchlist/:id', watchlistController.removeFromWatchlist);

module.exports = router;
