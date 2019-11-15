const express = require("express");
const mysql = require('mysql');
const path = require('path');
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
 * konstante
 */ 
var loggedIn = null;

/**
 * auth stranica
 */ 
app.get('/', (req, res) => {
    res.render("auth");
});

/**
 * Logout
 */ 
app.get('/logout', (req, res) => {
    loggedIn = null;
    res.render("auth",{css: css});
});