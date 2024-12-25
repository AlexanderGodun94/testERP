module.exports = function (sequelize, DataTypes) {
  const bcrypt = require('bcryptjs');
  const User = sequelize.define('User', {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    uid: {type: DataTypes.STRING, allowNull: false, unique: true},
    typeId: {
      type: DataTypes.STRING(DataTypes.ENUM({ values: ['PHONE', 'EMAIL'] })),
    },
    password: {type: DataTypes.STRING, allowNull: true},
    role: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING), get: () => {
        return 'user';
      }
    },
    status: {
      type: DataTypes.STRING(DataTypes.ENUM({values: ['NOT_ACTIVE', 'ACTIVE']})),
      defaultValue: 'ACTIVE'
    },
  }, {
    paranoid: true,
    tableName: 'users'
  });

  User.beforeCreate((model, options) => {
    model.hashPassword();
  });

  User.prototype.hashPassword = function () {
    if (this.password) this.password = bcrypt.hashSync(this.password, 10);
  };

  User.associate = function (models) {
    User.hasMany(models.File, { foreignKey: 'userId', onDelete: 'CASCADE', as: 'files' });
    User.hasMany(models.UserToken, { foreignKey: 'userId', onDelete: 'CASCADE', as: 'userTokens' });
  };

  User.prototype.toJSON = function () {
    return {
      id: this.id,
      uid: this.uid,
      typeId: this.typeId,
      role: this.role,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  };

  return User;
};
