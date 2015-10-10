var mongoose = require('mongoose');
var _ = require('underscore');
var Schema = mongoose.Schema;

var studentsSchema = new Schema({
  course_code: String,
  course: String,
  fullname: String,
  email: String,
  gender: String,
  age: String,
  mobile: String,
  status: String,
  datetime: String,
});


studentsSchema.methods.statusActive = function(){
  var status = "active";
      course = this.course;
  if(course.indexOf('Experience of MEAN (EOM#1)') != -1)
    this.status = status;
  else this.status = "reserved";
}

studentsSchema.methods.redeemCheck = function(code) {
  var redeem = ["EOM99@ADACODE.I/O", "JS2332.I/O", "BS3223.I/O", "EXP9999.I/O"];
  return _.contains(redeem, code);
}

var Student = mongoose.model('students', studentsSchema);
module.exports = Student
