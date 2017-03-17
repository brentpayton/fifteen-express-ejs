var express               = require('express');
var router                = express.Router({mergeParams: true});
var Campground            = require('../models/campground');
var middleware            = require('../middleware');  // Contents of index.js automatically required

// ----------------------------------------------------------------------------
// Show all campgrounds
// ----------------------------------------------------------------------------
router.get('/', function(req, res) {
  //console.log(req.params);
  // Get all campgrounds from the database
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds});      
    }
  });
});

// ----------------------------------------------------------------------------
// Create
// ----------------------------------------------------------------------------
router.get('/new', middleware.isLoggedIn, function(req, res) {
  res.render('campgrounds/new');
});

router.post('/', middleware.isLoggedIn, function(req, res) {
  var name          = req.body.name;
  var price         = req.body.price;
  var image         = req.body.image;
  var description   = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {name: name, price: price, image: image, description: description, author: author};
  Campground.create(newCampground, function(err, createdCampground) {
    if (err) {
      console.log(err);
    } else {
      req.flash('success', 'Campground added');
      res.redirect('/campgrounds');
    }
  });
});

// ----------------------------------------------------------------------------
// Show details about one campground
//
// MUST NOT BE MOVED any higher in this file otherwise a request to /new, for
// example, will cause 'new' to be interpreted as a campground id and this will
// generate fatal errors.
// ----------------------------------------------------------------------------
router.get('/:id', function(req, res) {
  // Find campground with provided id
  Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
    if(err) {
      console.log(err);
    } else {
      // Render the 'show' template with info retrieved from the DB
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

// ----------------------------------------------------------------------------
// Update
// ----------------------------------------------------------------------------
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
      req.flash('error', err);
    }
    res.render('campgrounds/edit', {campground: foundCampground});
  });
});

router.put('/:id', middleware.checkCampgroundOwnership, function (req, res){
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      req.flash('success', 'Campground updated');
      res.redirect('/campgrounds/' + req.params.id);
    }
  });
});

// ----------------------------------------------------------------------------
// Delete
// ----------------------------------------------------------------------------
router.delete('/:id', middleware.checkCampgroundOwnership, function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      req.flash('success', 'Campground deleted');      
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;