'use strict';

const mongoose = require('../config/mongodb');

module.exports = {
  model: (function() {
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
            type: String,
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
  })(),
  findUserStory: (id, userId) => {
    return this.model.findOne({ _id: id, author: userId })
                      .populate('author');
  }
};