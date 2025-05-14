class UsageDao {
    constructor(db) {
      this.db = db;
    }
  
    logUsage(userId, endpoint, callback) {
      const sql = `INSERT INTO usage_log (user_id, endpoint) VALUES (?, ?)`;
      this.db.run(sql, [userId, endpoint], callback);
    }
  
    getAllLogs(callback) {
      const sql = `SELECT usage_log.id, users.email, endpoint, accessed_at
                   FROM usage_log
                   JOIN users ON usage_log.user_id = users.id
                   ORDER BY accessed_at DESC`;
      this.db.all(sql, [], callback);
    }
  }
  
  module.exports = UsageDao;
  