const { createUser, findUserByEmail, findusername, findUserByUsername, findUserById,findPasswordByUserId,updatePasswordByUserId} = require("../daos/userDao");
const { hashPassword, comparePassword } = require("../utils/hashUtil");
const { generatetoken } = require("../utils/jwtUtil");
const bcrypt = require('bcrypt');


const register = (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = hashPassword(password);

  createUser(username, email, hashedPassword, (err, UserId) => {
    if (err) return res.status(500).json({ error: 'Email or Username already registered' });

    res.status(201).json({ msg: 'User registered successfully', UserId });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'Invalid username' });

    const isMatch = comparePassword(password, user.password);
    if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

    const token = generatetoken({ id: user.id, username: user.username });
    res.json({ msg: 'Login Successful', token });
  });

};

const username = (req, res) => {
  const userId = req.params.id;

  findusername(userId, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json({ username: row.username });
  });
};

const getUserByUsername = (req, res) => {
  const username = req.params.username;
  findUserByUsername(username, (err, row) => {
    console.log("Searching username in DB:", username);

    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'User not found' });
    res.json(row);
  });
};
const getUserById = (req, res) => {
  const id = req.params.id;
  findUserById(id, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  });
};

const resetPassword = (userId, currentPassword, newPassword, callback) => {
  findPasswordByUserId(userId, (err, row) => {
    if (err) return callback({ status: 500, message: err.message });
    if (!row) return callback({ status: 404, message: 'User not found' });

    bcrypt.compare(currentPassword, row.password, async (err, isMatch) => {
      if (err || !isMatch)
        return callback({ status: 400, message: 'Incorrect current password' });

      try {
        const hashed = await bcrypt.hash(newPassword, 10);
        updatePasswordByUserId(hashed, userId, (err) => {
          if (err) return callback({ status: 500, message: err.message });
          return callback(null, 'Password reset successful');
        });
      } catch (hashError) {
        return callback({ status: 500, message: 'Hashing failed' });
      }
    });
  });
};



module.exports = { register, login, username, getUserByUsername,getUserById,resetPassword };