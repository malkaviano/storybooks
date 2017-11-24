'use strict';

const mongoose = require('./config/mongodb');

module.exports = {
  model: function() {
    
    mongoose.model('user', new mongoose.Schema({
      name: {
        type: String
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      googleId: {
        type: String,
        required: true,
        unique: true
      },
      image: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }));

    return mongoose.model('user');
  }
};