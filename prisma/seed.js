const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const moviesData = [
  // --- TELUGU (11 titles) ---
  {
    title: "RRR",
    description: "A fearless warrior on a perilous mission comes face to face with a steely cop serving British forces in pre-independent India.",
    language: "Telugu",
    runtime: 187,
    releaseYear: 2022,
    rating: 8.8,
    featured: true,
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=NgBoMJy386M",
    genres: ["Action", "Drama"],
    moods: ["Adventurous", "Happy"],
    experiences: ["Action and adventure", "Emotional storytelling"]
  },
  {
    title: "Jersey",
    description: "A failed cricketer decides to revive his career in his late thirties despite everyone being skeptical, all for his son's dream.",
    language: "Telugu",
    runtime: 157,
    releaseYear: 2019,
    rating: 8.5,
    posterUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=R9K1d1_11cE",
    genres: ["Drama"],
    moods: ["Heartbroken", "Nostalgic"],
    experiences: ["Emotional storytelling", "Feel-good experience"]
  },
  {
    title: "Eega",
    description: "A murdered man is reincarnated as a housefly and seeks revenge on his killer while protecting his girlfriend.",
    language: "Telugu",
    runtime: 135,
    releaseYear: 2012,
    rating: 7.7,
    posterUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=W557b7fN_6M",
    genres: ["Action", "Fantasy", "Comedy"],
    moods: ["Adventurous", "Happy"],
    experiences: ["Mind-bending plot", "Lighthearted entertainment"]
  },
  {
    title: "C/o Kancharapalem",
    description: "Four unconventional love stories spanning different age groups unfold in a small rustic town named Kancharapalem.",
    language: "Telugu",
    runtime: 152,
    releaseYear: 2018,
    rating: 8.9,
    posterUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=F_fP_H2a034",
    genres: ["Romance", "Drama"],
    moods: ["Heartbroken", "Nostalgic", "Relaxed"],
    experiences: ["Emotional storytelling", "Feel-good experience"]
  },
  {
    title: "Mathu Vadalara",
    description: "A broke delivery boy gets embroiled in a murder mystery after trying an easy money scam in an apartment.",
    language: "Telugu",
    runtime: 129,
    releaseYear: 2019,
    rating: 8.2,
    posterUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=Z_a7dMv09-8",
    genres: ["Comedy", "Thriller", "Mystery"],
    moods: ["Curious", "Bored"],
    experiences: ["Suspense and mystery", "Lighthearted entertainment"]
  },
  {
    title: "Baahubali: The Beginning",
    description: "In the kingdom of Mahishmati, a spirited young man learns of his royal heritage and prepares to overthrow a cruel tyrant.",
    language: "Telugu",
    runtime: 159,
    releaseYear: 2015,
    rating: 8.0,
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=sOEg_YZQsTI",
    genres: ["Action", "Fantasy", "Drama"],
    moods: ["Adventurous"],
    experiences: ["Action and adventure", "Emotional storytelling"]
  },
  {
    title: "Mahanati",
    description: "The biographical journey of Savitri, an iconic South Indian actress whose stratospheric rise and tragic personal fall captivated cinema history.",
    language: "Telugu",
    runtime: 177,
    releaseYear: 2018,
    rating: 8.5,
    posterUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=9j7C82x7bW8",
    genres: ["Drama"],
    moods: ["Heartbroken", "Nostalgic"],
    experiences: ["Emotional storytelling"]
  },
  {
    title: "Agent Sai Srinivasa Athreya",
    description: "A quirky private detective operating in Nellore finds himself investigating a series of unidentified dead bodies dumped along railway tracks.",
    language: "Telugu",
    runtime: 148,
    releaseYear: 2019,
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=eJg6h_K3J2I",
    genres: ["Mystery", "Comedy", "Thriller"],
    moods: ["Curious", "Bored"],
    experiences: ["Suspense and mystery", "Mind-bending plot"]
  },
  {
    title: "Hi Nanna",
    description: "A single father raising a daughter with cystic fibrosis finds his carefully sheltered life transformed when a compassionate woman enters their world.",
    language: "Telugu",
    runtime: 155,
    releaseYear: 2023,
    rating: 8.2,
    posterUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=kYQkHq9_zXk",
    genres: ["Romance", "Drama"],
    moods: ["Heartbroken", "Relaxed", "Happy"],
    experiences: ["Emotional storytelling", "Feel-good experience"]
  },
  {
    title: "Goodachari",
    description: "A young intelligence operative framed for the assassination of his superior officers must unravel a covert conspiracy within his own agency.",
    language: "Telugu",
    runtime: 147,
    releaseYear: 2018,
    rating: 7.8,
    posterUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=5kF9fW77oFk",
    genres: ["Action", "Thriller"],
    moods: ["Adventurous", "Curious"],
    experiences: ["Action and adventure", "Suspense and mystery"]
  },
  {
    title: "Pelli Choopulu",
    description: "An aimless boy and an ambitious business graduate accidentally get locked in a room during an arranged matchmaking meeting and decide to start a food truck.",
    language: "Telugu",
    runtime: 125,
    releaseYear: 2016,
    rating: 8.2,
    posterUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=yY19gG3o_c8",
    genres: ["Romance", "Comedy"],
    moods: ["Happy", "Relaxed"],
    experiences: ["Lighthearted entertainment", "Feel-good experience"]
  },

  // --- HINDI (11 titles) ---
  {
    title: "3 Idiots",
    description: "Two friends search for their long lost companion while revisiting their college days and the rebel friend who inspired them to think differently.",
    language: "Hindi",
    runtime: 170,
    releaseYear: 2009,
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=K0eDlFX9GMc",
    genres: ["Comedy", "Drama"],
    moods: ["Happy", "Nostalgic"],
    experiences: ["Feel-good experience", "Lighthearted entertainment"]
  },
  {
    title: "Andhadhun",
    description: "A series of mysterious events changes the life of a blind pianist who must now report a crime that he should technically know nothing about.",
    language: "Hindi",
    runtime: 139,
    releaseYear: 2018,
    rating: 8.2,
    posterUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=2iVYI99VGaw",
    genres: ["Thriller", "Mystery", "Comedy"],
    moods: ["Curious", "Bored"],
    experiences: ["Mind-bending plot", "Suspense and mystery"]
  },
  {
    title: "Tumbbad",
    description: "A mythological story about a goddess who created the entire universe and the greedy search for forgotten gold protected by a sinister curse.",
    language: "Hindi",
    runtime: 104,
    releaseYear: 2018,
    rating: 8.2,
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=sN75MPxgvX8",
    genres: ["Horror", "Fantasy", "Drama"],
    moods: ["Curious", "Adventurous"],
    experiences: ["Suspense and mystery", "Mind-bending plot"]
  },
  {
    title: "Zindagi Na Milegi Dobara",
    description: "Three friends embark on a bachelor trip to Spain that turns into an opportunity to face their deepest fears and re-evaluate life priorities.",
    language: "Hindi",
    runtime: 155,
    releaseYear: 2011,
    rating: 8.2,
    posterUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=FJrpcDgC3zU",
    genres: ["Comedy", "Drama", "Romance"],
    moods: ["Relaxed", "Happy", "Adventurous"],
    experiences: ["Feel-good experience", "Lighthearted entertainment"]
  },
  {
    title: "Stree",
    description: "In the small town of Chanderi, the menfolk live in fear of an evil spirit named Stree who abducts men during festival nights.",
    language: "Hindi",
    runtime: 128,
    releaseYear: 2018,
    rating: 7.6,
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=gzeaGcLLl_A",
    genres: ["Horror", "Comedy"],
    moods: ["Bored", "Happy"],
    experiences: ["Lighthearted entertainment", "Suspense and mystery"]
  },
  {
    title: "Barfi!",
    description: "Set in the 1970s in Darjeeling, a speech and hearing-impaired young man develops unique bonds with two extraordinary women.",
    language: "Hindi",
    runtime: 151,
    releaseYear: 2012,
    rating: 8.1,
    posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=yGxX6p9tJ_w",
    genres: ["Comedy", "Drama", "Romance"],
    moods: ["Happy", "Heartbroken", "Nostalgic"],
    experiences: ["Emotional storytelling", "Feel-good experience"]
  },
  {
    title: "Taare Zameen Par",
    description: "An eight-year-old boy considered lazy and troublesome is sent to boarding school, where an unconventional art teacher helps him discover his true potential.",
    language: "Hindi",
    runtime: 165,
    releaseYear: 2007,
    rating: 8.3,
    posterUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=tn_2Ie_jtNY",
    genres: ["Drama"],
    moods: ["Heartbroken", "Happy"],
    experiences: ["Emotional storytelling", "Feel-good experience"]
  },
  {
    title: "Gangs of Wasseypur",
    description: "A clash between Sultan and Shahid Khan leads to an expulsion from Wasseypur, igniting a deadly multi-generational feud over coal and power.",
    language: "Hindi",
    runtime: 160,
    releaseYear: 2012,
    rating: 8.2,
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=j-X78N773zY",
    genres: ["Action", "Drama", "Thriller"],
    moods: ["Bored", "Adventurous"],
    experiences: ["Action and adventure", "Suspense and mystery"]
  },
  {
    title: "Queen",
    description: "A Delhi girl from a traditional family decides to go on her European honeymoon alone after her fiancé calls off the wedding at the altar.",
    language: "Hindi",
    runtime: 144,
    releaseYear: 2013,
    rating: 8.1,
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=KGC6vl3Arf0",
    genres: ["Comedy", "Drama"],
    moods: ["Happy", "Adventurous"],
    experiences: ["Feel-good experience", "Lighthearted entertainment"]
  },
  {
    title: "Kahaani",
    description: "A pregnant woman arrives in Kolkata during the vibrant Durga Puja festival in search of her missing husband, only to be met with bureaucratic denial.",
    language: "Hindi",
    runtime: 122,
    releaseYear: 2012,
    rating: 8.1,
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=rs9Vioo2a7o",
    genres: ["Mystery", "Thriller"],
    moods: ["Curious"],
    experiences: ["Mind-bending plot", "Suspense and mystery"]
  },
  {
    title: "Lagaan",
    description: "In Victorian India, the residents of a drought-plagued village stake their future on a game of cricket against ruthless British army officers.",
    language: "Hindi",
    runtime: 193,
    releaseYear: 2001,
    rating: 8.1,
    posterUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=oSIGQ0TA54I",
    genres: ["Drama", "Adventure"],
    moods: ["Nostalgic", "Adventurous"],
    experiences: ["Emotional storytelling", "Feel-good experience"]
  },

  // --- ENGLISH (11 titles) ---
  {
    title: "Interstellar",
    description: "When Earth becomes uninhabitable, a team of astronauts travels through a wormhole near Saturn in search of a new home for mankind.",
    language: "English",
    runtime: 169,
    releaseYear: 2014,
    rating: 8.7,
    posterUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=zSWdZVtXT7E",
    genres: ["Science Fiction", "Drama"],
    moods: ["Curious", "Adventurous"],
    experiences: ["Mind-bending plot", "Emotional storytelling"]
  },
  {
    title: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    language: "English",
    runtime: 148,
    releaseYear: 2010,
    rating: 8.8,
    posterUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=YoHD9XEInc0",
    genres: ["Science Fiction", "Action", "Thriller"],
    moods: ["Curious", "Adventurous"],
    experiences: ["Mind-bending plot", "Action and adventure"]
  },
  {
    title: "La La Land",
    description: "While navigating their careers in Los Angeles, a pianist and an aspiring actress fall in love while attempting to reconcile their dreams.",
    language: "English",
    runtime: 128,
    releaseYear: 2016,
    rating: 8.0,
    posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
    genres: ["Romance", "Drama", "Comedy"],
    moods: ["Heartbroken", "Nostalgic", "Relaxed"],
    experiences: ["Emotional storytelling", "Feel-good experience"]
  },
  {
    title: "Knives Out",
    description: "A detective investigates the mysterious death of the patriarch of an eccentric, combative family.",
    language: "English",
    runtime: 130,
    releaseYear: 2019,
    rating: 7.9,
    posterUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=qGqiHJTsRkQ",
    genres: ["Mystery", "Comedy", "Thriller"],
    moods: ["Curious", "Bored"],
    experiences: ["Suspense and mystery", "Lighthearted entertainment"]
  },
  {
    title: "Spider-Man: Into the Spider-Verse",
    description: "Teen Miles Morales becomes the new Spider-Man and must team up with five alternate reality spider-powered individuals to stop a reality threat.",
    language: "English",
    runtime: 117,
    releaseYear: 2018,
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=tg52up16eq0",
    genres: ["Animation", "Action", "Science Fiction"],
    moods: ["Adventurous", "Happy"],
    experiences: ["Action and adventure", "Feel-good experience"]
  },
  {
    title: "The Shawshank Redemption",
    description: "Over the course of several years, two convicts form a friendship, seeking solace and, eventually, redemption through basic compassion.",
    language: "English",
    runtime: 142,
    releaseYear: 1994,
    rating: 9.3,
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=PLl99DlL6b4",
    genres: ["Drama"],
    moods: ["Heartbroken", "Happy", "Nostalgic"],
    experiences: ["Emotional storytelling", "Feel-good experience"]
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological tests.",
    language: "English",
    runtime: 152,
    releaseYear: 2008,
    rating: 9.0,
    posterUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=EXeTwQWrcwY",
    genres: ["Action", "Thriller", "Drama"],
    moods: ["Curious", "Adventurous"],
    experiences: ["Suspense and mystery", "Action and adventure"]
  },
  {
    title: "Dune: Part Two",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    language: "English",
    runtime: 166,
    releaseYear: 2024,
    rating: 8.6,
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=Way9Dexny3w",
    genres: ["Science Fiction", "Action", "Adventure"],
    moods: ["Adventurous", "Curious"],
    experiences: ["Mind-bending plot", "Action and adventure"]
  },
  {
    title: "Whiplash",
    description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an abusive instructor.",
    language: "English",
    runtime: 106,
    releaseYear: 2014,
    rating: 8.5,
    posterUrl: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=7d_jQycdQGo",
    genres: ["Drama"],
    moods: ["Bored", "Adventurous"],
    experiences: ["Emotional storytelling", "Suspense and mystery"]
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption in Los Angeles.",
    language: "English",
    runtime: 154,
    releaseYear: 1994,
    rating: 8.9,
    posterUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=s7EdQ4FqbhY",
    genres: ["Thriller", "Comedy", "Drama"],
    moods: ["Bored", "Curious"],
    experiences: ["Mind-bending plot", "Lighthearted entertainment"]
  },
  {
    title: "Before Sunrise",
    description: "A young man and woman meet on a train in Europe, and wind up spending one evening together in Vienna knowing they will likely never meet again.",
    language: "English",
    runtime: 101,
    releaseYear: 1995,
    rating: 8.1,
    posterUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=9v6X-D8lUw8",
    genres: ["Romance", "Drama"],
    moods: ["Relaxed", "Nostalgic"],
    experiences: ["Emotional storytelling", "Feel-good experience"]
  },

  // --- TAMIL (10 titles) ---
  {
    title: "Vikram",
    description: "A special investigator uncovers a syndicate of masked vigilantes and drug lords involved in high-stakes tactical warfare.",
    language: "Tamil",
    runtime: 175,
    releaseYear: 2022,
    rating: 8.3,
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=OKBMCL-frPU",
    genres: ["Action", "Thriller"],
    moods: ["Adventurous", "Curious"],
    experiences: ["Action and adventure", "Suspense and mystery"]
  },
  {
    title: "96",
    description: "Two high school sweethearts meet after 22 years at a school reunion and spend a night reminiscing about what might have been.",
    language: "Tamil",
    runtime: 158,
    releaseYear: 2018,
    rating: 8.5,
    posterUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=r0XZT_y8t4Y",
    genres: ["Romance", "Drama"],
    moods: ["Nostalgic", "Heartbroken"],
    experiences: ["Emotional storytelling", "Feel-good experience"]
  },
  {
    title: "Super Deluxe",
    description: "An unfaithful wife, an estranged father, and a curious teenager unexpectedly cross paths in bizarre and existential situations.",
    language: "Tamil",
    runtime: 176,
    releaseYear: 2019,
    rating: 8.3,
    posterUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=3-Xq_ZCX3w4",
    genres: ["Drama", "Thriller", "Comedy"],
    moods: ["Curious", "Bored"],
    experiences: ["Mind-bending plot", "Suspense and mystery"]
  },
  {
    title: "Kaithi",
    description: "A recently released prisoner drives a truck full of poisoned policemen to a hospital while evading dangerous cartel criminals.",
    language: "Tamil",
    runtime: 145,
    releaseYear: 2019,
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=g79vibTlxY8",
    genres: ["Action", "Thriller"],
    moods: ["Adventurous"],
    experiences: ["Action and adventure", "Suspense and mystery"]
  },
  {
    title: "Jai Bhim",
    description: "When a tribal man is framed and goes missing from police custody, an unyielding lawyer fights against systemic tyranny to find justice.",
    language: "Tamil",
    runtime: 164,
    releaseYear: 2021,
    rating: 8.8,
    posterUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=Gc6dEDnL8JA",
    genres: ["Drama", "Mystery"],
    moods: ["Heartbroken", "Curious"],
    experiences: ["Emotional storytelling", "Suspense and mystery"]
  },
  {
    title: "Asuran",
    description: "A pacified farmer with a bloody past is forced to flee into the forest to protect his hot-headed teenage son from ruthless feudal landlords.",
    language: "Tamil",
    runtime: 141,
    releaseYear: 2019,
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=vJj_7v6a2gE",
    genres: ["Action", "Drama"],
    moods: ["Adventurous", "Heartbroken"],
    experiences: ["Action and adventure", "Emotional storytelling"]
  },
  {
    title: "Pariyerum Perumal",
    description: "A law student from an oppressed caste struggles against institutional prejudice while forming a tender friendship with a classmate.",
    language: "Tamil",
    runtime: 154,
    releaseYear: 2018,
    rating: 8.7,
    posterUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=8V3Cq6i3H1w",
    genres: ["Drama"],
    moods: ["Heartbroken", "Nostalgic"],
    experiences: ["Emotional storytelling"]
  },
  {
    title: "Ratsasan",
    description: "An aspiring filmmaker turned sub-inspector uses his deep criminal research to track down a calculating serial predator targeting schoolgirls.",
    language: "Tamil",
    runtime: 170,
    releaseYear: 2018,
    rating: 8.3,
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=bQhS_v6p5fI",
    genres: ["Thriller", "Mystery"],
    moods: ["Curious", "Bored"],
    experiences: ["Suspense and mystery", "Mind-bending plot"]
  },
  {
    title: "Kadaisi Vivasayi",
    description: "An elderly farmer in a secluded Tamil village remains the only person cultivating his ancestral crop when surrounding lands are commercialized.",
    language: "Tamil",
    runtime: 144,
    releaseYear: 2021,
    rating: 8.6,
    posterUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=w9M0X1v7-6k",
    genres: ["Drama", "Comedy"],
    moods: ["Relaxed", "Nostalgic"],
    experiences: ["Feel-good experience", "Emotional storytelling"]
  },
  {
    title: "Maanagaram",
    description: "Four young individuals from different walks of life cross paths across the bustling metropolitan jungle of Chennai during a single fateful night.",
    language: "Tamil",
    runtime: 137,
    releaseYear: 2017,
    rating: 8.1,
    posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=9g0s3Q1l8sM",
    genres: ["Thriller", "Action"],
    moods: ["Curious", "Adventurous"],
    experiences: ["Suspense and mystery", "Mind-bending plot"]
  },

  // --- MALAYALAM (10 titles) ---
  {
    title: "Kumbalangi Nights",
    description: "Four brothers living in a dysfunctional home in Kumbalangi bond and find empathy through mutual acceptance and romance.",
    language: "Malayalam",
    runtime: 135,
    releaseYear: 2019,
    rating: 8.5,
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=5fL8x7lP8zQ",
    genres: ["Drama", "Comedy", "Romance"],
    moods: ["Relaxed", "Happy"],
    experiences: ["Feel-good experience", "Emotional storytelling"]
  },
  {
    title: "Drishyam",
    description: "A common man uses his meticulous knowledge of cinema to protect his family from being convicted after an accidental crime.",
    language: "Malayalam",
    runtime: 160,
    releaseYear: 2013,
    rating: 8.6,
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=e_sS1o2tX2M",
    genres: ["Thriller", "Mystery", "Drama"],
    moods: ["Curious"],
    experiences: ["Mind-bending plot", "Suspense and mystery"]
  },
  {
    title: "Manjummel Boys",
    description: "A group of daring young friends from Kochi embark on a rescue mission when one of them falls into the treacherous Guna Caves.",
    language: "Malayalam",
    runtime: 135,
    releaseYear: 2024,
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=Jm_2DvdV4pY",
    genres: ["Thriller", "Drama", "Adventure"],
    moods: ["Adventurous", "Nostalgic"],
    experiences: ["Emotional storytelling", "Suspense and mystery"]
  },
  {
    title: "Premalu",
    description: "A carefree graduate moves to Hyderabad for a coding certification and falls for an ambitious IT professional.",
    language: "Malayalam",
    runtime: 156,
    releaseYear: 2024,
    rating: 7.9,
    posterUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=aG9K0D_G1oU",
    genres: ["Comedy", "Romance"],
    moods: ["Happy", "Relaxed"],
    experiences: ["Lighthearted entertainment", "Feel-good experience"]
  },
  {
    title: "Aavesham",
    description: "Three college students who arrive in Bangalore for engineering get bullied and seek help from a local eccentric gangster named Ranga.",
    language: "Malayalam",
    runtime: 158,
    releaseYear: 2024,
    rating: 8.0,
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=sM3j6P1O8iY",
    genres: ["Action", "Comedy"],
    moods: ["Happy", "Adventurous", "Bored"],
    experiences: ["Lighthearted entertainment", "Action and adventure"]
  },
  {
    title: "The Great Indian Kitchen",
    description: "A newly married woman struggles to be the submissive wife her husband and family expect while trapped in endless domestic routine.",
    language: "Malayalam",
    runtime: 100,
    releaseYear: 2021,
    rating: 8.2,
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=QZ0D2J1j8qM",
    genres: ["Drama"],
    moods: ["Heartbroken", "Curious"],
    experiences: ["Emotional storytelling"]
  },
  {
    title: "Bangalore Days",
    description: "Three cousins from Kerala move to Bangalore, each pursuing their individual dreams while supporting one another through romance and heartbreak.",
    language: "Malayalam",
    runtime: 171,
    releaseYear: 2014,
    rating: 8.3,
    posterUrl: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=fXW9P1V0y_I",
    genres: ["Romance", "Comedy", "Drama"],
    moods: ["Happy", "Nostalgic"],
    experiences: ["Feel-good experience", "Lighthearted entertainment"]
  },
  {
    title: "Joji",
    description: "An engineering dropout with lofty ambitions seizes an opportunity when his wealthy, authoritarian father suffers a debilitating stroke.",
    language: "Malayalam",
    runtime: 113,
    releaseYear: 2021,
    rating: 7.8,
    posterUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=8V4c9J1o_fM",
    genres: ["Drama", "Thriller"],
    moods: ["Curious", "Bored"],
    experiences: ["Suspense and mystery", "Mind-bending plot"]
  },
  {
    title: "Maheshinte Prathikaaram",
    description: "A small-town photographer in Idukki gets humiliated in a street fight and vows never to wear slippers again until he avenges his dignity.",
    language: "Malayalam",
    runtime: 120,
    releaseYear: 2016,
    rating: 8.1,
    posterUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=7uV8Y2i2l4k",
    genres: ["Comedy", "Drama"],
    moods: ["Relaxed", "Happy"],
    experiences: ["Lighthearted entertainment", "Feel-good experience"]
  },
  {
    title: "Minnal Murali",
    description: "A humble tailor gains superpowers after being struck by a mystical bolt of lightning, but must protect his village when an adversary emerges.",
    language: "Malayalam",
    runtime: 158,
    releaseYear: 2021,
    rating: 7.9,
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=8lJ5M_31eQ0",
    genres: ["Action", "Fantasy", "Comedy"],
    moods: ["Adventurous", "Happy"],
    experiences: ["Action and adventure", "Feel-good experience"]
  },

  // --- KANNADA (8 titles) ---
  {
    title: "Kantara",
    description: "A human-nature conflict escalates between a rebellious tribal hero and a stern forest officer amidst divine spiritual folklore.",
    language: "Kannada",
    runtime: 148,
    releaseYear: 2022,
    rating: 8.3,
    posterUrl: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=8mrVmf24A-U",
    genres: ["Action", "Drama", "Thriller"],
    moods: ["Adventurous", "Curious"],
    experiences: ["Action and adventure", "Emotional storytelling"]
  },
  {
    title: "777 Charlie",
    description: "A reclusive factory worker stuck in a dull and lonely existence finds a new purpose when a stray Labrador enters his life.",
    language: "Kannada",
    runtime: 164,
    releaseYear: 2022,
    rating: 8.8,
    posterUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=Wz_nF3wA9-E",
    genres: ["Drama", "Comedy", "Adventure"],
    moods: ["Heartbroken", "Happy"],
    experiences: ["Emotional storytelling", "Feel-good experience"]
  },
  {
    title: "Lucia",
    description: "An usher suffering from insomnia is tricked into buying a pill that blurs the boundary between reality and lucid dreams.",
    language: "Kannada",
    runtime: 135,
    releaseYear: 2013,
    rating: 8.2,
    posterUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=0h5U3y_P0kE",
    genres: ["Thriller", "Mystery", "Science Fiction"],
    moods: ["Curious"],
    experiences: ["Mind-bending plot", "Suspense and mystery"]
  },
  {
    title: "K.G.F: Chapter 1",
    description: "In the 1970s, a fierce mercenary named Rocky rises from the streets of Bombay to liberate enslaved miners at the Kolar Gold Fields.",
    language: "Kannada",
    runtime: 156,
    releaseYear: 2018,
    rating: 8.2,
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=-KfsY-qwBS0",
    genres: ["Action", "Drama"],
    moods: ["Adventurous"],
    experiences: ["Action and adventure"]
  },
  {
    title: "Ulidavaru Kandanthe",
    description: "An anthology of five different perspectives unravels a murder that took place during a Janmashtami festival in a coastal Karnataka town.",
    language: "Kannada",
    runtime: 155,
    releaseYear: 2014,
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=0Q7T8y1L4_s",
    genres: ["Crime", "Drama", "Mystery"],
    moods: ["Curious", "Nostalgic"],
    experiences: ["Mind-bending plot", "Suspense and mystery"]
  },
  {
    title: "Garuda Gamana Vrishabha Vahana",
    description: "A bond between two orphaned friends becomes a reign of fear in Mangaladevi until ambition and ego pit them against each other.",
    language: "Kannada",
    runtime: 151,
    releaseYear: 2021,
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=5Vj_7P0Q1_Y",
    genres: ["Action", "Drama", "Crime"],
    moods: ["Curious", "Adventurous"],
    experiences: ["Action and adventure", "Emotional storytelling"]
  },
  {
    title: "Kirik Party",
    description: "A fun-loving engineering student finds his reckless worldview challenged after falling in love with a mature senior.",
    language: "Kannada",
    runtime: 165,
    releaseYear: 2016,
    rating: 8.2,
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=6v7P1Q8Y_sY",
    genres: ["Comedy", "Romance", "Drama"],
    moods: ["Happy", "Nostalgic"],
    experiences: ["Feel-good experience", "Lighthearted entertainment"]
  },
  {
    title: "Dia",
    description: "A reclusive young woman struggles to express her feelings to a college senior, only for tragedy and an unexpected second chance to redefine love.",
    language: "Kannada",
    runtime: 137,
    releaseYear: 2020,
    rating: 8.1,
    posterUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=9g0s3Q1l8sM",
    genres: ["Romance", "Drama"],
    moods: ["Heartbroken", "Nostalgic"],
    experiences: ["Emotional storytelling"]
  },

  // --- KOREAN (10 titles) ---
  {
    title: "Parasite",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    language: "Korean",
    runtime: 132,
    releaseYear: 2019,
    rating: 8.5,
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=5xH0R_g3mEQ",
    genres: ["Drama", "Thriller", "Comedy"],
    moods: ["Curious", "Bored"],
    experiences: ["Mind-bending plot", "Suspense and mystery"]
  },
  {
    title: "Train to Busan",
    description: "While a zombie virus breaks out in South Korea, passengers struggle to survive on the bullet train from Seoul to Busan.",
    language: "Korean",
    runtime: 118,
    releaseYear: 2016,
    rating: 7.6,
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=pyWuM7zS1wQ",
    genres: ["Action", "Horror", "Thriller"],
    moods: ["Adventurous"],
    experiences: ["Action and adventure", "Emotional storytelling"]
  },
  {
    title: "Past Lives",
    description: "Nora and Hae Sung, two deeply connected childhood friends, are wrested apart after Nora's family emigrates from South Korea and reunite two decades later.",
    language: "Korean",
    runtime: 106,
    releaseYear: 2023,
    rating: 7.9,
    posterUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=kA244xewjcI",
    genres: ["Romance", "Drama"],
    moods: ["Nostalgic", "Heartbroken", "Relaxed"],
    experiences: ["Emotional storytelling", "Feel-good experience"]
  },
  {
    title: "Memories of Murder",
    description: "In 1986, two detectives with drastically different methods investigate a string of brutal rapes and murders in a rural Korean province.",
    language: "Korean",
    runtime: 131,
    releaseYear: 2003,
    rating: 8.1,
    posterUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1509281373149-e957c6296406?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=0n_HbM2vGWA",
    genres: ["Mystery", "Thriller", "Drama"],
    moods: ["Curious"],
    experiences: ["Suspense and mystery", "Mind-bending plot"]
  },
  {
    title: "Oldboy",
    description: "After being kidnapped and imprisoned for fifteen years without explanation, Oh Dae-su is released and given five days to find his captor.",
    language: "Korean",
    runtime: 120,
    releaseYear: 2003,
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=2HkjrJ6IK5E",
    genres: ["Action", "Drama", "Mystery"],
    moods: ["Curious", "Bored"],
    experiences: ["Mind-bending plot", "Action and adventure"]
  },
  {
    title: "The Handmaiden",
    description: "A young woman is hired as a handmaiden to an aristocratic Japanese heiress, but secretly participates in a plot to defraud her of her inheritance.",
    language: "Korean",
    runtime: 145,
    releaseYear: 2016,
    rating: 8.1,
    posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=whldChqCsYk",
    genres: ["Drama", "Romance", "Thriller"],
    moods: ["Curious"],
    experiences: ["Mind-bending plot", "Suspense and mystery"]
  },
  {
    title: "A Taxi Driver",
    description: "A widowed Seoul taxi driver accidentally drives a German journalist into the volatile center of the 1980 Gwangju Uprising.",
    language: "Korean",
    runtime: 137,
    releaseYear: 2017,
    rating: 7.9,
    posterUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=baUP4pZgP60",
    genres: ["Action", "Drama"],
    moods: ["Heartbroken", "Adventurous"],
    experiences: ["Emotional storytelling", "Action and adventure"]
  },
  {
    title: "Burning",
    description: "A delivery man runs into an old childhood neighbor who asks him to look after her cat, before introducing an enigmatic, affluent companion.",
    language: "Korean",
    runtime: 148,
    releaseYear: 2018,
    rating: 7.5,
    posterUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=oKaSIikvX6A",
    genres: ["Mystery", "Drama"],
    moods: ["Curious", "Relaxed"],
    experiences: ["Mind-bending plot", "Suspense and mystery"]
  },
  {
    title: "Decision to Leave",
    description: "An insomniac detective investigating a mountain climber's suspicious death finds himself falling under the spell of the victim's widow.",
    language: "Korean",
    runtime: 138,
    releaseYear: 2022,
    rating: 7.3,
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=BonaKGxT0Ew",
    genres: ["Mystery", "Romance", "Drama"],
    moods: ["Curious", "Heartbroken"],
    experiences: ["Mind-bending plot", "Suspense and mystery"]
  },
  {
    title: "Extreme Job",
    description: "A team of bumbling narcotics detectives stakes out a drug cartel by buying a rundown fried chicken joint, which unexpectedly becomes a viral food sensation.",
    language: "Korean",
    runtime: 111,
    releaseYear: 2019,
    rating: 7.1,
    posterUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=Vl8dF9v81pU",
    genres: ["Comedy", "Action"],
    moods: ["Happy", "Bored"],
    experiences: ["Lighthearted entertainment", "Action and adventure"]
  },

  // --- JAPANESE (10 titles) ---
  {
    title: "Spirited Away",
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
    language: "Japanese",
    runtime: 125,
    releaseYear: 2001,
    rating: 8.6,
    posterUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
    genres: ["Animation", "Fantasy", "Adventure"],
    moods: ["Adventurous", "Nostalgic", "Relaxed"],
    experiences: ["Feel-good experience", "Emotional storytelling"]
  },
  {
    title: "Your Name",
    description: "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance and time be the only things to keep them apart?",
    language: "Japanese",
    runtime: 106,
    releaseYear: 2016,
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=xU47nhruN-Q",
    genres: ["Animation", "Romance", "Drama", "Fantasy"],
    moods: ["Heartbroken", "Nostalgic", "Happy"],
    experiences: ["Emotional storytelling", "Mind-bending plot"]
  },
  {
    title: "Monster",
    description: "When her young son starts acting strangely, a mother senses something is wrong. When she discovers that a teacher is responsible, she storms the school.",
    language: "Japanese",
    runtime: 127,
    releaseYear: 2023,
    rating: 8.0,
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=3nK2m9vG4kY",
    genres: ["Drama", "Mystery"],
    moods: ["Curious", "Heartbroken"],
    experiences: ["Emotional storytelling", "Mind-bending plot"]
  },
  {
    title: "Drive My Car",
    description: "An aging theater director grappling with grief accepts a residency in Hiroshima and forms a quiet bond with a reserved young female chauffeur.",
    language: "Japanese",
    runtime: 179,
    releaseYear: 2021,
    rating: 7.6,
    posterUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=6BKYVfF4i_Y",
    genres: ["Drama"],
    moods: ["Relaxed", "Heartbroken"],
    experiences: ["Emotional storytelling"]
  },
  {
    title: "Godzilla Minus One",
    description: "Post-war Japan is at its lowest point when a new crisis in the form of a giant monster rises to inflict further devastation on an already battered nation.",
    language: "Japanese",
    runtime: 125,
    releaseYear: 2023,
    rating: 8.3,
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=r7DqccP1Q_4",
    genres: ["Action", "Science Fiction", "Drama"],
    moods: ["Adventurous"],
    experiences: ["Action and adventure", "Emotional storytelling"]
  },
  {
    title: "Princess Mononoke",
    description: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony.",
    language: "Japanese",
    runtime: 134,
    releaseYear: 1997,
    rating: 8.4,
    posterUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=4OiMOHRDs14",
    genres: ["Animation", "Action", "Fantasy"],
    moods: ["Adventurous"],
    experiences: ["Action and adventure", "Mind-bending plot"]
  },
  {
    title: "Perfect Days",
    description: "Hirayama cleans public toilets in Tokyo, finding quiet contentment in music on cassette tapes, photography of light filtering through trees, and books.",
    language: "Japanese",
    runtime: 124,
    releaseYear: 2023,
    rating: 7.9,
    posterUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=Qz_m3q1a8yQ",
    genres: ["Drama"],
    moods: ["Relaxed", "Nostalgic"],
    experiences: ["Feel-good experience", "Emotional storytelling"]
  },
  {
    title: "Shoplifters",
    description: "A Japanese family of ragtag grifters relying on petty shoplifting to survive takes in a neglected young girl found freezing in the streets.",
    language: "Japanese",
    runtime: 121,
    releaseYear: 2018,
    rating: 7.9,
    posterUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=9382rwoMiXc",
    genres: ["Drama"],
    moods: ["Heartbroken", "Nostalgic"],
    experiences: ["Emotional storytelling"]
  },
  {
    title: "Seven Samurai",
    description: "A poor farming village besieged by ruthless bandits hires seven masterless samurai to teach them defensive tactics and protect their winter harvest.",
    language: "Japanese",
    runtime: 207,
    releaseYear: 1954,
    rating: 8.6,
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=wJ1TOratCTo",
    genres: ["Action", "Drama"],
    moods: ["Adventurous"],
    experiences: ["Action and adventure", "Emotional storytelling"]
  },
  {
    title: "Suzume",
    description: "A 17-year-old girl and a mysterious young wanderer race across Japan closing enchanted doors before colossal natural disasters are unleashed.",
    language: "Japanese",
    runtime: 122,
    releaseYear: 2022,
    rating: 7.7,
    posterUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=600&auto=format&fit=crop&q=80",
    backdropUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=1600&auto=format&fit=crop&q=80",
    trailerUrl: "https://www.youtube.com/watch?v=F7nQ0VUAOXg",
    genres: ["Animation", "Fantasy", "Action"],
    moods: ["Adventurous", "Heartbroken"],
    experiences: ["Action and adventure", "Emotional storytelling"]
  }
];

