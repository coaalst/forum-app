const express = require('express');
const app = express();
const ID = 'ProfileRouter: ';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const config = require('../db/config.js');
const sql = require('../db/db.js');
const main = require('../app.js');
const mysql = require('mysql');

var loggedIn = null;

// Logovanje, dodavanje novog korisnika
app.post('/login', function (req, res) {
    var user = {
        name: req.body.name,
        password: req.body.password
    }
    console.log(ID + 'pripremam pretragu korisnika');
    console.log(ID + 'trazim korisnika: ' + JSON.stringify(user));
    sql.query(mysql.format(config.SQLuserMap.queryByCred, [user.name, user.password]), function (err, col) {

        if (err) console.log(ID + "error: ", err);

        else {
            console.log(ID + "u bazi ima: ", JSON.stringify(col));
            if (col.length != 0) {

                var parse = {
                    id: col[0].id,
                    name: col[0].name,
                    password: col[0].password,
                }
                console.log(ID + 'korisnik : ', parse);
                loggedIn = parse;
                main.loggedIn = loggedIn;
                console.log(ID + 'korisnik id parsed : ', loggedIn.id);
                console.log(ID + 'korisnik parsed : ', loggedIn);
                res.redirect('/profiles/me/');
            }
            else res.redirect('auth.ejs', {Title: "Greska, nema tog korisnika u bazi..pokusajte ponovo!"})
        }
    });
});

// Vracanje korisnickog profila
app.get('/me/', function (req, res) {
    sql.query(mysql.format(config.SQLpostMap.queryByUserId + loggedIn.id), function (err, posts) {
        
        if(err) console.log(ID + "error: ", err);

        else{
          if(posts != null){
              toPost = [];
              posts.forEach(element => {
                var post = {
                    id: element.id,
                    title: element.title,
                    tweet: element.tweet,
                    userid: element.userid
                }
                console.log(ID + 'post parsed : ', post);
                toPost.push(post);
              });
              res.render('profile.ejs', {posts}, main.css);
          }
        }
    });   
});

module.exports = app;
