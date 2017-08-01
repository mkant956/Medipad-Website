var passport = require('passport');
var User = require('../models/User');
var Report = require('../models/Report');

/* GET home page. */
exports.getSignup = function(req, res) {
  if (req.user) return res.redirect('/');
  res.render('signup', {
    title: 'Signup'
  });
};

exports.getForm =function(req,res){
  //if(req.user==1)
    res.render('form',{
      title: 'Doctor'
    });
};
exports.getLogin = function(req, res) {    //to direct th euser on the bsis of type
  if (req.user) 
    return res.redirect('/');
  else 
  res.render('login', {
    title: 'Login'
  });
};

exports.postSignup = function(req, res, next) {
  
  // check password with confirm password
  if(!(req.body.password===req.body.confpassword))
    return res.redirect("/signup");
  var user = new User({
    email: req.body.email,
    username: req.body.username,

    password: req.body.password,
    confpassword: req.body.confpassword,
    type: req.body.type
  });

  console.log(user);

  User.findOne({ email: req.body.email }, function(err, existingUser) {
    if (existingUser) {

      return res.redirect('/signup');
    }
    user.save(function(err) {
      if (err) return next(err);
      req.logIn(user, function(err) {
        if (err) return next(err);
        res.redirect('/');
      });
    });
  });
};

exports.postLogin = function(req, res, next) {
  console.log("req");
  passport.authenticate('local', function(err, user, info) {
    if (err) return next(err);
    if (!user) {
      return res.redirect('/signup');
    }
    //to checkthe valid user or not 
     console.log(user);
    req.logIn(user, function(err) {
      console.log(req.body.type);
      if (err) return next(err);
 
      res.redirect(req.session.returnTo || '/asd');
    });

  })(req, res, next);
};
exports.getPatientReport =function(req,res){
    var id=1;

// if(req.user){
//   if(req.user.type===2){
//     res.render('patient', { report : req.user});
// }
// else
//     res.redirect(req.session.returnTo || '/notloggedin');
// }
// else
//     res.redirect(req.session.returnTo || '/notloggedin');

 var db = req.db;
    var collection = db.get('reports');
    if(req.user){
  if(req.user.type===2){
    collection.findOne({ patient_id: req.user.username },function(e,docs){
      console.log(docs);
        res.render('patient', {  user : docs  });
    });
  }
  else
    res.redirect(req.session.returnTo || '/notloggedin');
}
else
    res.redirect(req.session.returnTo || '/notloggedin');

};

exports.getChemistReport =function(req,res){
    var id=1;
  // Report.findOne({ id }, function(err, existingReport) {
  //   if (existingReport) {
      
  //     return res.redirect('/patient', { report : req.report});
  //   }
  // });
if(req.user){
  if(req.user.type===3){
    res.render('chemist', { report : req.user});
}
else
    res.redirect(req.session.returnTo || '/notloggedin');
}
else
    res.redirect(req.session.returnTo || '/notloggedin');
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/login');
};