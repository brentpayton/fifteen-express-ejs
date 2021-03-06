// ----------------------------------------------------------------------------
// Express
// ----------------------------------------------------------------------------
var express               = require('express');
var app                   = express();
                            app.set('view engine', 'ejs');
                            app.use(express.static(__dirname + '/public'));
var expressSession        = require('express-session');
                            app.use(expressSession({
                              secret              : 'seattle',
                              resave              : false,
                              saveUninitialized   : false
                            }));
var moment                = require('moment');

var Promise               = require("bluebird");

// ----------------------------------------------------------------------------
// Mongoose
// ----------------------------------------------------------------------------
var mongoose              = require('mongoose');
                          // mongoose.connect('mongodb://localhost/yelpcamp'); //Dev
                          // mongoose.connect('mongodb://yelpcamp:yelpcamp@ds039115.mlab.com:39115/yelpcamp');  //Prod
                          // If env variable doesn't exist, default to local development database.
mongoose.Promise          = Promise;
var dbUrl                 = process.env.DATABASEURL || 'mongodb://localhost/yelpcamp';
                          //mongoose.connect(process.env.DATABASEURL);
                          mongoose.connect(dbUrl);

// ----------------------------------------------------------------------------
// Models
// ----------------------------------------------------------------------------
var Comment               = require('./models/comment.js');
var User                  = require('./models/user.js');
var Poem                  = require('./models/poem.js');

// ----------------------------------------------------------------------------
// Auth
// ----------------------------------------------------------------------------
var LocalStrategy         = require('passport-local');
var passport              = require('passport');
                            app.use(passport.initialize());
                            app.use(passport.session());
                            passport.serializeUser(User.serializeUser());
                            passport.deserializeUser(User.deserializeUser());
                            passport.use(new LocalStrategy(User.authenticate()));
var bodyParser            = require('body-parser');
                            app.use(bodyParser.urlencoded({extended: true}));

// ----------------------------------------------------------------------------
// Method Override
// ----------------------------------------------------------------------------
var methodOverride        = require('method-override');
                            app.use(methodOverride('_method'));

// ----------------------------------------------------------------------------
// Connect-Flash
// ----------------------------------------------------------------------------
var flash                 = require('connect-flash');
                            app.use(flash());

// ----------------------------------------------------------------------------
// Make 'currentUser' and 'message' available to every route
// ----------------------------------------------------------------------------
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

// ----------------------------------------------------------------------------
// Routes
// ----------------------------------------------------------------------------
var campgroundRoutes      = require('./routes/campgrounds.js');
                            // All campground routes start with '/campgrounds'
                            app.use('/campgrounds', campgroundRoutes);

var poemRoutes              = require('./routes/poems.js');
                            // All poem routes start with '/poems'
                            app.use('/poems', poemRoutes);

var commentRoutes         = require('./routes/comments.js');
                            // All comment routes start with 'campgrounds/:id/comments'
                            app.use('/campgrounds/:id/comments', commentRoutes);

var authRoutes            = require('./routes/auth.js');
                            app.use(authRoutes);

var indexRoutes           = require('./routes/index.js');
                            app.use(indexRoutes);

var userRoutes            = require('./routes/users.js');
                            app.use(userRoutes);

// DELETE everything in the database*******************************************
// . . . then replace with seed data.  Use for testing purposes only.
// var seedDB = require('./seeds');
// seedDB();
// *****************************************************************************

// ============================================================================
// Server listen
// ============================================================================
// app.listen(process.env.PORT, process.env.IP, function() {
//   console.log('YelpCamp Server Started');
// });
app.listen(3000, function() {
  console.log("Fifteenlines Server Started");
});
