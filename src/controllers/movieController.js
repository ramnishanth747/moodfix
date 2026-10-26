const prisma = require('../lib/prisma');

// Whitelist for valid sort fields
const ALLOWED_SORT_FIELDS = ['releaseYear', 'title', 'createdAt', 'rating'];
const ALLOWED_SORT_ORDERS = ['asc', 'desc'];

// GET /api/movies
async function getMovies(req, res, next) {
  try {
    const { search, genre, language, sortBy = 'createdAt', order = 'desc' } = req.query;

    const where = {};

    if (search && search.trim()) {
      where.title = {
        contains: search.trim(),
        mode: 'insensitive'
      };
    }

    if (language && language !== 'All' && language !== 'Any') {
      where.language = {
        equals: language,
        mode: 'insensitive'
      };
    }

    if (genre && genre !== 'All' && genre !== 'Any') {
      where.genres = {
        some: {
          name: {
            equals: genre,
            mode: 'insensitive'
          }
        }
      };
    }

    const sortField = ALLOWED_SORT_FIELDS.includes(sortBy) ? sortBy : 'createdAt';
    const sortOrder = ALLOWED_SORT_ORDERS.includes(order.toLowerCase()) ? order.toLowerCase() : 'desc';

    const movies = await prisma.movie.findMany({
      where,
      orderBy: {
        [sortField]: sortOrder
      },
      include: {
        genres: true,
        moodTags: true,
        experienceTags: true,
        watchlistItems: true
      }
    });

    res.json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/movies/:id
async function getMovieById(req, res, next) {
  try {
    const { id } = req.params;

    const movie = await prisma.movie.findUnique({
      where: { id },
      include: {
        genres: true,
        moodTags: true,
        experienceTags: true,
        watchlistItems: true
      }
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }

    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/movies/featured
async function getFeaturedMovie(req, res, next) {
  try {
    let movie = await prisma.movie.findFirst({
      where: { featured: true },
      include: {
        genres: true,
        moodTags: true,
        experienceTags: true
      }
    });

    if (!movie) {
      movie = await prisma.movie.findFirst({
        orderBy: { rating: 'desc' },
        include: {
          genres: true,
          moodTags: true,
          experienceTags: true
        }
      });
    }

    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getMovies,
  getMovieById,
  getFeaturedMovie
};
