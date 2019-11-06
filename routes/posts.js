const express = require('express');
const router = express.Router();
const post = require("../db/poster.js");

//pool
var pool = mysql.createPool(conf.mysql);

var rend = function(res, page, data) {
    if (!data) res.render(page);
    else res.render(page, data);
}

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

//feed
router.get('/', (req,res) => {
    if(loggedIn != null) post.show(req, res);
    else res.send("401 - nisi se ulogovao");
});

//post a post
router.post('/', (req,res)=> {
    if(loggedIn != null) post.add(req, res);
    else res.send("401 - nisi se ulogovao");
});

//new post
router.get('/new_post', (req, res) => {
    if(loggedIn != null) post.show(req, res);
    else res.send("401 - nisi se ulogovao");
});

//delete post
router.post('/delete_post', (req, res) => {
    if(loggedIn != null) post.delete(req, res);
    else res.send("401 - nisi se ulogovao");
});

//filter feed posts
router.post('/boardfilter/', (req,res)=> {
    if(loggedIn != null) {}
    else res.send("401 - nisi se ulogovao");
});

//filter user posts
router.post('/filter/', (req,res)=> {
    if(loggedIn != null) {}
    else res.send("401 - nisi se ulogovao");
});

module.exports = router;