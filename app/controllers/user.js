const errorMessages = require('../services/errorMessages');
const AppError = require('../services/error');
const respond = require('../middlewares/respond');
const reqAuth = require('../middlewares/reqAuth');
const reqUser = require('../middlewares/reqUser');
const createUser = require('../core/user/createUser');
const logout = require('../core/user/logout');
const defineTypeId = require('../core/user/defineTypeId');

module.exports = function () {
  const app = this.app;

  app.route('/signup')
    .post((req, res) => {
      if (!req.body.id || !req.body.password)
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      const typeId = defineTypeId(req.body.id);
      if (!typeId) return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_PHONE_OR_EMAIL}));
      respond(res, 201, createUser(req.body.id, req.body.password, typeId));
    });

  app.route('/info')
    .get(reqAuth, reqUser, (req, res) => {
      respond(res, 200, req.user);
    });

  app.route('/logout')
    .get(reqAuth, reqUser, (req, res) => {
      const token = req.headers.authorization.split(' ')[1];
      respond(res, 200, logout(token));
    });

};

