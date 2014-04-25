var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res) {
  // res.send("you're on the test page");
// });


/* GET home page. */
router.get('/', function(req, res) {
  res.render('test', { title: 'Test Page', info:"you're on the test page" });
});



module.exports = router;
