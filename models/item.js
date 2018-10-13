'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const itemSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  picture: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false,
    enum: ['top', 'bottom', 'footwear']
  },
  description: {
    type: String,
    required: false
  },
  style: {
    type: String,
    required: false
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
