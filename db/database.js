const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    password: "fukofcu",
    user: 'user',
    database: 'postovi',
    host: 'localhost',
    port: '4001'
});

let postDB = {};

postDB.all = () => {
    //promise
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM postovi", (err, result) => {
            
            //error hendl
            if(err) return reject(err);

            return resolve(results);
        });
    });
};


postDB.one = (id) => {
    //promise
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM postovi WHERE id = ?", id, (err, result) => {
            
            //error hendl
            if(err) return reject(err);

            return resolve(results);
        });
    });
};

module.exports = postDB;