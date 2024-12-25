const AppError = require('../../services/error');
const getFileById = require("./getFileById");
async function getFilePath(user, id) {
  try {
    const file = await getFileById(user, id);
    return file.url;
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = getFilePath;

