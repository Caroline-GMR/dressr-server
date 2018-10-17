'use strict';
const express = require('express');
const router = express.Router();

const Outfit = require('../models/outfit');

router.get('/', (req, res, next) => {
  Outfit.find()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch(next);
});

router.post('/create', (req, res, next) => {
  if (req.session.currentUser) {
    return res.status(401).json({ code: 'unauthorized' });
  }
  const owner = req.session.currentUser._id;
  let { tops, bottoms, footwear, style } = req.body;
  const outfit = new Outfit({ owner, tops, bottoms, footwear, style });
  outfit.save()
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
  Outfit.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

module.exports = router;
