const db = require('../config/db');

const createUser = (username, email, hashedPassword, callback) => {
    const sql = 'INSERT INTO users (username, email, password) VALUES (?,?,?)';
    db.run(sql, [username, email, hashedPassword], function(err){
        callback(err,this?.lastID);
    });
};

const findUserByEmail =(email,callback)=>{
    const sql = 'SELECT * FROM users WHERE email =?';
    db.get(sql,[email], callback);
};

const findusername = (userId, callback) => {
  const sql = 'SELECT username FROM users WHERE id = ?';
  db.get(sql, [userId], callback);
};

const findUserByUsername = (username, callback) => {
  const sql = `SELECT id, username FROM users WHERE username = ?`;
  db.get(sql, [username],callback);
};


module.exports = {createUser, findUserByEmail , findusername , findUserByUsername};