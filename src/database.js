const mysql = require('promise-mysql');
require('dotenv').config();

const conn = mysql.createConnection({
    host: process.env.MYSQL_ADDON_HOST,
    port: process.env.MYSQL_ADDON_PORT,
    user: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB
});

/* conn.connect(function(err) {
    if (err) {
        console.log('code :>> ', err.code);
        console.log('fatal :>> ', err.fatal);
    }
}) */

function getConnection() {
    return conn;
}

module.exports = {
    getConnection,
    conn
}