const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class jokes extends Model {}

jokes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    joke: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zinger: {
      type: DataTypes.STRING,
      allowNull: false
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'jokes',
  }
);

module.exports = jokes;