const AppError = require('../../services/error');
const db = require('../../../app/services/db');

async function getFiles(user, params) {
  try {
    const models = db.getModels();
    const listSize = Number(params.list_size) || 10;
    const page = Number(params.page) || 1;
    const order = 'ASC';
    const offset = (page - 1) * listSize;

    const files = await models.File.findAll({
      order: [['createdAt', order]],
      limit: listSize,
      offset: offset,
      where: {
        userId: user.id,
      }
    });
    return {
      count: files.length,
      list: files,
    };
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = getFiles;

