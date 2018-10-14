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
//     picture: req.file.url,
//     category: req.body.category,
//     description: req.body.description,
//     style: req.body.style

//   });
//   console.log('file', req.file.url);
//   item.save((err) => {
//     if (err) return res.json(err);
//     return res.json({
//       message: 'New clothing added',
//       item: item
//     });
//   });
// });

router.post('/', uploadCloud.single('picture'), (req, res, next) => {
  // const input = req.body.input;
  // if (input === 'dress' || 't-shirt' || 'jacket' || 'hoodie' || 'blouse' || 'jersey') {
  //   this.input = this.category.top;
  // }
  // if (input === 'jeans' || 'skirt' || 'shorts' || 'leggings' || 'pants' || 'sweatpants') {
  //   this.input = this.category.bottom;
  // }
  // if (input === 'sneakers' || 'boots' || 'loafers' || 'highheels' || 'ballerinas' || 'sandals') {
  //   this.input = this.category.footwear;
  // };

  const owner = req.session.currentUser._id;
  let picture;
  let { category, description, style } = req.body;
  if (req.file) {
    picture = req.file.url;
    console.log('img', req.file.url);
  }
  const item = new Item({ category, description, style, owner, picture });
  item.save()
    .then(() => {
      res.redirect(`/item/${item._id}`);
    })
    .catch(next);
});

router.get('/_id', (req, res, next) => {
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
