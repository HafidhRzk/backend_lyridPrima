'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.user, {
        as: "user",
        foreignKey: {
          name: "idUser",
        },
      });
    }
  }
  transaction.init({
    tanggal: DataTypes.INTEGER,
    bulan: DataTypes.STRING,
    tahun: DataTypes.INTEGER,
    keterangan: DataTypes.STRING,
    income: DataTypes.BIGINT,
    outcome: DataTypes.BIGINT,
    balance: DataTypes.BIGINT,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};