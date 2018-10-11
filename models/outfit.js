'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const outfitSchema = new Schema({
  picture: {
    type: String,
    required: true
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
