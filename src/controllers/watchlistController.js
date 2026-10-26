const prisma = require('../lib/prisma');

// GET /api/watchlist - List all watchlist items with full movie details
async function getWatchlist(req, res, next) {
  try {
    const items = await prisma.watchlistItem.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        movie: {
          include: {
            genres: true,
            moodTags: true,
            experienceTags: true
          }
        }
      }
    });

    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/watchlist - Add a movie to watchlist (prevents duplicates)
async function addToWatchlist(req, res, next) {
  try {
    const { movieId, status = 'WANT_TO_WATCH' } = req.body;

    if (!movieId) {
      return res.status(400).json({
        success: false,
        error: 'movieId is required'
      });
    }

    // Verify movie exists
    const movie = await prisma.movie.findUnique({ where: { id: movieId } });
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }

    // Check if movie already in watchlist
    const existing = await prisma.watchlistItem.findUnique({ where: { movieId } });
    if (existing) {
      return res.status(409).json({
        success: false,
        error: 'Movie is already in your watchlist',
        data: existing
      });
    }

    const item = await prisma.watchlistItem.create({
      data: {
        movieId,
        status: status === 'WATCHED' ? 'WATCHED' : 'WANT_TO_WATCH'
      },
      include: {
        movie: true
      }
    });

    res.status(201).json({
      success: true,
      message: 'Movie added to watchlist',
      data: item
    });
  } catch (error) {
    next(error);
  }
}

// PATCH /api/watchlist/:id - Toggle status between WANT_TO_WATCH and WATCHED
async function updateWatchlistItem(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !['WANT_TO_WATCH', 'WATCHED'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "status must be either 'WANT_TO_WATCH' or 'WATCHED'"
      });
    }

    const existing = await prisma.watchlistItem.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Watchlist item not found'
      });
    }

    const updated = await prisma.watchlistItem.update({
      where: { id },
      data: { status },
      include: {
        movie: true
      }
    });

    res.json({
      success: true,
      message: 'Watchlist item updated',
      data: updated
    });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/watchlist/:id - Remove movie from watchlist
async function removeFromWatchlist(req, res, next) {
  try {
    const { id } = req.params;

    const existing = await prisma.watchlistItem.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        error: 'Watchlist item not found'
      });
    }

    await prisma.watchlistItem.delete({ where: { id } });

    res.json({
      success: true,
      message: 'Movie removed from watchlist'
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getWatchlist,
  addToWatchlist,
  updateWatchlistItem,
  removeFromWatchlist
};
