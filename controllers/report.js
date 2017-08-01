var passport = require('passport');
var User = require('../models/User');
var Report = require('../models/Report');

// /* GET Userlist page. */
// exports.g('/patient', function(req, res) {
//     var db = req.db;
//     var collection = db.get('reports');
//     collection.find({},{},function(e,docs){
//         res.render('patient', {
//             "Patient" : docs
//         });
//     });
// });

/* GET home page. */

exports.getReport =function(req,res){
  if(req.user){
  if(req.user.type===1){
    res.render('form',{
      title: 'Doctor report'
    });
  }
  else
    res.redirect(req.session.returnTo || '/notloggedin');
}
else
    res.redirect(req.session.returnTo || '/notloggedin');
};

exports.postReport = function(req, res, next) {
  
  // check password with confirm password
  //if(!(req.body.password===req.body.confpassword))
    //return res.redirect("/signup");
  var report = new Report({
    patient_id: req.body.patient_id,
    firstname: req.body.firstname,
     lastname: req.body.lastname,
    problem:req.body.problem,
    dressing_yes:req.body.dressing_yes,
    dressing_no:req.body.dressing_no,
    injection_yes:req.body.injection_yes,
    injection_no:req.body.injection_no,
    injection_name:req.body.injection_name
  });

  console.log(report);


  // Report.findOne({ patient_id: req.body.patient_id }, function(err, existingReport) {
  //   if (existingReport) {
  //     return res.redirect('/patient',{report:req.report});
  //   }
  // report.save(function(err) {
  //     if (err) return next(err);
  //     // req.logIn(report,unction(err) {
  //        if (err) return next(err);
  //        res.redirect('/');
  //     // });
  //   });
  // });

  Report.findOne({ patient_id: req.body.patient_id }, function(err, existingUser) {
    if (existingUser) {
      return res.redirect('/report');
    }
  report.save(function(err) {
      if (err) return next(err);
      // req.logIn(report,unction(err) {
         if (err) return next(err);
         res.redirect('/');
      // });
    });
  });
};

