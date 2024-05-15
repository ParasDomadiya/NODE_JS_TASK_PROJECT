const express = require("express");
const multer = require("multer");
const path = require("path");

/// Product IMAGE UPLOAD
const areastorage = multer.diskStorage({
  destination: (req, file, jb) => { jb(null, 'uplode/') },
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const Productupload = multer({
  storage: areastorage,
  limits:{fileSize:1000000}
});



/// Products IMAGE UPLOAD///////////////////////////////////////////////////////////////////////
const areazonestorage = multer.diskStorage({
  destination: (req, file, jb) => { jb(null, 'uplode/') },
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});
const Productsupload = multer({
  storage: areazonestorage,
  limits:{fileSize:1000000}
});

module.exports = {Productupload, Productsupload};