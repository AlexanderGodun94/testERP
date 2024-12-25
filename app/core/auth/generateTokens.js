const config = require('../../../config');
const jwt = require('jsonwebtoken');
function generateTokens(user) {
  const jwtExpiresIn = config.server.jwtExpiresIn;
  const jwtRefreshExpiresIn = config.server.jwtRefreshExpiresIn;
  const accessToken = jwt.sign(user, config.server.secret, {expiresIn: jwtExpiresIn});
  const refreshToken = jwt.sign({
    data: {
      id: user.id,
      uid: user.uid,
      role: user.role
    }
  }, config.server.secret, {expiresIn: jwtRefreshExpiresIn});
  return {accessToken, refreshToken};
}
module.exports = generateTokens;
