const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localhost",
    user: "mike",
    password: "mTlY!yzW@oximuly",
    database: "gamerspacedb",
    debug: false
});

const promisePool = pool.promise();
module.exports = promisePool;

