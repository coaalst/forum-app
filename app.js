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
var loggedIn = null;

//app setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));

//port setup
const port = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log('Server started on port 4000');
});

//auth
app.get('/', (req, res) => {
    res.render("auth",{css: css, profiles: profiles});
});

//Logout
app.get('/logout', (req, res) => {
    loggedIn = null;
    res.render("auth",{css: css});
});


//new post
app.get('/home', (req, res) => {
    if(loggedIn != null) res.render("home",{css: css, loggedIn: loggedIn});
    else res.send("401 - nisi se ulogovao");
});

//delete post
app.delete('/pos', (req, res) => {
    if(loggedIn != null) {
        posts.splice(posts.find(post.postId));
        res.render('profile', {profile: loggedIn, posts: userPosts, css: css});
    }
    else res.send("401 - nisi se ulogovao");
});

//feed
app.get('/news', (req,res) => {
    if(loggedIn != null) res.render('board',{loggedIn: loggedIn, posts: posts, css: css});
    else res.send("401 - nisi se ulogovao");
});

//filter feed posts
app.get('/posts/:title/:tweet', (req,res)=> {
    if(loggedIn != null) {
        const userPosts = posts.filter(function(post){
            return post.title == req.body.title || post.tweet == req.body.tweet;
        });
         res.render('board', {loggedIn: loggedIn, posts: userPosts, css: css});
    }
    else res.send("401 - nisi se ulogovao");
});

//filter user posts
app.post('/postsfilter/', (req,res)=> {
    if(loggedIn != null) {
        console.log(req.params)
        const {title, tweet} = req.body;
        const post = {
            id: profiles.length,
            title,
            tweet
        }
        if(req.body.title  != "" || req.body.tweet != ""){
            const userPosts = posts.filter(function(el){
                return el.title == req.body.title || el.tweet ==req.body.tweet
            })
            res.render('profile', {profile: loggedIn, posts: userPosts, css: css});
        }
        else res.render('profile', {profile: loggedIn, posts: posts, css: css});
    }
    else res.send("401 - nisi se ulogovao");
});

//get profile by id
app.get('/profiles/:id', (req, res) => {
    if(loggedIn != null){
        const userPosts = posts.filter((post)=>post.id==req.params.id);
        console.log(JSON.stringify(userPosts));
        res.render('profile', {profile: profiles[req.params.id], posts: userPosts, css: css});
    }
    else res.send("401 - nisi se ulogovao");
});

//post a profile
app.post('/profiles', (req, res) => {
    const {name, password} = req.body;
    const profile = {
        id: profiles.length,
        name,
        password
    }
    console.log(profile);
    loggedIn = profile;
    profiles.push(profile);
    res.render('board',{loggedIn: loggedIn, posts: posts, css: css});
    res.status(200).json(profile);
});

//post a post
app.post('/posts/', (req,res)=> {
    if(loggedIn != null){
        const {tweet, title, id} = req.body;
        const post = {
            id,
            postId : posts.length,
            tweet,
            title
        }
        console.log(JSON.stringify(post));
        posts.push(post);
        res.render('board',{loggedIn: loggedIn, posts: posts, css: css});
        res.status(200).json(post);
    }
    else res.send("401 - nisi se ulogovao");
});
