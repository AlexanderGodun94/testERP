const AppError = require('../services/error');
const errorMessages = require('../services/errorMessages');
const db = require('../../app/services/db');

async function reqUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    if (!req.user) throw new AppError({status: 400, message: errorMessages.USER_NOT_FOUND});
    if (req.user.role !== 'user') throw new AppError({status: 400, message: errorMessages.USER_NOT_FOUND});

    const models = db.getModels();
    const existUser = await models.User.findOne({where: {id: req.user.id}});
    if (!existUser) throw new AppError({status: 400, message: errorMessages.USER_NOT_FOUND});

    const existToken = await models.UserToken.findOne({where: {userId: req.user.id, token: token}});
    if (!existToken) throw new AppError({status: 400, message: errorMessages.TOKEN_NOT_FOUND});

    req.user = existUser.toJSON();
    next();
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({status: 500, message: errorMessages.SERVER_ERROR, err: err});
  }
}

module.exports = async function (req, res, next) {
  try {
    await reqUser(req, res, next)
  } catch (err) {
    res.status(err.status || 500).json(err)
  }
};
