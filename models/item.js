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
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['tops', 'bottoms', 'footwear']
  },
  subcategory: {
    type: String,
    required: true
  },
  style: {
    type: String,
    required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
