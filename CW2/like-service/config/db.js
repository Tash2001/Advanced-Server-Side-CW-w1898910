const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '..','postLikes.db'),(err)=>{
    if(err){
        console.error('Error connecting to postLikes db:',err.message);

    }else{
        console.log('connecting to the postLikes db');
    }
});


    
db.run(`CREATE TABLE IF NOT EXISTS post_likes(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    type TEXT CHECK(type IN('like','dislike')),
    UNIQUE(userId, postId)
)`
);

module.exports =db;
