'use strict';

const mongoose = require('../config/mongodb'),
      Schema = mongoose.Schema;

function model() {
  
  const storySchema = 
    new Schema(
      {
        title: {
          type: String,
          required: true,
          minlength: 5,
          maxlength: 20,
          trim: true
        },
        status: {
          type: String,
          index: true,
          default: 'public'
        },
        description: {
          type: String,
          required: true,
          minlength: 50,
          maxlength: 1000,
          trim: true
        },
        allowComments: {
          type: Boolean,
          default: true
        },
        comments: [{
          commentText: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 200,
            trim: true
          },
          commentDate: {
            type: Date,
            default: Date.now
          },
          commentUser: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
          }
        }],
        author: {
          type: Schema.Types.ObjectId,
          index: true,
          ref: 'user',
          required: true
        },
        date: {
          type: Date,
          default: Date.now
        }
      }
    );

  storySchema.statics.findUserStory = function(id, userId) {
    return this.findOne({ _id: id, author: userId }).populate('author');
  };

  storySchema.statics.findUserStory = function(id, userId) {
    return this.findOne({ _id: id, author: userId }).populate('author');
  };

  storySchema.statics.findPublicStories = function() {
    return this.find({ status: "public" }).populate('author');
  };

  storySchema.statics.findPublicOrOwnStory = function(id, userId) {
    return this.findOne({ $and: [{ _id: id }, { $or: [{ status: "public" }, { author: userId }]}]})
                .populate('author');
  };
    
  storySchema.statics.removeUserStory = function(id, userId) {
    return this.remove({ _id: id, author: userId });
  };

  return mongoose.model('story', storySchema, 'stories');
};

module.exports = model();