'use strict';

function schema() {
  const Schema = mongoose.Schema;

  return mongoose.model(
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
          type: { type: String, index: true },
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
          type: { type: Schema.Types.ObjectId, index: true },
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
};

const mongoose = require('../config/mongodb'),
      model = schema();

module.exports = {
  model: model,
  helper: {
    findUserStory: (id, userId) => model.findOne({ _id: id, author: userId }).populate('author'),
    findPublicStories: () => model.find({ status: "public" }).populate('author'),
    findPublicOrOwnStory: (id, userId) => 
      model.findOne({ $and: [{ _id: id }, { $or: [{ status: "public" }, { author: userId }]}]})
            .populate('author'),
    removeUserStory: (id, userId) => model.remove({ _id: id, author: userId })
  }
};