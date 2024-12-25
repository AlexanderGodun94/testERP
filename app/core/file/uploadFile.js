const AppError = require('../../services/error');
const db = require('../../../app/services/db');
const path = require('path');

async function uploadFile(user, file) {
  try {
    const models = db.getModels();
    return await models.File.create({
      userId: user.id,
      url: file.path,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      extension: path.extname(file.originalname)
    });

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = uploadFile;

