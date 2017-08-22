/* Used when deleting existing poems in the database and adds default data. */


var mongoose =      require('mongoose');
var Poem =          require('./models/poem');
// var Comment =       require('./models/comment');

var data = [
  {
    title: "Cloud's Rest",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: "Desert Mesa",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  },
  {
    title: "Canyon Floor",
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
  }

];

//-----------------------------------------------------------------------------
// **********Deletes everything in the database**********
// Replaces with seed data.  Use only in test environment
//-----------------------------------------------------------------------------

function seedDB () {
  // Remove all campgrounds
  Poem.remove({}, function(err) {
      if (err) {
        console.log(err);
      }
      console.log('Removed Poems');
    });
    // // Remove all comments
    // Comment.remove({}, function(err) {
    //   if(err) {
    //     console.log(err);
    //   }
    //   console.log('Removed Comments');
    // });

    // Add a few campgrounds with comments
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

    // Add a few poems with descriptions
    data.forEach(function(seed) {
      Poem.create(seed, function(err, poem) {
        if (err) {
          console.log(err);
        }
      });
    });
}

module.exports = seedDB;
