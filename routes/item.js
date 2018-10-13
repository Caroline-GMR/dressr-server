var express = require('express');
var router = express.Router();

const uploadCloud = require('../config/cloudinary.js');

var Item = require('../models/item');

router.get('/', (req, res, next) => {
  Item.find()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch(next);
});

router.post('/', uploadCloud.single('file'), (req, res, next) => {
  const item = new Item({
    name: req.body.name,
    image: req.file.url
  });

  item.save((err) => {
    if (err) return res.json(err);
    return res.json({
      message: 'New clothing added',
      item: item
    });
  });
});

module.exports = router;
