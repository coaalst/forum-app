//express
const express = require("express");

//db setup
const mysql = require('mysql');

//styleseet setup
const fs = require('fs');
const css = {
    style : fs.readFileSync(__dirname + '/assets/stylesheets/style.css')
};

//app setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//port setup
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server started on port 4000');
});

//routers
const postRouter = require('./routes/posts.js');
const profileRouter = require("./routes/profiles.js");

//routes
app.use('/posts/', postRouter);
app.use('/profiles/', profileRouter);

// connect to database
connection.connect((err) => {
    if (err) {
        console.log('Doslo je do greske');
        throw err;
    }
    console.log('Connected to database');
});
global.connection = connection;

//niz profila
const profiles = [];

//ulogovan korisnik
var loggedIn = null;

//auth
app.get('/', (req, res) => {
    res.render("auth",{css: css, profiles: profiles});
});

//logout
app.get('/logout', (req, res) => {
    loggedIn = null;
    res.render("auth",{css: css});
});