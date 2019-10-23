const express = require('express');
const router = express.Router();

//get profile by id
router.get('/:id', (req, res) => {
    if(loggedIn != null){
        const userPosts = posts.filter((post)=>post.id==req.params.id);
        console.log(JSON.stringify(userPosts));
        res.render('profile', {profile: profiles[req.params.id], posts: userPosts, css: css});
    }
    else res.send("401 - nisi se ulogovao");
});

//post a profile
router.post('/', (req, res) => {
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
});

module.exports = router;