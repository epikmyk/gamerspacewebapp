var db = require('../conf/database');

const LikeModal = {
    create: function (like_post, user_id, post_id) {
        let baseSQL = 'INSERT INTO likes (like_post, created, user_id, post_id) VALUE (?, now(), ?, ?)';
        return db.execute(baseSQL, [like_post, user_id, post_id])
    },
    changeLike: function (like_post, user_id, post_id) {
        let baseSQL = 'UPDATE likes \
        SET like_post = ? \
        WHERE user_id = ? AND post_id = ?'

        return db.execute(baseSQL, [like_post, user_id, post_id])
        .catch((err) => {
            throw err;
        })
    },
    retrieveLike: function (user_id, post_id) {
        let baseSQL = 'SELECT l.like_post, u.user_id, p.post_id \
        FROM likes l \
        JOIN users u on l.user_id=u.user_id \
        JOIN posts p on l.post_id=p.post_id \
        WHERE u.user_id = ? and p.post_id = ?'

        return db.query(baseSQL, [user_id, post_id])
    }, 
    retrieveLikes: function (post_id) {
        let baseSQL = 'SELECT l.like_post, u.username, u.user_id, p.post_id \
        FROM likes l \
        JOIN users u on l.user_id=u.user_id \
        JOIN posts p on l.post_id=p.post_id \
        WHERE p.post_id = ?'

        return db.query(baseSQL, [post_id])
    }
}

module.exports = LikeModal;