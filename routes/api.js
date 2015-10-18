var express = require('express');
var mongoose = require('mongoose');
var mailer = require('express-mailer');
var Student = require('../models/students.js');
var mailer = require('express-mailer');
var path = require('path');
var _ = require('underscore');
var router = express.Router();
var app = express();

//Mailer setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

mailer.extend(app, {
  from: 'robot@adacode.io',
  host: 'smtp.zoho.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'robot@adacode.io',
    pass: 'adacode9898'
  }
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainApp/main');
});


router.get('/sendmail', function (req, res, next) {
  app.mailer.send('infoMail', {
    to: 'ada_dev@icloud.com', // REQUIRED. This can be a comma delimited string just like a normal email to field.
    subject: 'Test Email from AdaCode.io', // REQUIRED.
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    res.send('Email Sent');
  });
});

router.get('/survay', function (req, res, next) {
   Student.find({}).exec(function(err, data){
     if(err) throw err;
     else{
       var survay = _.pluck(data, 'survay');
       var final = [];
       _.each(_.compact(survay), (x) => typeof x === "string" ? final.push(JSON.parse(x)) : console.log(typeof x));
       res.json(final);
     }

   });
})

router.get('/student/:course', function (req, res, next) {
  Student.find({course_code:req.params.course}, function(err,data){
    if(err) throw err;
    else res.json(data);
  });
})

//POST REGISTER
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
    datetime: new Date(),
    survay: req.body.survay,
  });

  if(newStudent.redeemCheck(req.body.redeem)){
    newStudent.save();
    res.json({"status":"ok", "success": true});
  }
  else res.json({"status":"error", "success": false});


});

module.exports = router;
