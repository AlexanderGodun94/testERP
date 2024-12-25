const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');
const config = require('../../../config');
const jwt = require('jsonwebtoken');
const generateTokens = require('./generateTokens');

async function getTokensByCode(refreshToken) {
  try {
    const models = db.getModels();
    const jwtRefreshExpiresIn = config.server.jwtRefreshExpiresIn;
    const decoded = await jwt.verify(refreshToken, config.server.secret, {expiresIn: jwtRefreshExpiresIn});
    let user;
    if (decoded.data.role === 'user') user = await models.User.findOne({where: {id: decoded.data.id}});
    if (!user) throw new AppError({status: 400, message: errorMessages.USER_NOT_FOUND});

    const oldToken = await models.UserToken.findOne({
      where: {
        userId: user.id,
        refreshToken: refreshToken
      }
    });
    if (!oldToken) throw new AppError({status: 400, message: errorMessages.TOKEN_NOT_FOUND});

    let userObj = user.toJSON();
    const newTokens = generateTokens(userObj);
    await oldToken.update({
      token: newTokens.accessToken,
      refreshToken: newTokens.refreshToken
    });
    return {
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken
    };
  } catch (err) {
    if (err.message === 'jwt expired') throw new AppError({status: 400, message: errorMessages.JWT_EXPIRED});
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = getTokensByCode;

