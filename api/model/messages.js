var db = require('../conf/database');

const MessageModel = {

    create: function (message, user_id, chat_id) {
        let baseSQL = 'INSERT INTO messages (message, created, user_id, chat_id) VALUE (?, now(), ?, ?)';

        return db.execute(baseSQL, [message, user_id, chat_id])
    },
    retrieveMessages: function (chat_id) {
        let baseSQL = 'SELECT m.message, m.created, m.user_id, m.chat_id, u.username, u.profile_pic \
        FROM messages m\
        JOIN chat c ON c.chat_id = m.chat_id\
        JOIN users u ON u.user_id = m.user_id\
        WHERE c.chat_id = ?';

        return db.query(baseSQL, [chat_id])
    }
}

module.exports = MessageModel;