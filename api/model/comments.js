var db = require('../conf/database');

const CommentModal = {
    create: function (comment, image, user_id, post_id) {
        let baseSQL = 'INSERT INTO comments (comment, image, created, user_id, post_id) VALUE (?, ?, now(), ?, ?)';
        return db.execute(baseSQL, [comment, image, user_id, post_id])
    },
    retrieveComments: function (post_id) {
        let baseSQL = 'SELECT c.comment, c.image, c.created, u.username, u.profile_pic \
        FROM comments c\
        JOIN posts p on c.post_id=p.post_id\
        JOIN users u on c.user_id=u.user_id\
        WHERE p.post_id=?\
        ORDER BY c.created DESC'

        return db.query(baseSQL, [post_id]);
    }
}

module.exports = CommentModal;