const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Jokes extends Model {}

Jokes.init(
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
    modelName: 'Jokes',
  }
);

module.exports = Jokes;