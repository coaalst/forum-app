
const mysql = require("mysql");
const conf = require("../db/config.js");
const $sql = require("../db/SQLuserMap.js");

var pool = mysql.createPool(conf.mysql);

var rend = function(res, page, data) {
    if (!data) res.render(page);
    else  res.render(page, data);
}

module.exports = {
    userProfile: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query("select * from users where id = ?", function(error, result) {
                var data = {};
                data.result = result;
                connection.release();
                rend(res, "profile.ejs", data);
            });
        });
    },
    addAPI: function(req, res, next) {
        var param = req.body || req.query;
        var name = req.query.name,
            age = req.query.age;
        pool.getConnection(function(err, connection) {
            connection.query($sql.insert, [param.name, param.age], function(err, result) {
                res.send(result);
                connection.release();
            });
        });
    },
    queryById: function(req, res, next) {
        var param = req.body || req.query;
        var id = +param.id; 
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                var data = {};
                console.log(result)
                data.result = result;
                res.send(result);
                
                connection.release();

            });
        });
    },
    update: function(req, res, next) {
        // console.log(param)
        var param = req.body || req.query;
        // var id = +param.id;
        console.log(param)
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [+param.id, param.name, param.age], function(err, result) {
                console.log(result)
                var data = {};
                data.result = result;
                res.send(result);
                connection.release();

            });
        });
    }
}