'use strict';

module.exports = function(mongoose) {
  const Schema = mongoose.Schema;

  mongoose.model(
    'story',
    new Schema(
      {
        title: {
          type: String,
          required: true,
          min: 5,
          max: 20
        },
        status: {
          type: String,
          default: 'public'
        },
        description: {
          type: String,
          required: true,
          min: 50
        },
        allowComments: {
          type: Boolean,
          default: true
        },
        comments: [{
          commentText: {
            type: String,
            required: true,
            min: 10,
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

  return mongoose.model('story');
};