var db = require('../conf/database');

const GameModal = {
    create: function (slug, name, image, user_id) {
        let baseSQL = 'INSERT INTO FavoriteGames (slug, name, background_image, user_id) VALUE (?, ?, ?, ?)';
        return db.execute(baseSQL, [slug, name, image, user_id])
    },
    createUserGame: function (game_id, user_id) {
        let baseSQL = 'INSERT INTO UserGames (game_id, user_id) VALUE (?, ?)';
        return db.execute(baseSQL, [game_id, user_id])
    },
    retrieveGameByName: function (game) {
        let baseSQL = 'SELECT name, game_id \
        from games \
        WHERE slug = ?';

        return db.query(baseSQL, [game])
    },
    retrieveLatestInsertion: function () {
        let baseSQL = 'SELECT * FROM games WHERE game_id= LAST_INSERT_ID()'

        return db.query(baseSQL)
    },
    retrieveGamesByUserId: function (username) {
        let baseSQL = 'SELECT DISTINCT f.slug, f.name, f.background_image \
        FROM FavoriteGames f \
        JOIN users u on f.user_id = u.user_id\
        WHERE u.username = ?' 

        return db.query(baseSQL, [username]);
    },
    retrieveMutualFavoriteGames: function (user_id, profile_user_id) {
        let baseSQL = 'SELECT f.name\
        From FavoriteGames f\
        WHERE f.user_id = ? or f.user_id = ?\
        GROUP BY f.name\
        HAVING COUNT(*) > 1'

        return db.query(baseSQL, [user_id, profile_user_id])
    }
}

module.exports = GameModal