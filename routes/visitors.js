var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var visSchema = new Schema({
	visitor_id: Number,
	first_name: String,
	last_name: String,
	last_update_user: String,
	last_update_date: Date,
	company: String,
	status: String,
	upi_no: String,
	creation_date: Date,
	creation_user: String,
	pass_type: String,
	point_of_entry: String,
	creation_dateS : String,
	last_update_dateS : String,
	p_o_e: String,
	createUpdate: String
	
});

var conn = mongoose.createConnection('localhost','work');
var Vismodel = conn.model('visitors', visSchema); 

var moment3 = moment().add('days', 3).fromNow();

var cdate = new Date();
cdate.setHours(0,0,0,0);

router.get('/', function(req, res) {
//  Vismodel.find({first_name:/vince$/i}, function(err,visitors,currentDate) {
  Vismodel.find({creation_date: {$gt:cdate}}, null,{sort: {'creation_date':-1}} , function(err,visitors) {
	var cdate2 = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
	var currentDate = new Date();
	
	for (l in visitors) {
	//	console.log(l, visitors[l]["last_name"], moment(visitors[l]["creation_date"]).format("ddd, MMMM do YYYY, h:mm:ss a"));
		var createDate = visitors[l]["creation_date"];
		var updateDate = visitors[l]["last_update_date"];
		var createdBy = visitors[l]["creation_user"];
		var updatedBy = visitors[l]["last_update_user"];
		var p_o_e = visitors[l]["point_of_entry"];
		
		visitors[l]["creation_dateS"] = moment(createDate).add(4,'hours').format("MMM D YY, h:mm:ss a");
		visitors[l]["last_update_dateS"] = moment(updateDate).add(4,'hours').format("MMM D YY, h:mm:ss a");
		visitors[l]["p_o_e"] = updatedBy;
		
		visitors[l].createUpdate = "x";
		if (createdBy == "gsdadmin") {
			visitors[l]["p_o_e"] = p_o_e;
			createdBy = p_o_e;
			}
		if (createdBy == updatedBy) {
			visitors[l].createUpdate = createdBy;
			}
		else {
			visitors[l].createUpdate = p_o_e ;
			}
		}
		
//		console.log(visitors[0]["creation_dateS"]);
		
	if (err) return console.error(err);
	
	var trows = visitors.length;
	res.render('visitors', { title: 'Visitors Page', info:"you're on the visitors page", users:visitors, cDate:currentDate, cdate2:cdate2, moment3:moment3, trows:trows });
	
	});
});


module.exports = router;
