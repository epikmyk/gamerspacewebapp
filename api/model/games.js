var db = require('../conf/database');

const GameModal = {
    create: function (slug, name, image, user_id) {
        let baseSQL = 'INSERT INTO FavoriteGames (slug, name, image, user_id) VALUE (?, ?, ?, ?)';
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
    /*
    retrieveGamesByUserId: function (user_id) {
        let baseSQL = 'SELECT g.name, g.image \
        FROM games g \
        JOIN UserGames f on g.game_id = f.game_id \
        JOIN users u on f.user_id=u.user_id \
        WHERE u.user_id = ?' 

        return db.query(baseSQL, [user_id]);
    }*/
    retrieveGamesByUserId: function (user_id) {
        let baseSQL = 'SELECT DISTINCT f.name, f.image \
        FROM FavoriteGames f \
        JOIN users u on f.user_id = u.user_id\
        WHERE u.user_id = ?' 

        return db.query(baseSQL, [user_id]);
    }
    

}

module.exports = GameModal