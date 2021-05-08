var db = require('../conf/database');

const FriendsModel = {
    create: function (status, user_id, friend_id) {
        let baseSQL = 'INSERT INTO friends (status, user_id, friend_id, created) VALUE (?, ?, ?, now())';
        return db.execute(baseSQL, [status, user_id, friend_id])
    },
    updateStatus: function (status, user_id) {
        let baseSQL = 'UPDATE friends\
        SET status = ?, created = now()\
        WHERE user_id = ?';
        return db.execute(baseSQL, [status, user_id])
    },
    retrieveFriendStatus: function (user_id, friend_id) {
        let baseSql = 'SELECT f.status \
        FROM friends f\
        JOIN users u on f.user_id = u.user_id \
        WHERE f.user_id = ? AND f.friend_id = ?;'

        return db.query(baseSql, [user_id, friend_id])
    },
    retrieveFriendRequests: function (user_id) {
        let baseSql = 'SELECT f.status, f.user_id, f.friend_id \
        FROM friends f \
        JOIN users u on f.user_id = f.friend_id \
        WHERE f.status = 0'

        return db.query(baseSql, [user_id])
    }
    
}

module.exports = FriendsModel;