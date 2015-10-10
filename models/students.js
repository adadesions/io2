var mongoose = require('mongoose');
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
  var redeem = "EOM@ADACODE.I/O";
  if(redeem == code) return true;
  else return false;
}

var Student = mongoose.model('students', studentsSchema);
module.exports = Student
