const User = require('./user');
const Expense = require('./expense');
const ForgotPasswordRequest = require('./forgetPasswordRequest');


User.hasMany(Expense, { foreignKey: 'userId' ,onDelete:'CASCADE' });
Expense.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ForgotPasswordRequest, { foreignKey: "userId", onDelete: "CASCADE" });
ForgotPasswordRequest.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });

module.exports = {
    User,
    Expense,
    ForgotPasswordRequest
};