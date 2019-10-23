const express = require('express');
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//post a post
router.post('/', (req,res)=> {
    if(loggedIn != null){
        const {tweet, title, id} = req.body;
        const post = {
            id,
            postId : posts.length,
            tweet,
            title
        };
        console.log(JSON.stringify(post));
        posts.push(post);
        res.render('profile',{profile: loggedIn, posts: posts, css: css});
    }
    else res.send("401 - nisi se ulogovao");
});

//new post
router.get('/home', (req, res) => {
    if(loggedIn != null) res.render("home",{css: css, loggedIn: loggedIn});
    else res.send("401 - nisi se ulogovao");
});

//delete post
router.post('/delete_post', (req, res) => {
    if(loggedIn != null) {
        const postId = req.body.postId;
        var userPosts = posts.filter((post)=>post.id==loggedIn.id);
        userPosts = userPosts.filter(function( post ) {
            return post.postId != postId;
        });
        res.render('profile', {profile: loggedIn, posts: userPosts, css: css});
    }
    else res.send("401 - nisi se ulogovao");
});

//filter feed posts
router.post('/boardfilter/', (req,res)=> {
    if(loggedIn != null) {
        console.log(req.params)
        const {title, tweet} = req.body;
        const post = {
            id: profiles.length,
            title,
            tweet
        };
        if(req.body.title  != "" || req.body.tweet != ""){
            const userPosts = posts.filter(function(el){
                return el.title == req.body.title || el.tweet ==req.body.tweet
            });
            res.render('board', {loggedIn: loggedIn, posts: userPosts, css: css});
        }
        else res.render('board', {loggedIn: loggedIn, posts: posts, css: css});
    }
    else res.send("401 - nisi se ulogovao");
});

//filter user posts
router.post('/filter/', (req,res)=> {
    if(loggedIn != null) {
        console.log(req.params)
        const {title, tweet} = req.body;
        const post = {
            id: profiles.length,
            title,
            tweet
        };
        if(req.body.title  != "" || req.body.tweet != ""){
            const userPosts = posts.filter(function(el){
                return el.title == req.body.title || el.tweet == req.body.tweet
            });
            res.render('profile', {profile: loggedIn, posts: userPosts, css: css});
        }
        else res.render('profile', {profile: loggedIn, posts: posts, css: css});
    }
    else res.send("401 - nisi se ulogovao");
});

module.exports = router;