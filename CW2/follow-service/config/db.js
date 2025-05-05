const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..','follow.db'),(err)=>{
    if(err){
        console.error('Error connecting to follow db:',err.message);

    }else{
        console.log('connecting to the follow db');
    }
});



db.run(`
    CREATE TABLE IF NOT EXISTS followers(
    if INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    followerId INTEGER NOT NULL,
    UNIQUE(userId, followerId)
    )`
);
module.exports =db;
