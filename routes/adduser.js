var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var colors = require('colors');
var clc = require('cli-color');

var error = clc.red.bold;
var warning = clc.yellow.bold;
var notice = clc.blue.bold;
var info = clc.green.bold;
var reg = clc.white;
var happy = clc.cyanBright;
var pink = clc.magentaBright;
var bblue = clc.blueBright;


// colors.setTheme({
  // silly: 'rainbow',
  // input: 'grey',
  // verbose: 'cyan',
  // prompt: 'grey',
  // info: 'green',
  // data: 'grey',
  // help: 'cyan',
  // warn: 'yellow',
  // debug: 'blue',
  // error: 'red'
// });


var usersSchema = new Schema({
	name: String,
	email: String,
	user:{dept: String, upi: String}
});

var countrySchema = new Schema({
	code: String,
	name: String
	});

var conn = mongoose.createConnection('localhost','work');
var conn_tutorial = mongoose.createConnection('localhost','tutorial');

var model1 = conn.model('countries', countrySchema);  //your collection 
var userModel = conn_tutorial.model('users', usersSchema);  

//mongoose.model('users2',usersSchema);


// router.get('/', function(req, res) {
  // res.send("adduser",200)
// });

router.post('/', function(req, res) {

	console.log(pink("req.body follows... ") + "adding a user inside post ... ")
	console.log(req.body);
	
//	var newUser = new userModel( {name:req.body.user.name});
	var date = new Date();
	var current_hour = date.getHours();

	var newUser = new userModel( req.body);
	
	console.log( happy("*** ") + pink(date)  );
	console.log( info("*** " + "-- newUser follows: "));
	console.log(newUser);
	
    newUser.save(function(err,arg1) {
	
		if (err) {
				console.log(error("error on save."));
		}
		
		console.log( warning("value inserted to db: ") +  happy(arg1) );
		//console.log(req.body);

		//res.send(req.body,200);
		//res.send(200);

		res.render('adduser', { title: 'user added', info:newUser});
  

		});
  

});


module.exports = router;
