class UserDao{
    constructor(db){
        this.db=db;
    }

    create(user, callback){
        const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        this.db.run(sql,[user.name, user.email , user.password], callback);
    }

    getByEmail(email, callback){
        const sql = `SELECT * FROM users WHERE email = ?`;
        this.db.get(sql,[email], callback);
    }

    getById(id, callback){
        const sql = `SELECT * FROM users WHERE id=?`;
        this.db.get(sql, [id], callback);
    }

    getAll(callback){
        const sql = `SELECT * FROM users`;
        this.db.all(sql,[], callback)
    }

    delete(id, callback){
        const sql =`DELETE FROM users WHERE id=?`
        this.db.run(sql, [id], callback);
    }
}

module.exports = UserDao;