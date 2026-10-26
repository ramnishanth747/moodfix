# MoodFlix 🎬 — Stop Scrolling. Find Your Vibe.

An academic full-stack micro-project demonstrating **Full Stack Development**, **Backend REST API Architecture**, **Database Management (PostgreSQL + Prisma)**, and a **Deterministic Recommendation Engine** with an explainable match scoring policy.

---

## 1. Product Overview

MoodFlix solves the "endless scrolling paradox" where viewers spend 30 minutes looking for a film and end up exhausted. Instead of an uncurated wall of titles, MoodFlix allows users to specify their current state (Mood, Genre, Language, Runtime constraint, Desired viewing experience) and returns mathematically scored recommendations with explicit match justifications.

### Key Highlights
- **Cinematic 3D Streaming Aesthetics**: Deep near-black canvas (`#050608`) with warm amber accents (`#f59e0b`), subtle perspective tilt on the featured spotlight, layered artwork depth, hover poster lift with restrained glow reflections, and smooth transitions.
- **Find Your Mood Feature Section**: Dedicated 8-vibe discovery grid directly on the homepage (Happy, Sad, Heartbroken, Bored, Adventurous, Relaxed, Curious, Nostalgic) with custom gradients and micro-interactions.
- **5 Identity-Driven Curated Rows**: Trending (top-rated), Recently Added (new releases), Because You're Curious (intrigue & mystery), Hidden Gems (8.3+ audience score), and Your Watchlist.
- **Substantially Expanded Catalogue**: 81 accurately curated real movies across 8 cinema languages (Telugu, Hindi, English, Tamil, Malayalam, Kannada, Korean, and Japanese) with genuine runtimes, years, genres, and mood tags.
- **Optimized Perceived Performance**: Chunked batch pagination ("Show More Movies"), aspect-ratio poster containers to eliminate layout shifts, memoized category slices, and zero heavy WebGL overhead.
- **Dedicated Discover Results Route**: Submitting mood preferences navigates cleanly to `/discover/results?mood=...` using React Router, supporting page refresh, direct links, and browser back/forward history.
- **Explainable Match Scoring**: Every recommendation provides a percentage score (out of 100) and displays clear breakdown reasons (e.g. *"Matches your Curious mood"*, *"Belongs to the Thriller genre"*).
- **Persistent Watchlist**: Demonstration watchlist persisted in PostgreSQL with duplicate prevention and watch status toggling (`WANT_TO_WATCH` / `WATCHED`).

---

## 2. Tech Stack

- **Frontend**: React (Vite), JavaScript, Vanilla CSS with custom tokens & micro-animations, Lucide React icons, Axios.
- **Backend**: Node.js, Express.js (REST API, centralized error handling, whitelisted query sorting).
- **Database**: PostgreSQL 18.
- **ORM**: Prisma ORM (v6.19.3) with migrations and database seed script.

---

## 3. Architecture & Directory Structure

```text
micro project- moodfix/
├── client/                     # React (Vite) Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx            # Compact header with search, tabs & mood CTA
│   │   │   ├── FeaturedHero.jsx      # Cinematic hero spotlight + "Picked for You"
│   │   │   ├── GenreChips.jsx        # Horizontal genre filters
│   │   │   ├── MovieRow.jsx          # Horizontal poster carousels with arrow navigation
│   │   │   ├── MoodFinderModal.jsx   # Multi-parameter mood input dialog
│   │   │   ├── MovieDetailModal.jsx  # Overview, tags, trailer link & match explanation
│   │   │   └── WatchlistPage.jsx     # Saved films categorized by status
│   │   ├── services/
│   │   │   └── api.js                # Axios client for Express backend
│   │   ├── App.jsx                   # Central page state & data integration
│   │   ├── App.css                   # Custom cinematic streaming styling
│   │   ├── index.css                 # Global design system & tokens
│   │   └── main.jsx
│   └── package.json
├── prisma/
│   ├── schema.prisma           # Database models, relations & indexes
│   ├── seed.js                 # 35 curated multilingual movie seed records
│   └── migrations/             # Timestamped migration SQL files
├── src/
│   ├── controllers/
│   │   ├── movieController.js          # Search, genre/language filter, whitelisted sort
│   │   ├── recommendationController.js # Recommendation generator & mood metadata
│   │   └── watchlistController.js      # Watchlist CRUD & duplicate prevention
│   ├── lib/
│   │   └── prisma.js                   # PrismaClient singleton
│   ├── routes/
│   │   └── api.js                      # Modular Express router
│   ├── services/
│   │   └── recommendationService.js    # Deterministic scoring algorithm
│   ├── app.js                          # Express app configuration & middleware
│   └── server.js                       # Server entrypoint (Port 5000)
├── tests/
│   └── recommendation.test.js  # Algorithm verification unit tests
├── .env.example                # Sample environment configuration
├── package.json                # Root backend dependencies & scripts
├── README.md                   # Full documentation
└── VIVA_PREPARATION.md         # 20+ Viva questions and demo script
```

