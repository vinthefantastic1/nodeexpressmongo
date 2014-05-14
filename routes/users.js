var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	name: String,
	state: String,
	user:{dept: String, upi: String}
});

var countrySchema = new Schema({
	code: String,
	name: String
	});

var conn = mongoose.createConnection('localhost','tutorial');
var connw = mongoose.createConnection('localhost','work');
var model1 = conn.model('countries', countrySchema);  //your collection 

mongoose.model('users',usersSchema);


router.get('/', function(req, res) {
  var tempusers = [];
  mongoose.model('users').find(function(err,users) {
//	res.send(users);
	tempusers = users;
	console.log('11111-empusers');
	console.log(tempusers);
//	  res.render('users', { title: 'Users Page', info:"you're on the users page", users:users });
  });
  
//  model1.find({code:"VN"}, function(err,countries) {
//  model1.find({code:/B/}, function(err,countries) {
  model1.find({name:/rep/i}, function(err,countries) {
   console.log("");
   console.log("this will print out last");
   console.log(countries);
   	console.log('3333-tempusers');
	console.log(tempusers);

	res.render('users', { title: 'Users Page', info:"you're on the users page", users:tempusers, countries:countries });

});

	// console.log('222222-tempusers');
	// console.log(tempusers);
	console.log(tempusers);
  
  	  // res.render('users', { title: 'Users Page', info:"you're on the users page", users:tempusers });

});

router.post('/adduser', function(req, res) {

    // Set our internal DB variable
	console.log(db);
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    var collection = db.get('usercollection');

    // Submit to the DB
    // collection.insert({
        // "username" : userName,
        // "email" : userEmail
    // }, function (err, doc) {
        // if (err) {
//            If it failed, return error
            // res.send("There was a problem adding the information to the database.");
        // }
        // else {
//            If it worked, set the header so the address bar doesn't still say /adduser
            // res.location("userlist");
  //          And forward to success page
            // res.redirect("userlist");
        // }
    // });
	
});


module.exports = router;
