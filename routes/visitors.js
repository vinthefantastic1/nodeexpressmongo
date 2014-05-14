var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var visSchema = new Schema({
	first_name: String,
	last_name: String,
	last_update_user: String,
	last_update_date: Date,
	company: String,
	status: String,
	upi_no: String,
	creation_date: Date,
	creation_user: String,
	pass_type: String
	
});

var conn = mongoose.createConnection('localhost','work');
var Vismodel = conn.model('visitors', visSchema); 

var moment3 = moment().add('days', 3).fromNow();

var cdate = new Date();
cdate.setHours(0,0,0,0);

router.get('/', function(req, res) {
//  Vismodel.find({first_name:/vince/i}, function(err,visitors,currentDate) {
  Vismodel.find({creation_date: {$gt:cdate}}, null,{sort: {'creation_date':-1}} , function(err,visitors) {
	var cdate2 = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
	var currentDate = new Date();
	//console.log(currentDate);

	if (err) return console.error(err);
	res.render('visitors', { title: 'Visitors Page', info:"you're on the visitors page", users:visitors, cDate:currentDate, cdate2:cdate2, moment3:moment3 });
	});
});


module.exports = router;
