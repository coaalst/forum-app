const express = require("express");
const mysql = require('mysql');

/**
 * Stylesheet setup
 */ 
const fs = require('fs');
const css = {
    style : fs.readFileSync(__dirname + '/assets/stylesheets/style.css')
};

/**
 * App setup
 */ 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server started on port 4000');
});

/**
 * Routers
 */ 
const postRouter = require('./routes/posts.js');
const profileRouter = require("./routes/profiles.js");
app.use('/posts/', postRouter);
app.use('/profiles/', profileRouter);


/**
 * MySQL setup
 */ 
const myConnection  = require('express-myconnection');
const config = require('./db/config.js');
const db = {
	host:	  config.mysql.host,
	user: 	  config.mysql.user,
	password: config.mysql.password,
	port: 	  config.mysql.port, 
	database: config.mysql.db
};
app.use(myConnection(mysql, db, 'pool'));


/**
 * konstante
 */ 
const profiles = []; 
var loggedIn = null;
var userID = 0;

/**
 * auth stranica
 */ 
app.get('/', (req, res) => {
    res.render("auth");
});

app.post('/', (req, res) => {
    const {name, password} = req.body;
    const profile = {
        id: userID++,
        name: req.body.name,
        password: req.body.password
    };
   
    console.log(profile);
    loggedIn = profile;
    res.render("profile");
});

/**
 * Logout
 */ 
app.get('/logout', (req, res) => {
    loggedIn = null;
    res.render("auth",{css: css});
});