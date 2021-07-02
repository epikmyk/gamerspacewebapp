var db = require('../conf/database');

const ChatModel = {
    create: function (user1_id, user2_id) {
        let baseSQL = 'INSERT INTO chat (created, user1_id, user2_id) VALUE (now(), ?, ?)';
        return db.execute(baseSQL, [user1_id, user2_id])
        .then(([results]) => {
            return Promise.resolve(results && results.affectedRows);
        })
        .catch((error) => {
            throw error;
        })
    },
    retrieveChatId: function (user1_id, user2_id) {
        let baseSQL = 'SELECT c.chat_id\
        FROM chat c\
        WHERE (user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)'

        return db.query(baseSQL, [user1_id, user2_id, user2_id, user1_id])
    },
    chatExists: function (user1_id, user2_id) {
        let baseSQL = 'SELECT * FROM chat WHERE ((user1_id = ? AND user2_id = ?) OR (user2_id = ? AND user1_id = ?))'
        return db.execute(baseSQL, [user1_id, user2_id, user2_id, user1_id])
        .then(([results]) => {
            return Promise.resolve(results && results.length == 0);
        })
        .catch((error) => {
            throw error;
        })
    },
    retrieveChats: function (user_id) {
        let baseSQL = 'WITH UserChat AS (SELECT c.chat_id, c.user1_id, c.user2_id, u.user_id, u.username\
            FROM chat c\
            JOIN users u on u.user_id = c.user1_id or u.user_id = c.user2_id\
            WHERE u.user_id = ? and c.active = 1),\
            UserChatFirstResult AS (SELECT c.chat_id, c.user1_id, c.user2_id, u.username, u.user_id, u.profile_pic\
            FROM chat c\
            JOIN UserChat uc on uc.user2_id = c.user2_id\
            JOIN users u on u.user_id = c.user2_id\
            WHERE uc.user2_id != ?),\
            UserChatSecondResult AS (SELECT c.chat_id, c.user1_id, c.user2_id, u.username, u.user_id, u.profile_pic\
            FROM chat c\
            JOIN UserChat uc on uc.user1_id = c.user1_id\
            JOIN users u on u.user_id = c.user1_id\
            WHERE uc.user1_id != ?)\
            (SELECT chat_id, user_id, username, profile_pic\
            FROM UserChatFirstResult ucf\
            UNION\
            SELECT chat_id, user_id, username, profile_pic \
            FROM UserChatSecondResult ucs)';

        return db.query(baseSQL, [user_id, user_id, user_id])
    },
    retrieveUserFromChat: function (chat_id, user_id) {
        let baseSQL = 'SELECT u.user_id, u.username, u.profile_pic\
        FROM users u\
        JOIN chat c on c.user1_id = u.user_id OR c.user2_id = u.user_id\
        WHERE c.chat_id = ? AND u.user_id != ?'

        return db.query(baseSQL, [chat_id, user_id])
    },
    changeChatStatus: function (active, chat_id) {
        let baseSQL = 'UPDATE chat \
        SET active = ? \
        WHERE chat_id = ?';
        return db.execute(baseSQL, [active, chat_id])
        .catch((err) => {
            throw err;
        })
    }
}

module.exports = ChatModel;