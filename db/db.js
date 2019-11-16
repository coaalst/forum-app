const mysql = require('mysql');
const config = require('../db/config');
const ID = 'DbAgent: ';

//local mysql db connection
const connection = mysql.createConnection({
   host: '127.0.0.1',
   user: 'dbuser',
   password: 'dbpassword',
   database: 'db',
   port: '3306',
   queueLimit : 0,
   connectionLimit : 0
});

connection.connect(function(err) {
    if (err) throw err;
    else console.log(ID + 'povezan sa bazom...');
});

module.exports = connection;