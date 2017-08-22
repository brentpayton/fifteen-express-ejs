var express               = require('express');
var router                = express.Router();
var Poem                  = require('../models/poem');

// ----------------------------------------------------------------------------
// Homepage route
// ----------------------------------------------------------------------------
// router.get('/', function(req, res) {
//   res.render('landing');
// });

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

module.exports = router;
