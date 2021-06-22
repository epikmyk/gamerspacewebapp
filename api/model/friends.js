var db = require('../conf/database');

const FriendsModel = {
    create: function (status, user_id, friend_id) {
        let baseSQL = 'INSERT INTO friends (status, user_id, friend_id, created) VALUE (?, ?, ?, now())';
        return db.execute(baseSQL, [status, user_id, friend_id])
    },
    updateStatus: function (status, user_id, friend_id) {
        let baseSQL = 'UPDATE friends\
        SET status = ?, created = now()\
        WHERE user_id = ? AND friend_id = ?';
        return db.execute(baseSQL, [status, user_id, friend_id])
    },
    retrieveFriendStatus: function (user_id, friend_id) {
        let baseSql = 'SELECT f.status \
        FROM friends f\
        JOIN users u on f.user_id = u.user_id \
        WHERE f.user_id = ? AND f.friend_id = ?;'

        return db.query(baseSql, [user_id, friend_id])
    },
    retrieveAllFriendStatus: function (user_id) {
        let baseSql = 'SELECT f.user_id, f.friend_id, f.status \
        FROM friends f\
        JOIN users u on f.user_id = u.user_id \
        WHERE f.user_id = ? OR f.friend_id = ?;'

        return db.query(baseSql, [user_id, friend_id])
    },
    retrieveFriendRequests: function (user_id) {
        let baseSql = 'WITH FriendRequests AS (SELECT f.status, f.user_id, f.friend_id, f.created \
            FROM friends f \
            WHERE f.friend_id = ? AND f.status = 0) \
            (SELECT f.status, f.user_id, f.friend_id, u.username, f.created, u.profile_pic \
            FROM users u \
            JOIN FriendRequests f on u.user_id = f.user_id\
            WHERE u.user_id = f.user_id \
            ORDER BY f.created DESC) '

        return db.query(baseSql, [user_id])
    },
    deleteFriend: function (user_id, friend_id) {
        let baseSQL = 'DELETE FROM friends f\
        WHERE (f.friend_id = ? AND f.user_id = ?) OR (f.user_id = ? AND f.friend_id = ?)';

        return db.query(baseSQL, [user_id, friend_id, user_id, friend_id])
    },
    retrieveFriends: function (user_id) {
        let baseSQL = 'SELECT u.user_id, u.username, u.created, f.status\
        FROM users u\
        JOIN friends f on f.friend_id = u.user_id\
        WHERE f.user_id = ? AND f.status = 1'

        return db.query(baseSQL, [user_id])
    }

}

module.exports = FriendsModel;