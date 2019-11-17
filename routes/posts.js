const express = require('express');
const app = express();
const ID = 'PostRouter: ';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const config = require('../db/config.js');
const sql = require('../db/db.js');
const main = require('../app.js');
const mysql = require('mysql');

// Prikaz svih postova
app.get('/', function(req, res, next) {
	console.log(ID + 'pripremam pretragu svih postova');
    sql.query(mysql.format(config.SQLpostMap.queryAll), function (err, posts) {

        if (err) console.log(ID + "error: ", err);
        else {
            if (posts != null) {
				toPost = [];
				posts.forEach(element => {
				  var post = {
					  id: element.id,
					  title: element.title,
					  tweet: element.tweet,
					  userid: element.userid
				  }
				  console.log(ID + 'post parsed : ', post);
				  toPost.push(post);
				});
				res.render('board.ejs', {posts}, main.css);
            }
        }
    });
});

// Prikaz stranice za dodavanje postova
app.get('/add', function(req, res, next){	
	// render to views/new_post.ejs
	console.log(ID + 'dodavanje posta');
    if(main.loggedIn != null) res.render("new_post", {loggedIn: main.loggedIn});
    else res.send("401 - nisi se ulogovao");
});

// Dpdavanje novog posta
app.post('/add', function (req, res, next) {
    if (main.loggedIn != null) {
		console.log(ID + 'pripremam dodavanje posta');
		sql.query(mysql.format(config.SQLpostMap.insert, [req.body.title, req.body.tweet, req.body.userid]), function (err, resp) {

			if (err) console.log(ID + "error: ", err);
	
			else res.redirect('/profiles/me/');
		});
	}
    else res.send("401 - nisi se ulogovao");
});

// Editovanje postova - vracanje
app.get('/edit/(:id)', function(req, res, next){
	if (main.loggedIn != null) {
		console.log(ID + 'pripremam editovanje posta');
		sql.query(mysql.format(config.SQLpostMap.queryById + req.params.id), function (err, resp) {

			if (err) console.log(ID + "error: ", err);
	
			else 
				if(resp != null) {
					var post1 = {
						id: resp[0].id,
						title: resp[0].title,
						tweet: resp[0].tweet,
						userid: resp[0].userid,
					}
					var jsJeSranje = {
						id: post1.id,
						title: post1.title,
						tweet: post1.tweet,
						userid: post1.userid,
					}
					console.log(ID + JSON.stringify(jsJeSranje));
					res.render('edit_post.ejs', {post: jsJeSranje});
				}
		});
		
	}
	else res.send("401 - nisi se ulogovao");
});

// Editovanje eposta - akcija
app.post('/edit', function(req, res, next) {
	if (main.loggedIn != null) {
		console.log(ID + 'pripremam izmene posta');
		var post = {
			id: req.body.id,
			title: req.body.title,
			tweet: req.body.tweet,
			userid: req.body.userid
		}
		sql.query(mysql.format(config.SQLpostMap.update, [post.title, post.tweet, post.id]), function (err, resp) {

			if (err) console.log(ID + "error: ", err);
	
			else {
				console.log(ID + 'izmenio i vracam se na profil')
				res.redirect('/profiles/me/');
			}
		});
	}
	else res.send("401 - nisi se ulogovao");
});

// Brisanje posta
app.get('/delete/(:id)', function(req, res, next) {
	if (main.loggedIn != null) {
		console.log(ID + 'pripremam brisanje posta');
		sql.query(mysql.format(config.SQLpostMap.delete + req.params.id), function (err, resp) {

			if (err) console.log(ID + "error: ", err);
	
			else res.redirect('/profiles/me/');
				
		});
	}
	else res.send("401 - nisi se ulogovao");
});

// Filtriranje posta
app.get('/filter', function(req, res, next) {
	if (main.loggedIn != null) {
		console.log(ID + 'pripremam filter posta');
		var search = {
			from: req.query.from,
			title: req.query.title,
			tweet: req.query.tweet,
		}
		console.log(ID + req.query.title);
		if(search.title === "" && search.tweet === ""){
			console.log(ID + 'prosli');
			sql.query(mysql.format(config.SQLpostMap.queryAll), function (err, posts) {
        
				if(err) console.log(ID + "error: ", err);
		
				else{
				  if(posts != null){
					  toPost = [];
					  console.log(ID + 'tazim po svemu');
					  posts.forEach(element => {
						var post = {
							id: element.id,
							title: element.title,
							tweet: element.tweet,
							userid: element.userid
						}
						console.log(ID + 'post parsed : ', post);
						toPost.push(post);
					  });
					  if(search.from == "p")  res.render('profile.ejs', {posts}, main.css);
					  if(search.from == "n")  res.render('board.ejs', {posts}, main.css);
				  }
				}
			});   
		}

		else{
			if(search.title !== "" && search.tweet !== ""){
				sql.query(mysql.format(config.SQLpostMap.queryByParams, [search.title, search.tweet]), function (err, posts) {
        
					if(err) console.log(ID + "error: ", err);
			
					else{
					  if(posts != null){
						  toPost = [];
						  console.log(ID + 'tazim po oba: ' + search.title + search.tweet);
						  posts.forEach(element => {
							var post = {
								id: element.id,
								title: element.title,
								tweet: element.tweet,
								userid: element.userid
							}
							console.log(ID + 'post parsed : ', post);
							toPost.push(post);
						  });
						  if(search.from == "p")  res.render('profile.ejs', {posts}, main.css);
						  if(search.from == "n")  res.render('board.ejs', {posts}, main.css);
					  }
					}
				});   
			}
			if(search.title !== "" && search.tweet === ""){
				sql.query(mysql.format(config.SQLpostMap.queryByTitle, [search.title]), function (err, posts) {
        
					if(err) console.log(ID + "error: ", err);
			
					else{
					  if(posts != null){
						  toPost = [];
						  console.log(ID + 'tazim po titlu : ' + search.title);
						  posts.forEach(element => {
							var post = {
								id: element.id,
								title: element.title,
								tweet: element.tweet,
								userid: element.userid
							}
							console.log(ID + 'post parsed : ', post);
							toPost.push(post);
						  });
						  if(search.from == "p")  res.render('profile.ejs', {posts}, main.css);
						  if(search.from == "n")  res.render('board.ejs', {posts}, main.css);
					  }
					}
				});   
			}
			if(search.title === "" && search.tweet !== ""){
				sql.query(mysql.format(config.SQLpostMap.queryByTweet, [search.tweet]), function (err, posts) {
        
					if(err) console.log(ID + "error: ", err);
			
					else{
					  if(posts != null){
						  toPost = [];
						  console.log(ID + 'tazim po tweetu: ' + search.tweet);
						  posts.forEach(element => {
							var post = {
								id: element.id,
								title: element.title,
								tweet: element.tweet,
								userid: element.userid
							}
							console.log(ID + 'post parsed : ', post);
							toPost.push(post);
						  });
						  if(search.from == "p")  res.render('profile.ejs', {posts}, main.css);
						  if(search.from == "n")  res.render('board.ejs', {posts}, main.css);
					  }
					}
				});   
			}
		}
	}
	else res.send("401 - nisi se ulogovao");
});

module.exports = app
