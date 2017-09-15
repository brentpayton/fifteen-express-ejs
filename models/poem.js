var mongoose = require('mongoose');

var poemSchema = new mongoose.Schema({
  title:          String,
  description:    String,
  isComplete:     Boolean,
  isHidden:       Boolean,
  // timeCreated :   { type : Date, default: Date.now },
  timeCreated :   { type : Date },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
},
// { timestamps: { createdAt: 'created_at' } });
{ timestamps: true });

module.exports = mongoose.model('Poem', poemSchema);
