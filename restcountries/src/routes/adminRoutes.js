const express = require('express');
const db = require('../config/database');
const router = express.Router();

// Dummy check — assume admin if email is a specific address
function isAdmin(req, res, next) {
  if (req.user?.role=== 'admin') {
    next();
  } else {
    return res.status(403).json({ message: 'Admin access only' });
  }
}

// Get all users
router.get('/users', isAdmin, (req, res) => {
  db.all('SELECT id, name, email FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});



// Get usage logs
router.get('/logs', isAdmin, (req, res) => {
  db.all(`SELECT usage_log.id, users.email, endpoint, accessed_at
          FROM usage_log JOIN users ON usage_log.user_id = users.id
          ORDER BY accessed_at DESC`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get all API keys with usage info
router.get('/keys', isAdmin, (req, res) => {
  db.all(`
    SELECT 
      api_keys.api_key,
      users.email,
      api_keys.usage_count,
      api_keys.last_used,
      api_keys.created_at
    FROM api_keys
    JOIN users ON api_keys.user_id = users.id
  `, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});


module.exports = router;
