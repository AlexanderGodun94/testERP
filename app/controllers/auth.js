const errorMessages = require('../services/errorMessages');
const AppError = require('../services/error');
const respond = require('../middlewares/respond');

const auth = require('../core/auth');
const getTokenByRefreshToken = require('../core/auth/getTokenByRefreshToken');

module.exports = function () {

  const app = this.app;

  app.route('/signin')
  .post((req, res) => {
    if (!req.body.id || !req.body.password)
      return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
    respond(res, 200, auth(req.body.id, req.body.password));
  });

  app.route('/signin/new_token')
  .post((req, res) => {
    if (!req.body.refreshToken)
      return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
    respond(res, 200, getTokenByRefreshToken(req.body.refreshToken))
  });

};

