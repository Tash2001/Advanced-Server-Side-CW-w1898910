const db = require('../config/db.js');

const insertLike = (userId,postId,type, callback)=>{
    const sql =`
    INSERT INTO post_likes (userid,postId,type) VALUES (?,?,?)
    ON CONFLICT(userId, postId)
    DO UPDATE SET TYPE = excluded.type
    `;
    db.run(sql,[userId,postId,type], callback);
};

const getLikeCounts = (postId, callback)=>{
    const sql =`
    SELECT type, COUNT(*) as count
    FROM post_likes
    WHERE postId = ?
    GROUP BY type
    `;
    db.all(sql,[postId],(err,rows)=>{
        if(err) return callback(err);

        const result = {likes:0,dislikes:0};
        rows.forEach(row=>{
            if(row.type === 'like') result.likes = row.count;
            if(row.type === 'dislike')result.dislikes = row.count;

        });
        callback(null, result);
    });

   
};

module.exports = {
    insertLike,
    getLikeCounts
}