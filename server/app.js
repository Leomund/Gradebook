var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

var passport = require('passport')
var LocalStrategy = require('passport-local')
	.Strategy;

var strategy = require('./config/pasport')
	.Strategy;
var api = require('./routes/api');
var User = require('./models/user.model')

var app = express();

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(session({
	secret: 'keyboard cat',
	saveUninitialized: true,
	resave: true,
	proxy: true,
	cookie: {
		secure: false
	}
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(strategy);

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

app.use('/api', api);
app.get('/*', (req, res) => res.sendFile(path.resolve(__dirname + '/../client/dist/index.html')));

//db
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/gradebook', {
	useMongoClient: true
}, function(err) {
	if (err) {
		throw err;
	}
});
var db = mongoose.connection;

app.use(function(err, req, res, next) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.end('error: ' + err);
});

module.exports = app;
