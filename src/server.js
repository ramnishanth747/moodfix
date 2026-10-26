require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`===============================================`);
  console.log(`  MoodFlix Backend Server running on http://${HOST}:${PORT}`);
  console.log(`  Health Check: http://${HOST}:${PORT}/api/health`);
  console.log(`  Movies API:   http://${HOST}:${PORT}/api/movies`);
  console.log(`===============================================`);
});
