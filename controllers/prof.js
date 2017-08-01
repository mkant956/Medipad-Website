var User = require('../models/User');

exports.getDashboard = function(req, res) {
  if(req.params.email == req.user.email) {
    res.render('prof/dashboard', {
      'user': req.user
    });
  } else {
    res.redirect('/login');
  }
};

