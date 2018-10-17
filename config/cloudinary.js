'use strict';

const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const bcrypt = require('bcrypt');
const saltRounds = 10;

cloudinary.config({
  cloud_name: 'dowqh5zjd',
  api_key: 499226874393186,
  api_secret: 'I0OFoR_LlDwJGlunQxOpNPEypSU'
});

var storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'dressr',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, bcrypt.hashSync(`${Math.floor(Math.random() * 300000)}`, saltRounds));
  }
});

const uploadCloud = multer({ storage: storage });

module.exports = uploadCloud;
