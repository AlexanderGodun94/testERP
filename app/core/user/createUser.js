const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');
const models = db.getModels();
const generateTokens = require('../auth/generateTokens')
const saveTokens = require('../auth/saveTokens')

async function createUser(id, password, typeId) {
  try {
    let user = await models.User.findOne({where: {uid: id}});
    if (user) throw new AppError({status: 400, message: errorMessages.ID_EXIST});

    user = await models.User.create({
      uid: id,
      typeId: typeId,
      password: password,
    });
    let userObj = user.toJSON();

    const tokens = generateTokens(userObj);
    await saveTokens(user.id, tokens);

    userObj.tokens = tokens;
    return userObj;
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}


module.exports = createUser;