---

## 4. Database Schema & Relations

```mermaid
erDiagram
    Movie ||--o{ MovieGenres : has
    Genre ||--o{ MovieGenres : contains
    Movie ||--o{ MovieMoods : has
    MoodTag ||--o{ MovieMoods : contains
    Movie ||--o{ MovieExperiences : has
    ExperienceTag ||--o{ MovieExperiences : contains
    Movie ||--o| WatchlistItem : saves

    Movie {
        string id PK
        string title
        string description
        string language
        int runtime
        int releaseYear
        float rating
        boolean featured
        string posterUrl
        string backdropUrl
        string trailerUrl
    }

    WatchlistItem {
        string id PK
        string movieId FK,UK
        enum status "WANT_TO_WATCH | WATCHED"
        datetime createdAt
        datetime updatedAt
    }

    Genre {
        string id PK
        string name UK
    }

    MoodTag {
        string id PK
        string name UK
    }

    ExperienceTag {
        string id PK
        string name UK
    }
```

- **Many-to-Many**: `Movie <-> Genre`, `Movie <-> MoodTag`, `Movie <-> ExperienceTag`.
- **One-to-One / Unique Relation**: `Movie <-> WatchlistItem` (prevents adding duplicate records for the same film).

---

## 5. Recommendation Engine & Scoring Policy

The algorithm in `src/services/recommendationService.js` is **purely deterministic** (no random outputs, no external AI API dependency):

| Attribute | Points | Criteria |
| :--- | :---: | :--- |
| **Mood Match** | 30 | Target mood tag exists in `movie.moodTags` |
| **Genre Match** | 25 | Target genre exists in `movie.genres` |
| **Language Match** | 20 | Exact case-insensitive match on `movie.language` |
| **Runtime Match** | 15 | Film runtime satisfies the requested duration limit |
| **Experience Match**| 10 | Target experience exists in `movie.experienceTags` |
| **Total Max** | **100** | Normalized percentage: `(earnedScore / maxApplicableScore) * 100` |

### Deterministic Tie-Breaker
When multiple films tie in match percentage:
1. Higher viewer rating (`movie.rating DESC`)
2. Newer release year (`movie.releaseYear DESC`)
3. Alphabetical title order (`movie.title ASC`)

---

## 6. REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health status and live PostgreSQL connectivity check |
| `GET` | `/api/movies` | Fetch all movies with optional `?search=`, `?genre=`, `?language=`, `?sortBy=`, `?order=` |
| `GET` | `/api/movies/featured` | Fetch spotlight hero movie |
| `GET` | `/api/movies/:id` | Fetch full movie details with tags |
| `GET` | `/api/moods` | Fetch list of available moods, genres, and experiences |
| `POST`| `/api/recommendations` | Calculate ranked matches for provided mood preferences |
| `GET` | `/api/watchlist` | Get saved movies with watchlist status |
| `POST`| `/api/watchlist` | Add movie to watchlist (`409 Conflict` if duplicate) |
| `PATCH`| `/api/watchlist/:id` | Update status to `WATCHED` or `WANT_TO_WATCH` |
| `DELETE`| `/api/watchlist/:id` | Remove movie from watchlist |

---

## 7. Setup & Run Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL installed and running on port 5432

### 1. Configure Environment
Copy `.env.example` to `.env` in the root directory:
```bash
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/moodflix_db?schema=public"
```

### 2. Apply Database Migration & Seed Data
```bash
# Apply schema to PostgreSQL
npx prisma migrate dev --name init

# Seed the 35 curated films
npm run seed
```

### 3. Run Backend Server
```bash
npm run dev
# Server starts at http://localhost:5000
```

### 4. Run Frontend Client
In a separate terminal:
```bash
cd client
npm install
npm run dev
# Vite runs at http://localhost:5173
```

---

## 8. Verification & Automated Tests

Run the built-in recommendation algorithm test suite:
```bash
npm test
```
Outputs:
```text
Running MoodFlix recommendation engine unit tests...
✔ Test 1: Perfect match produces 100% score
✔ Test 2: Normalized scoring policy handles single preference gracefully
✔ Test 3: Runtime constraint violation properly registers mismatch
✔ Test 4: Deterministic tie-breaking orders by rating

All 4 recommendation engine unit tests passed successfully!
```
