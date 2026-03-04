const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    expense_amount: {
        type: Number,
        required: true
    },
    expense_description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    note: {
        type: String,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;