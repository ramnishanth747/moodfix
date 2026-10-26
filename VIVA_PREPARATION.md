# MoodFlix — College Viva & Technical Interview Preparation Guide

This guide contains the most likely questions and beginner-friendly, conceptually sound answers you can give during your academic micro-project viva examination.

---

## Part 1: Architecture & Full-Stack Fundamentals

### 1. What is MoodFlix and what problem does it solve?
**Answer:** MoodFlix is a movie discovery platform designed to solve "choice overload" and decision fatigue. Instead of endless, uncurated scrolling, users specify their current mood, preferred genre, language, available time, and desired experience. MoodFlix calculates a deterministic match score and returns the top recommendations with clear, explainable reasons why they match.

### 2. Can you explain the high-level architecture of MoodFlix?
**Answer:** MoodFlix uses a 3-tier client-server architecture:
1. **Frontend (Presentation Tier)**: Built with React and Vite. It renders the cinematic user interface, handles user interactions, and sends HTTP requests via Axios.
2. **Backend (Application/Business Logic Tier)**: Built with Node.js and Express. It validates inputs, handles routing, executes the recommendation scoring algorithm, and orchestrates database transactions.
3. **Database (Data Tier)**: PostgreSQL managed through Prisma ORM. It stores movies, normalized tags (genres, moods, experiences), and the user's watchlist.

### 3. What is React and why did you choose it for the frontend?
**Answer:** React is a component-based JavaScript library for building user interfaces. It uses a virtual DOM (Document Object Model) to update only the changed elements efficiently rather than reloading the whole page. In MoodFlix, it allowed us to break down complex UI elements (Hero, Movie Cards, Filter Chips, Modals) into reusable, independent components with dynamic state management.

### 4. What is State in React and how is it used in your project?
**Answer:** State is an object that holds data that can change over the lifecycle of a component, triggering a re-render when updated. In `App.jsx`, we use the `useState` hook to manage:
- Active movies and filtered search lists
- Recommendation candidates from the algorithm
- Watchlist items and IDs
- Active modal states (`isMoodModalOpen`, `selectedMovie`)
- Loading and error indicators.

### 5. How does the frontend communicate with the backend?
**Answer:** Through asynchronous REST API calls using Axios. When the user interacts with the UI (e.g., clicking "Find My Matches" or "Add to Watchlist"), an HTTP request (`GET`, `POST`, `PATCH`, or `DELETE`) is sent to the Express server at `http://localhost:5000/api`. The server queries PostgreSQL and sends back a structured JSON response which updates React's state.

---

## Part 2: Backend Development & Node.js/Express

### 6. What is Node.js and Express.js?
**Answer:** 
- **Node.js** is an open-source, cross-platform JavaScript runtime environment built on Chrome's V8 engine that allows JavaScript to run on the server.
- **Express.js** is a minimalist web framework for Node.js that provides routing, middleware support, and simplified HTTP request and response handling.

### 7. What is a REST API and which HTTP methods did you implement?
**Answer:** REST (Representational State Transfer) is an architectural style for designing networked applications using standard HTTP conventions. MoodFlix implements:
- `GET`: Read data (e.g., `GET /api/movies`, `GET /api/health`, `GET /api/watchlist`).
- `POST`: Create data (e.g., `POST /api/watchlist` to save a movie; `POST /api/recommendations` to send preference payloads).
- `PATCH`: Partially update data (e.g., `PATCH /api/watchlist/:id` to toggle between `WANT_TO_WATCH` and `WATCHED`).
- `DELETE`: Remove data (e.g., `DELETE /api/watchlist/:id`).

### 8. What is Express Middleware and where did you use it?
**Answer:** Middleware functions are functions that have access to the request object (`req`), response object (`res`), and the `next` function in the application’s request-response cycle. In MoodFlix, we used:
1. `cors()`: Cross-Origin Resource Sharing middleware allowing the Vite client on port 5173 to communicate with the Express server on port 5000.
2. `express.json()`: Parses incoming JSON request payloads.
3. Centralized Error-handling Middleware: Intercepts unhandled errors across controllers and returns consistent JSON error responses (`{ success: false, error: ... }`).

### 9. How do you prevent SQL Injection and Whitelist Query Parameters?
**Answer:** 
- Prisma ORM automatically uses parameterized queries under the hood, making SQL injection impossible through ORM calls.
- In `movieController.js`, for sorting, we created an explicit whitelist array (`ALLOWED_SORT_FIELDS = ['releaseYear', 'title', 'createdAt', 'rating']`). Any unapproved sort parameter sent by a client is safely ignored and defaults to `createdAt`.

---

## Part 3: Database & PostgreSQL / Prisma ORM

### 10. What is PostgreSQL and why did you use it?
**Answer:** PostgreSQL is an advanced, open-source object-relational database management system (RDBMS). It ensures ACID compliance (Atomicity, Consistency, Isolation, Durability), reliable data persistence, relational integrity, and powerful indexing capabilities.

