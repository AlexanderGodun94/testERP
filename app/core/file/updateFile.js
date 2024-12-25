const AppError = require('../../services/error');
const getFileById = require('./getFileById');
const filesHelper = require("../../services/filesHelper");
const path = require("path");
async function updateFile(user, newFile, id) {
  try {
    const file = await getFileById(user, id);
    await filesHelper.deleteFile(file.url);

    return await file.update({
      url: newFile.path,
      originalName: newFile.originalname,
      mimetype: newFile.mimetype,
      size: newFile.size,
      extension: path.extname(newFile.originalname)
    });

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = updateFile;

