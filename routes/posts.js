const express = require('express');
const app = express();
const config = require('../db/config');
const main = require('../app');
var loggedIn = main.loggedIn;

// Prikaz svih postova
app.get('/', function(req, res, next) {
	if(loggedIn != null){
        req.getConnection(function(error, conn) {
            conn.query(config.SQLpostMap.queryAll,function(err, rows, fields) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    res.render('board', {
                        title: 'Svi postovi',
                        data: ''
                    });
                } else res.render('board', {data: rows});
            });
        });
    }

    else res.send("401 - nisi se ulogovao");
});

// Prikaz stranice za dodavanje postova
app.get('/add', function(req, res, next){	
	// render to views/new_post.ejs
    if(loggedIn != null) res.render("new_post", loggedIn);
    else res.send("401 - nisi se ulogovao");
});

// Dpdavanje novog posta
app.post('/add', function (req, res, next) {
    if (loggedIn != null) {
        req.assert('title', 'Unesi naslov').notEmpty();
        req.assert('tweet', 'Unesi tekst').notEmpty();
        var errors = req.validationErrors();

        if (!errors) {
            const post = {
                id: req.body.id,
                title: req.sanitize('title').escape().trim(),
                tweet: req.sanitize('tweet').escape().trim(),
            }

            req.getConnection(function (error, conn) {
                conn.query(config.SQLpostMap.insert, post.id, post.title, post.tweet, loggedIn.id, function (err, result) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err);

                        // render to new_post.ejs
                        res.render('new_post', loggedIn);
                    } else {
                        req.flash('success', 'Data added successfully!')
                        res.render('new_post', loggedIn);
                    }
                });
            });
        }
        else req.flash('error', "doslo je do greske!");
    }
    else res.send("401 - nisi se ulogovao");
});

// Editovanje postova - vracanje
app.get('/edit/(:id)', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query(config.SQLpostMap.queryById + req.params.id, function(err, rows, fields) {
			if(err) throw err;
			// if post not found
			if (rows.length <= 0) {
				req.flash('error', 'Post not found with id = ' + req.params.id);
				res.redirect('/profiles/me');
			}
			else { // if post found
				res.render('edit_post', {
					id: rows[0].id,
					title: rows[0].name,
					tweet: rows[0].tld
				});
			}			
		});
	});
});

// Editovanje eposta - akcija
app.put('/edit/(:id)', function(req, res, next) {
    req.assert('title', 'Naslov je potreban').notEmpty();
	req.assert('tweet', 'Teskt je potreban').notEmpty();
    var errors = req.validationErrors();
    
    if( !errors ) {
		var post = {
                title: req.sanitize('title').escape().trim(),
				tweet: req.sanitize('tweet').escape().trim(),
		}
		
		req.getConnection(function(error, conn) {
			conn.query(config.SQLpostMap.update, post.title, post.tweet, req.body.id, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					res.render('country/edit', {
						id: req.params.id,
						title: req.body.name,
						tweet: req.body.tld,
					});
                } 
                
                else {
					req.flash('success', 'Data updated successfully!')
					res.render('country/edit', {
						id: req.params.id,
						name: req.body.name,
						tld: req.body.tld,
					});
				}
			});
		});
	}
	else req.flash('error', "doslo je do greske!");
});

// Brisanje posta
app.delete('/delete/(:id)', function(req, res, next) {
	var post = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query(config.SQLpostMap.delete + req.params.id, post, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				res.redirect('/profiles/me')
			} else {
				req.flash('success', 'Post deleted successfully! id = ' + req.params.id)
				res.redirect('/profiles/me')
			}
		})
	})
})

module.exports = app
