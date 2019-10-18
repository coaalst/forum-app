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

//app setup
const app = express();
app.use(express.json());
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/assets'));

//port setup
const port = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log('Server started on port 4000');
});

//home test
app.get('/', (req, res) => {
    res.render('home');
});

//retrive list
app.get('/profiles', (req, res) => {
    
    res.json(JSON.stringify(profiles));
});

//get profile by id
app.get('/profiles/:id', (req, res) => {
    const userPosts = posts.map((post)=>post.id==req.params.id);
    res.render('profile', {profile: profiles[req.params.id], posts: userPosts, css: css});
});

app.get('/news', (req,res) => {
    res.render('board')
});

//post
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
});

app.post("/posts/", (req,res)=> {
    const {text, title, id} = req.body;
    const post = {
        id,
        text,
        title
    }
    posts.push(post);
})
// {
//	"name": "yeet611",
// "password": "asd"
//}