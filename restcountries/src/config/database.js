const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or connect to SQLite DB
const dbPath = path.resolve(__dirname, './db.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Could not connect to database', err);
    } else {
        console.log('Connected to SQLite database');
    }

  // Create users table (if not exists)
    db.serialize(() => {
        db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
        `);
    });
});


  
module.exports = db;