module.exports = function (sequelize, DataTypes) {

  const File = sequelize.define('File', {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    userId: { type: DataTypes.BIGINT, allowNull: false },
    url: {type: DataTypes.STRING, allowNull: false},
    originalName: {type: DataTypes.STRING, allowNull: true},
    mimetype: {type: DataTypes.STRING, allowNull: true},
    size: {type: DataTypes.INTEGER, allowNull: true},
    extension: {type: DataTypes.STRING, allowNull: true},
  }, {
    paranoid: true,
    tableName: 'files'
  });

  File.associate = function (models) {
    File.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE', as: 'user'});
  };

  File.prototype.toJSON = function () {
    return {
      id: this.id,
      userId: this.userId,
      originalName: this.originalName,
      mimetype: this.mimetype,
      size: this.size,
      extension: this.extension,
      createdAt: this.createdAt,
    };
  };
  return File;
};
