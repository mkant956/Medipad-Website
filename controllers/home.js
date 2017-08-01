
/* GET home page. */
exports.getHome = function(req, res) {
	if(req.user) {
		res.render('home', {user : req.user});
	} else {
		res.render('home', {});
	}
	
};

exports.getAbout = function(req, res) {

		res.render('about',{});
	
	
};

exports.getError = function(req, res) {

		res.render('error',{});
	
	
};

exports.bmi = function(req, res) {
	res.render('bmi', {});
};
exports.getAbc = function(req, res) {
	if(req.user)
	return res.redirect('/');
	else 
	return res.redirect('/signup');
};
exports.getHome1 = function(req, res) {
	   if(req.user.type===1)
       return res.redirect('/report');
    if(req.user.type===2)
        return res.redirect('/patient');
    if(req.user.type===3)
        return res.redirect('/chemist');
        else res.redirect('/notlogged'); 
};

