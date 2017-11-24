'use strict';

module.exports = function(mongoose) {
  const Schema = mongoose.Schema;

  return mongoose.model(
    'story',
    new Schema(
      {
        title: {
          type: String,
          required: true,
          minlength: 5,
          max: 20
        },
        status: {
          type: String,
          default: 'public'
        },
        description: {
          type: String,
          required: true,
          minlength: 50
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
            max: 200
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
};