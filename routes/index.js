var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express tutorial', info:req.get('host')+'/users will show users from mongodb' , host:req.get('host')});
});



module.exports = router;
