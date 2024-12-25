const db = require('../../services/db');
const models = db.getModels();
async function saveTokens(userId, tokens) {
  await models.UserToken.create({userId, token: tokens.accessToken, refreshToken: tokens.refreshToken});
}

module.exports = saveTokens;
