var db = require('../conf/database');

const GameModal = {
    create: function (slug, name, image) {
        let baseSQL = 'INSERT INTO games (slug, name, image) VALUE (?, ?, ?)';
        return db.execute(baseSQL, [slug, name, image])
    },
    createUserGame: function (game_id, user_id) {
        let baseSQL = 'INSERT INTO UserGames (game_id, user_id) VALUE (?, ?)';
        return db.execute(baseSQL, [game_id, user_id])
    },
    retrieveGameByName: function (game) {
        let baseSQL = 'SELECT name \
        from games \
        WHERE slug = ?';

        return db.query(baseSQL, [game])
    }
}

module.exports = GameModal