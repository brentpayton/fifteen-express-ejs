var Campground            = require('../models/campground');
var Comment               = require('../models/comment');

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
          req.flash('error', "You don't have permission to do that")
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

module.exports = middlewareObj;