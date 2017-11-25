'use strict';

const mongoose = require('../config/mongodb'),
      Schema = mongoose.Schema;

function schema() {
  const Story = mongoose.model(
    'story',
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
    ),
    'stories'
  );

  Story.statics.findUserStory = function(id, userId) {
    return model.findOne({ _id: id, author: userId }).populate('author');
  }

  return Story;
};

module.exports = {
  model: schema(),
  helper: {
    findUserStory: (id, userId) => model.findOne({ _id: id, author: userId }).populate('author'),
    findPublicStories: () => model.find({ status: "public" }).populate('author'),
    findPublicOrOwnStory: (id, userId) => 
      model.findOne({ $and: [{ _id: id }, { $or: [{ status: "public" }, { author: userId }]}]})
            .populate('author'),
    removeUserStory: (id, userId) => model.remove({ _id: id, author: userId })
  }
};