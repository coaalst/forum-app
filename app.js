const express = require("express");

//styleseet setup
const fs = require('fs');
const css = {
    style : fs.readFileSync(__dirname + '/assets/stylesheets/style.css')
};

//app setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));

//port setup
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Server started on port 4000');
});

//db setup
const db = require("./db");


//routers
const postRouter = require('./routes/posts');
const profileRouter = require("./routes/profiles");

//routes
app.use('/posts/', postRouter);
app.use('/profiles/', profileRouter);

//niz profila
const profiles = [];

//niz postova
const posts = [];

//ulogovan korisnik
var loggedIn = null;


//auth
app.get('/', (req, res) => {
    res.render("auth",{css: css, profiles: profiles});
});

//Logout
app.get('/logout', (req, res) => {
    loggedIn = null;
    res.render("auth",{css: css});
});

//feed
app.get('/news', async (req,res) => {
    if(loggedIn != null) res.render('board',{loggedIn: loggedIn, posts: posts, css: css});
    else res.send("401 - nisi se ulogovao");
});