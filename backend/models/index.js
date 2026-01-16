const User = require('./user');
const Expense = require('./expense');
const Order = require('./order');

User.hasMany(Expense, { foreignKey: 'userId' ,onDelete:'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Order);
Order.belongsTo(User);

module.exports = {
    User,
    Expense
};