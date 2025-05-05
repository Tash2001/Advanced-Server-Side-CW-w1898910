const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..', 'blog.db'), (err) => {
  if (err) {
    console.error(' Error connecting to blog DB:', err.message);
  } else {
    console.log(' Connected to blog SQLite DB');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    country TEXT,
    dateOfVisit TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`);

module.exports = db;
