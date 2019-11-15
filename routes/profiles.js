const express = require('express');
const app = express();
const config = require('../db/config');
const main = require('../app');
var loggedIn = main.loggedIn;

// Logovanje, dodavanje novog korisnika
app.post('/login', function(req, res, next){	
	req.assert('name', 'Name is required').notEmpty();
	req.assert('password', 'Password is required').notEmpty();
    var errors = req.validationErrors();
    
    if( !errors ) {   
		var user = {
				name: req.sanitize('name').escape().trim(),
				password: req.sanitize('password').escape().trim(),
		}
		
		req.getConnection(function(error, conn) {
			conn.query(config.SQLuserMap.queryByCred, user.name, user.password, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					res.render('auth');
                } 
                
                else {				
					req.flash('success', 'Uhvatio sam korisnika!');
					var user = {
                        id: row[0].id,
                        name: row[0].name,
                        password: row[0].password
                    }
                    main.loggedIn = user;
                    conn.query(config.SQLpostMap.queryByUserId + user.id, user.name, user.password, function(err, posts) {
                        if (err) {
                            req.flash('error', err);
                            res.render('auth');
                        } 
                        
                        else {				
                            req.flash('success', 'Uhvatio sam korisnika!');
                            var user = {
                                id: row[0].id,
                                name: row[0].name,
                                password: row[0].password
                            }
                            main.loggedIn = user;
                            res.render('profile', loggedIn, posts);
                        }
                    });
				}
			});
		});
    }
    
	else req.flash('error', "doslo je do greske!");
})

// Vracanje korisnickog profila
app.get('/me/', function(req, res, next){
	req.getConnection(function(error, conn) {
		conn.query('SELECT * FROM t_countries WHERE id = ' + req.params.id, function(err, rows, fields) {
			if(err) throw err
			
			if (rows.length <= 0) req.flash('error', err);
			
			else { 
                conn.query(config.SQLpostMap.queryByUserId + user.id, user.name, user.password, function(err, posts) {
                    if (err) {
                        req.flash('error', err);
                        res.render('auth');
                    } 
                    
                    else {				
                        req.flash('success', 'Uhvatio sam korisnika!');
                        var user = {
                            id: row[0].id,
                            name: row[0].name,
                            password: row[0].password
                        }
                        main.loggedIn = user;
                        res.render('profile', loggedIn, posts);
                    }
                });
				res.render('profile', );
			}			
		})
	})
})

// EDIT COUNTRY POST ACTION
app.put('/edit/(:id)', function(req, res, next) {
    req.assert('name', 'Name is required').notEmpty()  // Validate name
	req.assert('tld', 'tld is required').notEmpty()  // Validate tld
	req.assert('cca2', 'cca2 is required').notEmpty()  // Validate cca2
	req.assert('capital', 'capital is required').notEmpty()  // Validate capital
	req.assert('callingCode', 'callingCode is required').notEmpty() // Validate callingCode





    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
		
		/********************************************
		 * Express-validator module
		********************************************/
		var country = {
				name: req.sanitize('name').escape().trim(),
				tld: req.sanitize('tld').escape().trim(),
				cca2: req.sanitize('cca2').escape().trim(),
				capital: req.sanitize('capital').escape().trim(),
				callingCode: req.sanitize('callingCode').escape().trim()
		}
		
		req.getConnection(function(error, conn) {
			conn.query('UPDATE t_countries SET ? WHERE id = ' + req.params.id, country, function(err, result) {
				//if(err) throw err
				if (err) {
					req.flash('error', err)
					
					// render to views/country/add.ejs
					res.render('country/edit', {
						title: 'Edit Country',
						id: req.params.id,
						name: req.body.name,
						tld: req.body.tld,
						cca2: req.body.cca2,
						capital: req.body.capital,
						callingCode: req.body.callingCode



					})
				} else {
					req.flash('success', 'Data updated successfully!')
					
					// render to views/country/add.ejs
					res.render('country/edit', {
						title: 'Edit Country',
						id: req.params.id,
						name: req.body.name,
						tld: req.body.tld,
						cca2: req.body.cca2,
						capital: req.body.capital,
						callingCode: req.body.callingCode
					})
				}
			})
		})
	}
	else {   //Display errors to country
		var error_msg = ''
		errors.forEach(function(error) {
			error_msg += error.msg + '<br>'
		})
		req.flash('error', error_msg)
		
		/**
		 * Using req.body.name 
		 * because req.param('name') is deprecated
		 */ 
        res.render('country/edit', { 
            title: 'Edit Country',            
			id: req.params.id, 
			name: req.body.name,
			tld: req.body.tld,
			cca2: req.body.cca2,
			capital: req.body.capital,
			callingCode: req.body.callingCode


        })
    }
})

// DELETE COUNTRY
/**
    * @api {post} /delete/(:id) Delete a country
    * @apiGroup Countries
    * @apiSuccess {Number} countries.id Country id
    * @apiParam {String} countries.name Country name
    * @apiParam {String} countries.tld Country tld
    * @apiParam {String} countries.cca2 Country cca2
    * @apiParam {String} countries.capital Country capital
    * @apiParam {Number} countries.callingCode Country callingCode
    * @apiExample {sql} Example usage:
    *       DELETE FROM t_countries t_countries WHERE id = ' + req.params.id
    */
app.delete('/delete/(:id)', function(req, res, next) {
	var country = { id: req.params.id }
	
	req.getConnection(function(error, conn) {
		conn.query('DELETE FROM t_countries WHERE id = ' + req.params.id, country, function(err, result) {
			//if(err) throw err
			if (err) {
				req.flash('error', err)
				// redirect to countries list page
				res.redirect('/countries')
			} else {
				req.flash('success', 'Country deleted successfully! id = ' + req.params.id)
				// redirect to countries list page
				res.redirect('/countries')
			}
		})
	})
})

module.exports = app
