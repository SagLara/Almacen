const mysql = require('promise-mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'almacen_jis'
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