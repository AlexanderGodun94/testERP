const Sequelize = require('sequelize');
const config = require('../../config');
const logger = require('./logger');

Sequelize.Promise.config({
  longStackTraces: config.longStackTraces
});

let models = {};
let sequelize = null;

if (!config.mysql.database) return logger.error(new Error('!config.mysql.database'));
if (!config.mysql.username) return logger.error(new Error('!config.mysql.username'));
if (!config.mysql.password) return logger.error(new Error('!config.mysql.password'));
if (!config.mysql.host) return logger.error(new Error('!config.mysql.host'));

let connection = {
  host: config.mysql.host,
  dialect: config.mysql.dialect,
  pool: {
    max: 150,
    min: 0,
    idle: 10000
  },
  logging: (msg) => logger.debug(msg),
};
if (config.mysql.port) connection.port = config.mysql.port;

sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, connection);

const files = require('./../models');
files.reverse().forEach(file => {
  const model = sequelize.import(file);
  models[model.name] = model;
});

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

console.log('Database loaded');

function db() {
}

db.getSequelize = function () {
  return sequelize;
};

db.getModels = function () {
  return models;
};

module.exports = db;
