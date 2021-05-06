var db = require('../conf/database');

const FriendsModel = {
    create: function (status, user_id, friend_id) {
        let baseSQL = 'INSERT INTO friends (status, user_id, friend_id) VALUE (?, ?, ?)';
        return db.execute(baseSQL, [status, user_id, friend_id])
    },
    updateStatus: function (status, user_id) {
        let baseSQL = 'UPDATE friends\
        SET status = ?\
        WHERE user_id = ?';
        return db.execute(baseSQL, [status, user_id])
    },
    retrieveFriendStatus: function (user_id, friend_id) {
        let baseSql = 'SELECT f.status \
        FROM friends f\
        JOIN users u on f.user_id = u.user_id \
        WHERE f.user_id = ? AND f.friend_id = ?;'

        return db.query(baseSql, [user_id, friend_id])
    }
    
}

module.exports = FriendsModel;