
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var patient = require('./config/patient');












function getdate() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return day + ":" + month + ":" + year ;

}
function gettime() {

    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return hour + ":" + min + ":" + sec ;

}
var reportSchema = new mongoose.Schema({
  //patient_id: { type: Number },
  patient_id: String,
  firstname:  String ,
  lastname:String ,
 // logout:{type:String,default:"Logout"},
 // login:{type:String,default:"Login"},
  problem: String,
  dressing_yes: Number,
    dressing_no: Number,
    injection_yes:Number,
     injection_no:Number,
     injection_name:String,

  date:{ type:String,default:getdate()},
  time:{ type:String,default:gettime()},
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

/**
 * Password hash middleware.
 */
// reportSchema.pre('save', function(next) {
//   var report = this;
//    if (!user.isModified('password')) return next();
//    bcrypt.genSalt(10, function(err, salt) {
//      if (err) return next(err);
//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//        if (err) return next(err);
//        user.password = hash;
//       next();
//   });
//   });
// });

/**
 * Helper method for validating user's password.
 */
// userSchema.methods.comparePassword = function(candidatePassword, cb) {
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//     if (err) return cb(err);
//     cb(null, isMatch);
//   });
// };

/**
 * Helper method for getting user's gravatar.
 */
// userSchema.methods.gravatar = function(size) {
//   if (!size) size = 200;
//   if (!this.email) return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
//   var md5 = crypto.createHash('md5').update(this.email).digest('hex');
//   return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
//};

module.exports = mongoose.model('Report', reportSchema);
