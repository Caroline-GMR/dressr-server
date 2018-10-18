'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const outfitSchema = new Schema({
  owner: {
    type: ObjectId,
    ref: 'User'
  },
  tops: {
    type: ObjectId,
    ref: 'Item'
  },
  bottoms: {
    type: ObjectId,
    ref: 'Item'
  },
  footwear: {
    type: ObjectId,
    ref: 'Item'
  },
  style: {
    type: String,
    required: true
  },
  notes: {
    type: String
  }
});

const Outfit = mongoose.model('Outfit', outfitSchema);

module.exports = Outfit;
