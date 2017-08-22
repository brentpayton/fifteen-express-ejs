var express               = require('express');
var router                = express.Router({mergeParams: true});
var passport              = require('passport');
var User                  = require('../models/user');

// ----------------------------------------------------------------------------
// Register
// ----------------------------------------------------------------------------
router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  var newUser = new User({
      username: req.body.username,
      email:    req.body.email,
      administrator: false});
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash('error', err.message);
      res.redirect('/register');
    } else {
      passport.authenticate('local')(req, res, function() {
        req.flash('success', 'Welcome to FifteenLines!, ' + user.username);
        res.redirect('/poems');
      });
    }
  });
});

// ----------------------------------------------------------------------------
// Log in
// ----------------------------------------------------------------------------
router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login', passport.authenticate('local',
  {
    successRedirect:'/poems',
    failureRedirect:'/login',
    failureFlash: true
  }), function(req, res) {
});

// ----------------------------------------------------------------------------
// Log out
// ----------------------------------------------------------------------------
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'You have been logged out');
  res.redirect('/poems');
});

module.exports = router;
