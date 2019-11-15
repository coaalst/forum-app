const express = require('express');
const app = express();
const ID = 'ProfileRouter: ';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const config = require('../db/config.js');
const sql = require('../db/db.js');
const main = require('../app.js');

var loggedIn = main.loggedIn;

// Logovanje, dodavanje novog korisnika
app.post('/login', function (req, res) {
    var user = {
        name: req.body.name,
        password: req.body.password
    }
    console.log(ID + 'pripremam pretragu korisnika');
    console.log(ID + 'trazim korisnika: ' + JSON.stringify(user));
    sql.query(config.SQLuserMap.queryByCred, [user.name, user.password], function (err, col, row) {
        
        if(err) {
            console.log(ID + "error: ", err);

        }
        else{
          console.log(ID + 'korisnik : ', res);  

         
        }
    });   



        /*//if(err) throw err
        if (err) {
            req.flash('error', err)
            res.render('auth');
            console.log('greska');
        }

        else {
            req.flash('success', 'Uhvatio sam korisnika!');
            console.log('nasao korisnika');
            var user = {
                id: row[0].id,
                name: row[0].name,
                password: row[0].password
            }
            main.loggedIn = user;
            sql.query(config.SQLpostMap.queryByUserId + user.id, user.name, user.password, function (err, posts) {
                if (err) {
                    req.flash('greska u prikazu korisnickog naloga', err);
                    res.render('auth');
                }

                else {
                    req.flash('success', 'Prikazao sam korisnika!');
                    var user = {
                        id: row[0].id,
                        name: row[0].name,
                        password: row[0].password
                    }
                    main.loggedIn = user;
                    res.render('profile', loggedIn, posts);
                }
            });
        }
    });
   */ 
});
// Vracanje korisnickog profila
app.get('/me/', function (req, res, next) {
    sql.query(config.SQLpostMap.queryByUserId + req.params.id, function (err, rows, fields) {
        if (err) throw err

        if (rows.length <= 0) req.flash('error', err);

        else {
            conn.query(config.SQLpostMap.queryByUserId + user.id, user.name, user.password, function (err, posts) {
                if (err) {
                    req.flash('error', err);
                    if (loggedIn == null) res.render('auth');
                }

                else {
                    req.flash('success', 'Uhvatio sam korisnika!');
                    var user = {
                        id: row[0].id,
                        name: row[0].name,
                        password: row[0].password
                    }
                    main.loggedIn = user;
                    res.render('profile', loggedIn, posts);
                }
            });
            res.render('profile');
        }
    });
});

module.exports = app;
