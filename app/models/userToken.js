module.exports = function (sequelize, DataTypes) {

  const UserToken = sequelize.define('UserToken', {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    userId: {type: DataTypes.BIGINT, allowNull: false},
    token: {type: DataTypes.TEXT, allowNull: false},
    refreshToken: {type: DataTypes.TEXT},
  }, {
    paranoid: true,
    tableName: 'userTokens'
  });

  UserToken.associate = function (models) {
    UserToken.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE', as: 'user'});
  };

  UserToken.prototype.toJSON = function () {
    return {
      id: this.id,
      userId: this.userId,
      token: this.token,
      refreshToken: this.refreshToken,
    };
  };

  return UserToken;
};
