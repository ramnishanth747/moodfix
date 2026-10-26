/**
 * Deterministic recommendation algorithm for MoodFlix
 *
 * Weight Distribution (Total: 100 points maximum):
 * - Mood Match: 30 points
 * - Genre Match: 25 points
 * - Language Match: 20 points
 * - Runtime Match: 15 points
 * - Experience Match: 10 points
 *
 * Scoring Policy:
 * 1. Normalized match percentage = (earnedScore / maxApplicableScore) * 100
 * 2. If runtime is specified with a maximum constraint, movies exceeding that limit
 *    are disqualified (or penalized) according to the specification.
 * 3. Tie-breaking is deterministic (Score DESC -> Rating DESC -> ReleaseYear DESC -> Title ASC)
 */

function calculateMovieScore(movie, preferences) {
  let earnedScore = 0;
  let maxApplicableScore = 0;
  const matchReasons = [];
  const mismatches = [];

  const { mood, genre, language, maxRuntime, experience } = preferences;

  // 1. Mood Match (30 pts)
  if (mood && mood !== 'Any') {
    maxApplicableScore += 30;
    const movieMoods = (movie.moodTags || []).map(m => m.name.toLowerCase());
    if (movieMoods.includes(mood.toLowerCase())) {
      earnedScore += 30;
      matchReasons.push(`Matches your ${mood} mood`);
    } else {
      mismatches.push(`Not specifically tagged for ${mood} mood`);
    }
  }

  // 2. Genre Match (25 pts)
  if (genre && genre !== 'Any') {
    maxApplicableScore += 25;
    const movieGenres = (movie.genres || []).map(g => g.name.toLowerCase());
    if (movieGenres.includes(genre.toLowerCase())) {
      earnedScore += 25;
      matchReasons.push(`Belongs to the ${genre} genre`);
    } else {
      mismatches.push(`Genre differs from requested ${genre}`);
    }
  }

  // 3. Language Match (20 pts)
  if (language && language !== 'Any') {
    maxApplicableScore += 20;
    if (movie.language.toLowerCase() === language.toLowerCase()) {
      earnedScore += 20;
      matchReasons.push(`Original audio in ${movie.language}`);
    } else {
      mismatches.push(`Language is ${movie.language} instead of ${language}`);
    }
  }

  // 4. Runtime Match (15 pts)
  if (maxRuntime && maxRuntime !== 'Any') {
    maxApplicableScore += 15;
    let limitMinutes = null;

    if (typeof maxRuntime === 'number') {
      limitMinutes = maxRuntime;
    } else if (maxRuntime.includes('90') && maxRuntime.toLowerCase().includes('under')) {
      limitMinutes = 90;
    } else if (maxRuntime.includes('120') && !maxRuntime.toLowerCase().includes('more')) {
      limitMinutes = 120;
    }

    if (limitMinutes !== null) {
      if (movie.runtime <= limitMinutes) {
        earnedScore += 15;
        matchReasons.push(`Runtime of ${movie.runtime}m fits within ${limitMinutes}m limit`);
      } else {
        // Exceeded maximum constraint
        mismatches.push(`Runtime (${movie.runtime}m) exceeds preferred maximum of ${limitMinutes}m`);
      }
    } else {
      // More than 120 or flexible
      if (movie.runtime >= 120) {
        earnedScore += 15;
        matchReasons.push(`Feature-length runtime (${movie.runtime}m)`);
      } else {
        matchReasons.push(`Runtime of ${movie.runtime}m`);
      }
    }
  }

  // 5. Viewing Experience Match (10 pts)
  if (experience && experience !== 'Any') {
    maxApplicableScore += 10;
    const movieExperiences = (movie.experienceTags || []).map(e => e.name.toLowerCase());
    if (movieExperiences.includes(experience.toLowerCase())) {
      earnedScore += 10;
      matchReasons.push(`Delivers ${experience}`);
    } else {
      mismatches.push(`Differs from ${experience} experience`);
    }
  }

  // Fallback if no specific criteria were provided
  if (maxApplicableScore === 0) {
    maxApplicableScore = 100;
    earnedScore = Math.round((movie.rating || 7.0) * 10);
    matchReasons.push('Selected from popular picks based on general audience rating');
  }

  const matchPercentage = Math.min(100, Math.round((earnedScore / maxApplicableScore) * 100));

  return {
    matchPercentage,
    earnedScore,
    maxApplicableScore,
    matchReasons,
    mismatches
  };
}

/**
 * Rank movies deterministically
 */
function rankRecommendations(movies, preferences) {
  const scored = movies.map(movie => {
    const analysis = calculateMovieScore(movie, preferences);
    return {
      movie,
      ...analysis
    };
  });

  // Filter out hard mismatches if runtime was strictly specified as "Under 90" or "90-120"
  let filtered = scored;
  if (preferences.maxRuntime && preferences.maxRuntime !== 'Any') {
    let strictLimit = null;
    if (typeof preferences.maxRuntime === 'number') strictLimit = preferences.maxRuntime;
    else if (preferences.maxRuntime.includes('90') && preferences.maxRuntime.toLowerCase().includes('under')) strictLimit = 90;
    else if (preferences.maxRuntime.includes('120') && !preferences.maxRuntime.toLowerCase().includes('more')) strictLimit = 120;

    if (strictLimit) {
      // Movies within runtime receive priority; exclude those with 0 score
      filtered = scored.filter(item => item.matchPercentage > 0);
    }
  }

  // Deterministic sorting
  filtered.sort((a, b) => {
    // 1. Highest match percentage
    if (b.matchPercentage !== a.matchPercentage) {
      return b.matchPercentage - a.matchPercentage;
    }
    // 2. Highest rating
    const ratingA = a.movie.rating || 0;
    const ratingB = b.movie.rating || 0;
    if (ratingB !== ratingA) {
      return ratingB - ratingA;
    }
    // 3. Newest release year
    if (b.movie.releaseYear !== a.movie.releaseYear) {
      return b.movie.releaseYear - a.movie.releaseYear;
    }
    // 4. Stable alphabetical tie-breaker
    return a.movie.title.localeCompare(b.movie.title);
  });

  return filtered;
}

module.exports = {
  calculateMovieScore,
  rankRecommendations
};
