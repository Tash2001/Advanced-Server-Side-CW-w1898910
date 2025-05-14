const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'fallbackSecret';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    req.user = jwt.verify(token, secret);
    next();
  } catch (err) {
    res.status(403).json({ error: 'Invalid token' });
  }
};

module.exports = verifyToken;
