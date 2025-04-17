const db = require('../config/database');

function checkApiKey(req, res, next) {
  const apiKey = req.header('x-api-key');

  if (!apiKey) {
    return res.status(401).json({ message: 'API key missing' });
  }

  const sql = `SELECT * FROM api_keys WHERE api_key = ?`;
  db.get(sql, [apiKey], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!row) {
      return res.status(403).json({ message: 'Invalid API key' });
    }

    req.user = { id: row.user_id };
    db.run(
      'INSERT INTO usage_log (user_id, endpoint) VALUES (?, ?)',
      [row.user_id, req.originalUrl],
      (logErr) => {
        if (logErr) {
          console.error('Error logging usage:', logErr.message);
        }
        next();
      }
    );
  });
}

module.exports = checkApiKey;
