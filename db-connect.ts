import mysql from "mysql";
const connection = mysql.createConnection({
    host     : 'hostname',
    user     : 'username',
    password : 'password',
    database : 'databasename'
});

// connection.connect();


module.exports = connection;