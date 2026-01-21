const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const User = sequelize.define("User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  },
);

module.exports = User;