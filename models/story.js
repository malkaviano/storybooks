'use strict';

module.exports = function(mongoose) {
  
  mongoose.model('story', new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'public'
    },
    description: {
      type: String,
      required: true
    },
    allowComments: {
      type: Boolean,
      default: true
    },
    comments: [{
      commentText: {
        type: String,
        required: true
      },
      commentDate: {
        type: Date,
        default: Date.now
      },
      commentUser: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      }
    }],
    author: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }), 'stories');

  return mongoose.model('story');
};