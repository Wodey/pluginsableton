var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var User = require('./models/userModel');

var app = express();

mongoose.connect('mongodb+srv://Wodey:iamsupercool@cluster0.xynvl.mongodb.net/plugins?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => console.log('Successfull Connect')).catch(err => console.error(err));

app.use(session({secret: "MuradLoH"}));

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
