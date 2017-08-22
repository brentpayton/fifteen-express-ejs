var Campground            = require('../models/campground');
var Comment               = require('../models/comment');
var User                  = require('../models/user');
var Poem                  = require('../models/poem');

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
  if(req.isAuthenticated()){
    Campground.findById(req.params.id, function(err, foundCampground) {
      if (err) {
        console.log(err);
        req.flash('error', err);
        res.redirect('/campgrounds');
      } else {
        // Check if user is the author of the campground entry
        if (foundCampground.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', "You don't have permission to do that");
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'Please log in first');
    res.redirect('back');
  }
};

middlewareObj.checkPoemOwnership = function(req, res, next) {
  if(req.isAuthenticated()){
    Poem.findById(req.params.id, function(err, foundPoem) {
      if (err) {
        console.log(err);
        req.flash('error', err);
        res.redirect('/poems');
      } else {
        // Check if user is the author of the campground entry
        if (foundPoem.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', "You don't have permission to do that");
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'Please log in first');
    res.redirect('back');
  }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
  if(req.isAuthenticated()){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
      if (err) {
        console.log(err);
        req.flash('error', err);
        res.redirect('back');
      } else {
        if (foundComment.author.id.equals(req.user._id)) {
          next();
        } else {
          req.flash('error', "You don't have permission to do that");
          res.redirect('back');
        }
      }
    });
  } else {
    req.flash('error', 'Please log in first');
    res.redirect('back');
  }
};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('error', 'Please log in first');
    res.redirect('/login');
  }
};

middlewareObj.isAdmin = function isAdmin(req, res, next){
  if(req.isAuthenticated()){
    User.findById(req.user._id, function(err, foundUser) {
      if (err) {
        console.log(err);
      } else {
        if (foundUser.administrator) {
          next();
        } else {
          req.flash('error', "You don't have permission to do that");
          res.redirect('/campgrounds');
        }
      }
    });
  } else {
    req.flash('error', 'Please log in first');
    res.redirect('/login');
  }
};

module.exports = middlewareObj;
