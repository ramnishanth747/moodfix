const assert = require('assert');
const { calculateMovieScore, rankRecommendations } = require('../src/services/recommendationService');

console.log('Running MoodFlix recommendation engine unit tests...');

const sampleMovie = {
  id: '1',
  title: 'Inception',
  language: 'English',
  runtime: 148,
  releaseYear: 2010,
  rating: 8.8,
  genres: [{ name: 'Science Fiction' }, { name: 'Action' }],
  moodTags: [{ name: 'Curious' }, { name: 'Adventurous' }],
  experienceTags: [{ name: 'Mind-bending plot' }]
};

// Test 1: Full match on all criteria
const fullMatchResult = calculateMovieScore(sampleMovie, {
  mood: 'Curious',
  genre: 'Action',
  language: 'English',
  maxRuntime: 'More than 120 minutes',
  experience: 'Mind-bending plot'
});

assert.strictEqual(fullMatchResult.matchPercentage, 100, 'Expected 100% match when all attributes match');
assert.strictEqual(fullMatchResult.matchReasons.length, 5, 'Expected 5 positive match reasons');
console.log('✔ Test 1: Perfect match produces 100% score');

// Test 2: Partial match (Mood match only = 30 pts out of 30 if only mood requested)
const moodOnlyResult = calculateMovieScore(sampleMovie, {
  mood: 'Curious'
});
assert.strictEqual(moodOnlyResult.matchPercentage, 100, 'Expected normalized 100% when only single requested criterion matches');
console.log('✔ Test 2: Normalized scoring policy handles single preference gracefully');

// Test 3: Disqualification / penalty on runtime mismatch
const runtimeExceededResult = calculateMovieScore(sampleMovie, {
  mood: 'Curious',
  maxRuntime: 'Under 90 minutes'
});
// Max applicable = 30 (mood) + 15 (runtime) = 45. Earned = 30.
assert(runtimeExceededResult.matchPercentage < 70, 'Score should reflect runtime penalty');
assert(runtimeExceededResult.mismatches.some(m => m.includes('exceeds')), 'Should list runtime in mismatches');
console.log('✔ Test 3: Runtime constraint violation properly registers mismatch');

// Test 4: Deterministic ranking tie-breakers
const movieA = { ...sampleMovie, id: 'A', title: 'Alpha', rating: 8.5, releaseYear: 2020 };
const movieB = { ...sampleMovie, id: 'B', title: 'Beta', rating: 9.0, releaseYear: 2015 };
const ranked = rankRecommendations([movieA, movieB], { mood: 'Curious' });
assert.strictEqual(ranked[0].movie.title, 'Beta', 'Higher rated movie must rank first in a score tie');
console.log('✔ Test 4: Deterministic tie-breaking orders by rating');

console.log('\nAll 4 recommendation engine unit tests passed successfully!\n');
