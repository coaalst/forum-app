const express = require("express");
const path = require('path');
const Joi = require('joi');
const bodyParser = require('body-parser');
const fs = require('fs');
const css = {
    style : fs.readFileSync(__dirname + '/assets/stylesheets/style.css')
};

//niz profila
const profiles = [];

//niz postova
const posts = [];

//ulogovan korisnik
const loggedIn = null;

//app setup
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));

//port setup
const port = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log('Server started on port 4000');
});

//home
app.get('/', (req, res) => {
    res.render("auth",{css: css});
});

//feed
app.get('/news', (req,res) => {
    res.render('board',{loggedIn: loggedIn, posts: posts, css: css});
});

//retrive user profiles
app.get('/profiles', (req, res) => {
    
    res.json(JSON.stringify(profiles));
});

//retrive all posts
app.get('/posts/', (req,res)=> {

    res.json(JSON.stringify(posts));
});

//get profile by id
app.get('/profiles/:id', (req, res) => {
    const userPosts = posts.filter((post)=>post.id==req.params.id);
    console.log(JSON.stringify(userPosts));
    res.render('profile', {profile: profiles[req.params.id], posts: userPosts, css: css});
});

//post a profile
app.post('/profiles', (req, res) => {
    console.log(req.body);
    const profile = {
        id: profiles.length,
        name: req.body.name,
        password: req.body.password
    };
    console.log(profile);
    profiles.push(profile);
    res.status(200).json(profile);

    loggedIn = profile;

});

//post a post
app.post('/posts/', (req,res)=> {
    const {tweet, title, id} = req.body;
    const post = {
        id,
        tweet,
        title
    }
    posts.push(post);
    res.status(200).json(post);
});

// {
//	"name": "yeet611",
// "password": "asd"
//}