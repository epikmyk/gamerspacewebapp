var db = require('../conf/database');

const PostModal = {
    create: function (post, image, user_poster_id, user_receiver_id) {
        let baseSQL = 'INSERT INTO posts (post, image, created, user_poster_id, user_receiver_id) VALUE (?, ?, now(), ?, ?)';
        return db.execute(baseSQL, [post, image, user_poster_id, user_receiver_id])
    },
    retrieveRecentPostsToUser: function (username, _id) {

        let baseSQL = 'WITH UserPosts AS (SELECT p.post_id, p.post, p.created, p.user_poster_id, p.user_receiver_id, u.username, p.image, u.profile_pic\
            FROM posts p\
            JOIN users u on p.user_receiver_id=u.user_id\
            WHERE u.username=?),\
            LikeCount as (\
            SELECT COUNT(*) as likes, p.post_id\
            from posts p\
            LEFT OUTER JOIN likes l on l.post_id=p.post_id\
            WHERE l.like_post=1\
            GROUP BY p.post_id)\
            (SELECT DISTINCT p.post_id, p.post, p.created, p.user_poster_id, p.user_receiver_id, u.username, p.image, u.profile_pic, IFNULL(l.like_post, 0) as like_post, IFNULL(lc.likes, 0) as likes\
            FROM UserPosts p\
            JOIN users u on p.user_poster_id=u.user_id\
            LEFT OUTER JOIN likes l on l.user_id=? AND p.post_id=l.post_id\
            LEFT OUTER JOIN LikeCount lc on lc.post_id=p.post_id)\
            ORDER BY p.created DESC';

        return db.query(baseSQL, [username, _id])
    },
    retrieveUserPostsAndFriendsPostsByUserId: function (_id) {

        let baseSQL = 'WITH UserFriends AS (SELECT DISTINCT f.user_id, u.username, f.status, u.profile_pic\
            FROM friends f\
            JOIN users u on f.user_id=u.user_id\
            WHERE f.user_id = ? or friend_id = ?),\
            LikeCount as (\
            SELECT COUNT(*) as likes, p.post_id\
            from posts p\
            LEFT OUTER JOIN likes l on l.post_id=p.post_id\
            WHERE l.like_post=1\
            GROUP BY p.post_id)\
            (SELECT p.post_id, p.post, p.created, p.user_poster_id, p.user_receiver_id, u.username, p.image, u.profile_pic, IFNULL(l.like_post, 0) as like_post, IFNULL(lc.likes, 0) as likes\
            FROM posts p\
            JOIN UserFriends u on p.user_poster_id=u.user_id\
            LEFT OUTER JOIN likes l on l.user_id=? AND p.post_id=l.post_id\
            LEFT OUTER JOIN LikeCount lc on lc.post_id=p.post_id\
            WHERE p.user_receiver_id = p.user_poster_id AND u.status = 1\
            ORDER BY p.created DESC)';

        return db.query(baseSQL, [_id, _id, _id])
    }
}

module.exports = PostModal;