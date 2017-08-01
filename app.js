var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');

// New Code
var mongo = require('mongo');
var monk = require('monk');
var db = monk('localhost:27017/medipad');  //or test_medipad



var homeController = require('./controllers/home');
var userController = require('./controllers/user');
var reportController = require('./controllers/report');
var studentController = require('./controllers/student');
var profController = require('./controllers/prof');
var hodController = require('./controllers/hod');
var adminController = require('./controllers/admin');
var doctorController = require('./controllers/doctor');

var secrets = require('./config/secrets');
var patient = require('./config/patient');
var passportConf = require('./config/passport');

var app = express();


mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});
// mongoose.connect(patient.db);
// mongoose.connection.on('error', function() {
//     console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
// });
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secrets.sessionSecret,
    store: new MongoStore({
        url: secrets.db,
        autoReconnect: true
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

/* Routes */
app.get('/', homeController.getHome);
app.get('/asd', homeController.getHome1);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/dashboard',  doctorController.getDashboard);
app.get('/report',reportController.getReport);
app.post('/report',reportController.postReport);
app.get('/bmi',homeController.bmi);
app.get('/patient',  userController.getPatientReport);
app.get('/chemist',  userController.getChemistReport);
app.get('/about',  homeController.getAbout);
app.get('/notloggedin',  homeController.getError);
app.get('/abc',  homeController.getAbc);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
