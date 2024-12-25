const multer = require('multer');
const config = require('../../config');
const filesHelper = require('../services/filesHelper');
const path = require('path');

function fileUpload(fileFolder) {
  return multer({
    limits: config.uploadFileLimits,
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        filesHelper.createDir('./uploads', fileFolder);
        cb(null, path.join('uploads/' + fileFolder, filesHelper.prepareDir('uploads/' + fileFolder)))
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + (file.fieldname ? file.fieldname + '-' : '') + file.originalname)
      }
    })
  }).any();
}

module.exports = fileUpload;
