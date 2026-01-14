const User = require('./user');
const Expense = require('./expense');

User.hasMany(Expense);
Expense.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
    User,
    Expense
};