### 11. What is an ORM and why use Prisma?
**Answer:** ORM stands for Object-Relational Mapping. It allows developers to interact with database tables using JavaScript objects and methods rather than writing raw SQL strings by hand. Prisma provides type safety, automated database migrations, auto-generated TypeScript/JavaScript queries, and intuitive relationship management.

### 12. Explain the Primary Key and Foreign Key in your schema.
**Answer:**
- **Primary Key**: A column (or set of columns) that uniquely identifies each row in a table. In our `Movie` and `WatchlistItem` models, `id` is a UUID primary key.
- **Foreign Key**: A column in one table that references the primary key of another table, establishing a link. In `WatchlistItem`, `movieId` is a foreign key pointing to `Movie.id`.

### 13. What is a Many-to-Many Relationship and how is it implemented?
**Answer:** A Many-to-Many relationship occurs when multiple records in one table relate to multiple records in another. For example, a single Movie can belong to multiple Genres (e.g. *Action* and *Drama*), and a single Genre belongs to many Movies. In `schema.prisma`, this is declared via `genres Genre[] @relation("MovieGenres")`, and Prisma automatically manages the underlying join table `_MovieGenres`.

### 14. What is a Database Migration?
**Answer:** A database migration is a version-controlled set of instructions that translates changes made to your data model schema into structured SQL schema changes (`CREATE TABLE`, `ALTER TABLE`, `ADD INDEX`). Running `npx prisma migrate dev --name init` ensured our PostgreSQL database had all tables, foreign keys, and indexes created accurately.

---

## Part 4: The Recommendation Algorithm & Logic

### 15. How does the MoodFlix recommendation algorithm work?
**Answer:** The algorithm in `src/services/recommendationService.js` is **deterministic and weighted**:
- It assigns a maximum of 100 possible points:
  - **Mood match**: 30 points
  - **Genre match**: 25 points
  - **Language match**: 20 points
  - **Runtime compatibility**: 15 points
  - **Desired experience**: 10 points
- It computes: `matchPercentage = Math.round((earnedScore / maxApplicableScore) * 100)`.
- If a user specifies a strict runtime constraint (e.g. "Under 90 minutes"), films exceeding that limit are flagged with a mismatch and deprioritized.
- Each result returns not only the score but also an array of human-readable match justifications (`matchReasons`) and mismatch alerts.

### 16. Why did you make the recommendation engine deterministic instead of using an AI API?
**Answer:** 
1. **Explainability & Transparency**: In a college project or viva, deterministic math is 100% explainable and verifiable. An external LLM or AI API can hallucinate or produce non-reproducible scores.
2. **Offline Resilience & Cost**: It requires zero paid API keys, zero rate limits, and functions completely offline.
3. **Speed**: In-memory array scoring over retrieved database candidates executes in less than 2 milliseconds.

### 17. How do you handle tie-breaking when two movies have the same score?
**Answer:** We implement a 3-level deterministic tie-breaker:
1. Higher viewer rating (`movie.rating DESC`)
2. Newer release year (`movie.releaseYear DESC`)
3. Alphabetical title order (`movie.title ASC`)
This ensures the output is always consistent and stable for the same input.

### 18. How are duplicate watchlist entries prevented?
**Answer:** At both database and application levels:
1. **Database Level**: The `WatchlistItem` model defines `movieId String @unique`, enforcing a unique constraint in PostgreSQL.
2. **Backend Controller Level**: `watchlistController.js` queries `prisma.watchlistItem.findUnique` before creating a record and returns an HTTP `409 Conflict` if the film is already saved.

---

## Part 5: Live Viva Demonstration Script

Follow this 2-minute step-by-step walkthrough during your viva presentation:

1. **Show the Homepage**:
   - Point out the dark cinematic streaming aesthetic, the featured spotlight banner for *"RRR"* (or top rated title), the "Picked for You" side cards, and the horizontal genre filter chips.
2. **Demonstrate Filtering & Search**:
   - Click on the "Comedy" or "Thriller" genre chip to show instantaneous, reactive catalogue filtering.
   - Type in the search box (e.g. *"Interstellar"* or *"Malayalam"*) to demonstrate real-time search.
3. **Run the Recommendation Engine**:
   - Click the prominent **"Find by Mood"** button in the navbar.
   - Select Mood: **Curious**, Genre: **Thriller**, Language: **Hindi** (or Any).
   - Click **"Find My Matches"**.
   - Show the resulting horizontal row: explain the **100% Match badge** on *"Andhadhun"*.
4. **Inspect Movie Details & Explainability**:
   - Click on *"Andhadhun"*. Point out the **Recommendation Match Score (100%)** breakdown box with the green checkmarks:
     - *"Matches your Curious mood"*
     - *"Belongs to the Thriller genre"*
     - *"Original audio in Hindi"*
5. **Demonstrate Watchlist Persistence**:
   - In the modal, click **"Add to Watchlist"**. Show the toast confirmation.
   - Navigate to the **"My Watchlist"** tab in the navbar.
   - Show the movie listed under *"Up Next"*.
   - Click **"Mark Watched"** to show status change to *"Watched"*.
   - Refresh the browser page (`F5`) to prove to the examiner that the data is truly persisted in **PostgreSQL**!
