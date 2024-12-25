const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');
const filesHelper = require('../../../app/services/filesHelper');

async function deleteFile(user, id) {
  try {
    const models = db.getModels();
    const file = await models.File.findOne({
      where: {
        id: id,
        userId: user.id,
      }
    });
    if (!file) throw new AppError({status: 400, message: errorMessages.FILE_NOT_FOUND});

    await filesHelper.deleteFile(file.url);
    return await file.destroy({force: true});
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = deleteFile;

