const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');

async function getFileById(user, id) {
  try {
    const models = db.getModels();
    const file = await models.File.findOne({
      where: {
        id: id,
        userId: user.id,
      }
    });
    if (!file) throw new AppError({status: 400, message: errorMessages.FILE_NOT_FOUND});
    return file;
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = getFileById;

