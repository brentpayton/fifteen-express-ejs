var express               = require('express');
var router                = express.Router({mergeParams: true});
var Poem                  = require('../models/poem');
var middleware            = require('../middleware');  // Contents of index.js automatically required

// ----------------------------------------------------------------------------
// Show all poems
// ----------------------------------------------------------------------------
router.get('/', function(req, res) {
  Poem.find({}, function(err, allPoems){
    if (err) {
      console.log(err);
    } else {
      res.render('poems/index', {poems: allPoems});
    }
  });
});

// ----------------------------------------------------------------------------
// Create
// ----------------------------------------------------------------------------
router.get('/new', middleware.isLoggedIn, function(req, res) {
  res.render('poems/new');
});

router.post('/', middleware.isLoggedIn, function(req, res) {
  var title         = req.body.title;
  var description   = req.body.description;
  var content       = req.body.content;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newPoem = {
    title: title,
    description: description,
    content: content,
    author: author};
  Poem.create(newPoem, function(err, createdPoem) {
    if (err) {
      console.log(err);
    } else {
      req.flash('success', 'Poem added');
      res.redirect('/poems');
    }
  });
});

// ----------------------------------------------------------------------------
// Show details about one poem
//
// MUST NOT BE MOVED any higher in this file otherwise a request to /new, for
// example, will cause 'new' to be interpreted as a campground id and this will
// generate fatal errors.
// ----------------------------------------------------------------------------
router.get('/:id', function(req, res) {
  // Find campground with provided id
  Poem.findById(req.params.id).exec(function(err, foundPoem) {
    if(err) {
      console.log(err);
    } else {
      // Render the 'show' template with info retrieved from the DB
      res.render('poems/show', {poem: foundPoem});
    }
  });
});

// ----------------------------------------------------------------------------
// Update
// ----------------------------------------------------------------------------
router.get('/:id/edit', middleware.checkPoemOwnership, function(req, res) {
  Poem.findById(req.params.id, function(err, foundPoem) {
    if (err) {
      console.log(err);
      req.flash('error', err);
    }
    res.render('poems/edit', {poem: foundPoem});
  });
});

router.put('/:id', middleware.checkPoemOwnership, function (req, res){
  Poem.findByIdAndUpdate(
    req.params.id,
    req.body.poem,
    function(err, updatedPoem) {
    if (err) {
      console.log(err);
      res.redirect('/poems');
    } else {
      req.flash('success', 'Poem updated');
      res.redirect('/poems/' + req.params.id);
    }
  });
});

// ----------------------------------------------------------------------------
// Delete
// ----------------------------------------------------------------------------
router.delete('/:id', middleware.checkPoemOwnership, function (req, res) {
  Poem.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
      res.redirect('/poems');
    } else {
      req.flash('success', 'Poem deleted');
      res.redirect('/poems');
    }
  });
});

module.exports = router;
