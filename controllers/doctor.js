// var User = require('../models/User');

exports.getDashboard = function(req, res) {
  
    res.render('doctor/dashboard', {
      'user': req.user
    });
};

