var db = require('../conf/database');
var bcrypt = require('bcrypt');

const UserModel = {
    create: function (username, password, email) {
        return (bcrypt.hash(password, 10))
        .then((hashedPassword) => {
            return db.execute('INSERT INTO users (username, email, password, created) Values (?, ?, ?, now());', [username, email, hashedPassword]);
        })
        .then(([results]) => {
            return Promise.resolve(results && results.affectedRows);
        })
        .catch((error) => {
            throw error;
        })
    },

    usernameExists: function (username) {
        return db.execute('SELECT * FROM users WHERE username=?;', [username])
        .then(([results]) => {
            return Promise.resolve(results && results.length == 0);
        })
        .catch((error) => {
            throw error;
        })
    },

    emailExists: function (email) {
        return db.execute('SELECT * FROM users WHERE email=?', [email])
        .then(([results]) => {
            return Promise.resolve(results && results.length == 0);
        })
        .catch((error) => {
            throw error;
        })
    },

    authenticate: function (username, password) {
        return db.execute('SELECT user_id, password FROM users WHERE username = ?', [username])
        .then(([results]) => {
            if(results && results.length == 1) {
                userID = results[0].user_id;
                return bcrypt.compare(password, results[0].password);
            } 
            else {
                //console.log('wrong username')
                throw new Error("Username or password is incorrect")
            }
        })
        .then((hashesMatch) => {
            if(hashesMatch) {
                return Promise.resolve({user: username, uid: userID});
            } else {
                //console.log('wrong password')
                return Promise.resolve(false)
            }
        })
        .catch((err) => {
            /*
            if(error instanceof Error) {
                res.json({status: "OK", message: error.message, "redirect": '/' });
            }
            next(err);*/
            throw err;
        });
    },
    retrieveLoggedInUserByUserId: function (_id) {
        let baseSQL = 'SELECT u.user_id, u.username, u.email, u.created\
        FROM users u \
        WHERE u.user_id=?';

        return db.query(baseSQL, [_id])
    },
    retrieveUserByUsername: function (username) {
        let baseSQL = 'SELECT u.user_id, u.username, u.email, u.created\
        FROM users u \
        WHERE u.username=?';

        return db.query(baseSQL, [username])
    },
    search: function (searchTerm) {
        let baseSQL = 'SELECT u.user_id, u.username, u.email, u.created, f.name \
        FROM users u\
        JOIN FavoriteGames f on f.user_id = u.user_id \
        WHERE u.username LIKE ? OR f.name LIKE ?';

        return db.query(baseSQL, [searchTerm, searchTerm])
    }

}

module.exports = UserModel;
