const { createUser, findUserByEmail, findusername } = require("../daos/userDao");
const { hashPassword, comparePassword } = require("../utils/hashUtil");
const { generatetoken } = require("../utils/jwtUtil");


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


module.exports = { register, login , username};