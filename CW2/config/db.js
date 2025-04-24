const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..','traveltales.db'),(err)=>{
    if(err){
        console.error('Error connecting to db:',err.message);

    }else{
        console.log('connecting to the db');
    }
});

db.run(`
    CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
    )
`);


module.exports =db;
