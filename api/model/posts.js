var db = require('../conf/database');

const PostModal = {
    create: function (post, user_poster_id, user_receiver_id) {
        let baseSQL = 'INSERT INTO posts (post, created, user_poster_id, user_receiver_id) VALUE (?, now(), ?, ?)';
        return db.execute(baseSQL, [post, user_poster_id, user_receiver_id])
    },
    retrieveRecentPostsToUser: function (username) {
        let baseSQL = 'SELECT p.post_id, p.post, p.created, p.user_poster_id, p.user_receiver_id, u.username\
        FROM posts p \
        JOIN users u on p.user_receiver_id=u.user_id \
        WHERE u.username=? \
        ORDER BY p.created DESC';

        return db.query(baseSQL, [username])
    },
    retrieveUserPostsAndFriendsPostsByUserId: function (_id) {
        let baseSQL = 'SELECT p.post_id, p.post, p.created, p.user_poster_id, p.user_receiver_id, u.username\
        FROM posts p \
        JOIN friends f on p.user_poster_id=f.user_id or p.user_poster_id=f.friend_id \
        JOIN users u on p.user_poster_id=u.user_id\
        WHERE f.user_id=?\
        ORDER BY p.created DESC';

        return db.query(baseSQL, [_id])
    }
}

module.exports = PostModal;