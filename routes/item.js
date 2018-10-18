'use strict';
const express = require('express');
const router = express.Router();

const uploadCloud = require('../config/cloudinary.js');

const Item = require('../models/item');

router.get('/', (req, res, next) => {
  const ownerId = req.session.currentUser._id;

  Item.find({ owner: ownerId })
    .then((results) => {
      res.status(200).json(results);
    })
    .catch(next);
});

router.post('/', uploadCloud.single('file'), (req, res, next) => {
  const owner = req.session.currentUser._id;
  let { category, subcategory, style } = req.body;
  const item = new Item({ owner, picture: req.file.url, category, subcategory, style });
  item.save()
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  Item.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

module.exports = router;
