const mysql = require('mysql2');

/*
const pool = mysql.createPool({
    host: "localhost",
    user: "mike",
    password: "mTlY!yzW@oximuly",
    database: "gamerspacedb",
    debug: false
});*/

const pool = mysql.createPool({
    host: "165.227.213.187",
    user: "gamerspaceadmin",
    password: "1u6#iLey9V9gihqj",
    database: "gamerspacedb",
    debug: false
});

const promisePool = pool.promise();
module.exports = promisePool;

