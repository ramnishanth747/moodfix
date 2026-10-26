const prisma = require('../lib/prisma');
const { rankRecommendations } = require('../services/recommendationService');

// POST /api/recommendations
async function getRecommendations(req, res, next) {
  try {
    const { mood, genre, language, maxRuntime, experience, limit = 3 } = req.body || {};

    // Validate that inputs are strings or undefined/null
    const preferences = {
      mood: typeof mood === 'string' ? mood.trim() : undefined,
      genre: typeof genre === 'string' ? genre.trim() : undefined,
      language: typeof language === 'string' ? language.trim() : undefined,
      maxRuntime: maxRuntime || undefined,
      experience: typeof experience === 'string' ? experience.trim() : undefined
    };

    // Fetch candidate movies from PostgreSQL
    const candidates = await prisma.movie.findMany({
      include: {
        genres: true,
        moodTags: true,
        experienceTags: true,
        watchlistItems: true
      }
    });

    if (candidates.length === 0) {
      return res.json({
        success: true,
        count: 0,
        preferences,
        data: []
      });
    }

    const ranked = rankRecommendations(candidates, preferences);

    // Take top results (default 3)
    const topResults = ranked.slice(0, Number(limit) || 3).map(item => ({
      movie: item.movie,
      matchPercentage: item.matchPercentage,
      matchReasons: item.matchReasons,
      mismatches: item.mismatches
    }));

    res.json({
      success: true,
      count: topResults.length,
      preferences,
      data: topResults
    });
  } catch (error) {
    next(error);
  }
}

// GET /api/moods - Return available moods, genres, and experiences for dynamic forms
async function getMoodMetadata(req, res, next) {
  try {
    const [moods, genres, experiences] = await Promise.all([
      prisma.moodTag.findMany({ select: { name: true }, orderBy: { name: 'asc' } }),
      prisma.genre.findMany({ select: { name: true }, orderBy: { name: 'asc' } }),
      prisma.experienceTag.findMany({ select: { name: true }, orderBy: { name: 'asc' } })
    ]);

    res.json({
      success: true,
      data: {
        moods: moods.map(m => m.name),
        genres: genres.map(g => g.name),
        experiences: experiences.map(e => e.name),
        languages: ["Telugu", "Hindi", "English", "Tamil", "Malayalam", "Kannada", "Korean", "Japanese"],
        runtimes: ["Any", "Under 90 minutes", "90–120 minutes", "More than 120 minutes"]
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getRecommendations,
  getMoodMetadata
};
