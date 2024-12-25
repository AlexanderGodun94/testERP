const AppError = require('../../services/error');
const db = require('../../../app/services/db');

async function logout(token) {
  try {
    const models = db.getModels();
    return await await models.UserToken.destroy({where: {token: token}, force: true});
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = logout;

