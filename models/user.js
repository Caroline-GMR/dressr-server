'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: true
  },
  favorites: {
    type: ObjectId,
    ref: 'Outfits'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
