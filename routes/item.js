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

// router.post('/', uploadCloud.single('file'), (req, res, next) => {
//   console.log('que tengo en body', req.body);
//   const item = new Item({
//     owner: req.session.currentUser._id,
//     picture: req.file.url,
//     category: req.body.category,
//     subcategory: req.body.subcategory,
//     style: req.body.style
//   });
//   console.log(req.body.subcategory);
//   item.save((err) => {
//     if (err) return res.json(err);
//     return res.json({
//       message: 'New clothing added',
//       item: item
//     });
//   });
// });

router.post('/', uploadCloud.single('file'), (req, res, next) => {
  const owner = req.session.currentUser._id;
  let { category, subcategory, style } = req.body;
  // if (req.file) {
  //   picture = req.file.url;
  //   console.log('img', req.file.url);
  // }
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
