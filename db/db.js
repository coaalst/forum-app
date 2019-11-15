const mysql = require('mysql');
const config = require('../db/config');
const ID = 'DbAgent: ';

//local mysql db connection
const connection = mysql.createConnection({
    host:	  config.mysql.host,
	user: 	  config.mysql.user,
	password: config.mysql.password,
	port: 	  config.mysql.port, 
	database: config.mysql.db
});

connection.connect(function(err) {
    if (err) throw err;
    else console.log(ID + 'povezan sa bazom...');
});

module.exports = connection;