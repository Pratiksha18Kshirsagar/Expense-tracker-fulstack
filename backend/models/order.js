const Sequelize = require('sequelize');
const sequelize = require('../utils/db');


const Order = sequelize.define('orders', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: Sequelize.STRING,
    status: Sequelize.STRING
});


module.exports = Order;