
const mysql = require("mysql");
const conf = require("../db/config.js");
const $sql = require("../db/SQLpostMap.js");

var pool = mysql.createPool(conf.mysql);

var rend = function(res, page, data) {
    if (!data) res.render(page);
    else  res.render(page, data);
}

module.exports = {
    all: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query("select * from posts", function(error, result) {
                var data = {};
                data.result = result;
                connection.release();
                rend(res, "board.ejs", data);
            });
        });
    },
    show: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query("select * from posts", function(error, result) {
                res.send(result);
            });
        });
    },
    add: function(req, res, next) {
        rend(res, "home.ejs");
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
    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var id = +req.body.id;
            connection.query($sql.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: 'done'
                    };
                } else {
                    result = void 0;
                }
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
    },
    insert: function(req, res, next) {
        // console.log(param)
        var param = req.body || req.query;
        // var id = +param.id;
        console.log(param)
        pool.getConnection(function(err, connection) {
            connection.query($sql.insert, [param.name, param.age], function(err, result) {
                console.log(result)
                var data = {};
                data.result = result;
                res.send(result);
                connection.release();

            });
        });
    },
    update: function(req, res, next) {
        var param = req.body || req.query;
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.age, +param.id], function(err, result) {
                var data = {};
                data.result = result;
                res.send(result);
                connection.release();

            });
        });
    }
}