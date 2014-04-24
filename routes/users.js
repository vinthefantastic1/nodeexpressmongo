var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
	name: String
});

mongoose.model('users',usersSchema);

/* GET users listing. */
// router.get('/', function(req, res) {
  // res.send('respond with a resource');
// });


router.get('/', function(req, res) {
  mongoose.model('users').find(function(err,users) {
	res.send(users);
  });
  
});



module.exports = router;
