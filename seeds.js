/* global Comment */

// Create campgrounds and comments.
// Designed for error-driven development.

var mongoose =      require('mongoose');
var Campground =    require('./models/campground');
var Comment =       require('./models/comment');

var data = [
  {
    name: "Cloud's Rest",
    image: 'https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: "Desert Mesa",
    image: 'https://farm3.staticflickr.com/2135/2051881798_f753fdfd56.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    name: "Canyon Floor",
    image: 'https://farm2.staticflickr.com/1274/4670974422_ec49d65ab2.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }
  
];

//-----------------------------------------------------------------------------
// **********Deletes everything in the database**********
// Replaces with seed data.  Use only in test environment
//-----------------------------------------------------------------------------

function seedDB () {
  // Remove all campgrounds
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Removed Campgrounds');

    // // Remove all comments
    // Comment.remove({}, function(err) {
    //   if(err) {
    //     console.log(err);
    //   }
    //   console.log('Removed Comments');
    // });

    // // Add a few campgrounds with comments
    // data.forEach(function(seed) {
    //   Campground.create(seed, function(err, campground) {
    //     if(err) {
    //       console.log(err);
    //     } else {
    //       console.log('Added a campground');
    //       // Create a comment for each campground.
    //       Comment.create(
    //         {
    //           text: 'Great place but no WiFi.',
    //           author: 'Homer'
    //         }, function(err, comment) {
    //           if (err) {
    //             console.log('err');
    //           } else {
    //             campground.comments.push(comment);
    //             campground.save();
    //             console.log('Created new comment');
    //           }
    //       });
    //     }
    //   });
    // });
  });
}

module.exports = seedDB;