async function main() {
  console.log(`Starting MoodFlix repeatable upsert seeding for ${moviesData.length} curated movies...`);

  let added = 0;
  let updated = 0;

  for (const item of moviesData) {
    const { genres, moods, experiences, ...movieFields } = item;

    // Connect or create genres
    const genreConnect = genres.map(name => ({
      where: { name },
      create: { name }
    }));

    // Connect or create moods
    const moodConnect = moods.map(name => ({
      where: { name },
      create: { name }
    }));

    // Connect or create experiences
    const expConnect = experiences.map(name => ({
      where: { name },
      create: { name }
    }));

    // Check if movie already exists by unique combination of title & language
    const existing = await prisma.movie.findFirst({
      where: {
        title: item.title,
        language: item.language
      }
    });

    if (existing) {
      // Update metadata & relations
      await prisma.movie.update({
        where: { id: existing.id },
        data: {
          ...movieFields,
          genres: { set: [], connectOrCreate: genreConnect },
          moodTags: { set: [], connectOrCreate: moodConnect },
          experienceTags: { set: [], connectOrCreate: expConnect }
        }
      });
      updated++;
    } else {
      // Create new movie
      await prisma.movie.create({
        data: {
          ...movieFields,
          genres: { connectOrCreate: genreConnect },
          moodTags: { connectOrCreate: moodConnect },
          experienceTags: { connectOrCreate: expConnect }
        }
      });
      added++;
    }
  }

  const movieCount = await prisma.movie.count();
  const genreCount = await prisma.genre.count();
  const moodCount = await prisma.moodTag.count();
  const expCount = await prisma.experienceTag.count();

  console.log(`\nSeeding completed safely without dropping database!`);
  console.log(`- New movies added: ${added}`);
  console.log(`- Existing movies updated: ${updated}`);
  console.log(`- Total movies in library: ${movieCount}`);
  console.log(`- Genres available: ${genreCount}`);
  console.log(`- Mood tags available: ${moodCount}`);
  console.log(`- Experience tags available: ${expCount}`);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
