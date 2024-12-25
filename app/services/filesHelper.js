const fs = require('fs');
const errorMessages = require('./errorMessages');
const AppError = require('./error');

FilesHelper = {
  prepareDir: function (parentDir) {
    const date = new Date();

    const year = date.getFullYear().toString();
    const month = this.addZero(date.getMonth() + 1).toString();
    const day = this.addZero(date.getDate()).toString();

    let path = parentDir;
    path = this.createDir(path, year);
    path = this.createDir(path, month);
    path = this.createDir(path, day);
    path = path.replace(parentDir + '/', '');

    return path;
  },

  createDir: function (path, dirname) {
    const dir = fs.readdirSync(path);
    if (dir.indexOf(dirname) == -1) {
      fs.mkdirSync(path + '/' + dirname);
    }
    return path = path + '/' + dirname;
  },

  addZero: function (i) {
    return (i < 10) ? "0" + i : i;
  },

  deleteFile: function (url) {
    return new Promise((resolve, reject) => fs.unlink(url, (err, data) => {
      if (err) reject(err);
      resolve(data)
    }))
      .catch(err => {
        if (!(err instanceof AppError)) throw new AppError({
          status: 500,
          message: errorMessages.SERVER_ERROR,
          err: err
        });
        throw err
      })
  }

};

module.exports = FilesHelper;
