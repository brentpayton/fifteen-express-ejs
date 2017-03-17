var express               = require('express');
var router                = express.Router();

// ----------------------------------------------------------------------------
// Homepage route
// ----------------------------------------------------------------------------
router.get('/', function(req, res) {
  res.render('landing');
});

module.exports = router;