const errorMessages = require('../services/errorMessages');
const AppError = require('../services/error');
const respond = require('../middlewares/respond');
const respondDownload = require('../middlewares/respondDownload');

const reqAuth = require('../middlewares/reqAuth');
const reqUser = require('../middlewares/reqUser');
const fileUpload = require('../middlewares/fileUpload');
const uploadFile = require('../core/file/uploadFile');
const getFileById = require('../core/file/getFileById');
const getFiles = require('../core/file/getFiles');
const deleteFile = require('../core/file/deleteFile');
const updateFile = require('../core/file/updateFile');
const getFilePath = require('../core/file/getFilePath');

module.exports = function () {

  const app = this.app;

  app.route('/file/upload')
    .post(reqAuth, reqUser, fileUpload('files'), (req, res) => {
      if (!req.files) return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 200, uploadFile(req.user, req.files[0]));
    });

  app.route('/file/list')
    .get(reqAuth, reqUser, (req, res) => {
      let options = {};
      if (req.param('list_size') && req.param('list_size') > 0) options.list_size = req.param('list_size');
      if (req.param('page') && req.param('page') > 0) options.page = req.param('page');
      respond(res, 200, getFiles(req.user, options));
    });

  app.route('/file/delete/:id')
    .delete(reqAuth, reqUser, (req, res) => {
      respond(res, 200, deleteFile(req.user, req.params.id));
    });

  app.route('/file/:id')
    .get(reqAuth, reqUser, (req, res) => {
      respond(res, 200, getFileById(req.user, req.params.id));
    });

  app.route('/file/update/:id')
    .put(reqAuth, reqUser, fileUpload('files'), (req, res) => {
      if (!req.files) return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 200, updateFile(req.user, req.files[0], req.params.id));
    });

  app.route('/file/download/:id')
    .get(reqAuth, reqUser, (req, res) => {
      respondDownload(res, 200, getFilePath(req.user, req.params.id));
    });

};

