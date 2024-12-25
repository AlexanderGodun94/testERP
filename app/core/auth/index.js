const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');
const bcrypt = require('bcryptjs');
const generateTokens = require("./generateTokens");
const saveTokens = require("./saveTokens");

async function auth(id, password) {
  try {
    const models = db.getModels();

    let user = await models.User.findOne({where: {uid: id}});
    if (!user) throw new AppError({status: 400, message: errorMessages.USER_NOT_FOUND});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError({status: 400, message: errorMessages.WRONG_PASSWORD});

    let userObj = user.toJSON();
    const tokens = generateTokens(userObj);
    await saveTokens(userObj.id, tokens);
    userObj.tokens = tokens;
    return userObj;

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = auth;

