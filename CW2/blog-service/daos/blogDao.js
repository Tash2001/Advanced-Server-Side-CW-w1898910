const db = require('../config/db.js');

const createPost = (title, content, country, dateOfVisit, userId, callback) => {
  const sql = `Insert INTO posts(title,content,country, dateOfVisit,userId) VALUES (?,?,?,?,?)`;
  db.run(sql, [title, content, country, dateOfVisit, userId], function (err) {
    callback(err, this?.lastID);
  });
};

const getAllPosts = (callback) => {
  const sql = `
      SELECT *
      FROM posts
      ORDER BY posts.createdAt DESC
    `;
  db.all(sql, [], callback);
};


const getPostById = (id, callback) => {
  const sql = `SELECT *
    FROM posts
    WHERE id = ?`;

  db.get(sql, [id], (err, row) => {
    callback(err, row);
  });
};

const updatePost = (id, title, content, country, dateOfVisit, callback) => {
  const sql =
    `UPDATE posts 
    SET title=? , content=?, country=?, dateOfVisit=?
    WHERE id =?`;
  db.run(sql, [title, content, country, dateOfVisit, id], callback);
};

const deletePost = (id, callback) => {
  const sql = `
    DELETE FROM posts
    WHERE id =?`;
  db.run(sql, [id], callback);
};

//my post 
const getPostsUserId = (userId, callback) => {
  const sql = ` SELECT * FROM posts
    WHERE userId=?
    ORDER BY createdAt DESC`;
  db.all(sql, [userId], callback);
};

const getPostByCountry = (country, callback) => {
  const sql = `SELECT * FROM posts
  WHERE country=?
  ORDER BY createdAt DESC`;
  db.all(sql, [country], callback);
}

const searchPosts = (filters, callback) => {
  let sql = `SELECT * FROM posts WHERE 1=1`;
  const params = [];

  if (filters.country) {
    sql += ` AND country = ?`;
    params.push(filters.country);
  }

  if (filters.userId) {
    sql += ` AND userId = ?`;
    params.push(filters.userId);
  }

  sql += ` ORDER BY createdAt DESC`;

  db.all(sql, params, callback);
};


module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostsUserId,
  searchPosts,
  getPostByCountry,


};