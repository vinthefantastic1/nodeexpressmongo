var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usersSchema = new Schema({
	name: String,
	state: String
});

var countrySchema = new Schema({
	code: String,
	name: String
	});

var conn = mongoose.createConnection('localhost','work');
var model1 = conn.model('countries', countrySchema);  //your collection 

mongoose.model('users',usersSchema);

/* GET users listing. */
// router.get('/', function(req, res) {
  // res.send('respond with a resource');
// });


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
  
  	  // res.render('users', { title: 'Users Page', info:"you're on the users page", users:tempusers });

});



module.exports = router;
