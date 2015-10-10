var express = require('express');
var mongoose = require('mongoose');
var Student = require('../models/students.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainApp/main');
});


router.post('/register', function (req, res, next) {
  var newStudent = Student({
    course_code: req.body.course_code,
    course: req.body.course,
    fullname: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    age: req.body.age,
    mobile: req.body.mobile,
    status: "active",
    datetime: new Date()
  });
  newStudent.save();
  var data = newStudent;
  res.json({"status":"ok", "success": true, "data": data});
});


module.exports = router;
