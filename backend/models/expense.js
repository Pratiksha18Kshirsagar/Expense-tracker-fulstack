const { DataTypes } = require('sequelize');
const sequelize = require('../utils/db');

const Expense = sequelize.define("Expense",
  {
    id:{
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    expense_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expense_description:{
      type: DataTypes.STRING,
        allowNull:false
    },
    category:{
        type: DataTypes.STRING,
        allowNull:false
    },
    note:{
      type: DataTypes.STRING,
      allowNull:true
    }
  },
);

module.exports = Expense;