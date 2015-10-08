var express = require('express');
var mongoose = require('mongoose');
var Student = require('../models/students.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainApp/main');
});


router.post('/register', function (req, res, next) {
    console.log("AADDAA-"+ req.body.name +" "+req.body.email);
    res.json({"status":"ok", "success": true});
});


module.exports = router;
