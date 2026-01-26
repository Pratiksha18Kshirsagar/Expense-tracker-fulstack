const ExpenseModel = require('../models/expense');
const sequelize = require('../utils/db');
const ExcelJS = require('exceljs');
const { uploadToS3 } = require('../services/s3Service');



const addExpense = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { expense_amount, expense_description, category, note } = req.body;
        const newExpense = await ExpenseModel.create({
            expense_amount,
            expense_description,
            category,
            note,
            userId: req.user.id
        }
            , { transaction: t });

        req.user.totalExpense += parseInt(expense_amount);
        await req.user.save({ transaction: t });
        await t.commit();
        // await req.user.createExpenseModel({expense_amount, expense_description, category});
        res.status(201).json({ message: 'Expense added successfully' });
    } catch (error) {
        await t.rollback();
        console.error('Error adding expense:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getExpenses = async (req, res) => {
    try {
        // const expenses = await ExpenseModel.findAll();
        // const expenses = await req.user.getExpenseModels();
        const expenses = await ExpenseModel.findAll({ where: { userId: req.user.id } });

        res.status(200).json({ expenses });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const deleteExpense = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const expenseId = req.params.id;
        const expense_amt = req.query.expense_amount;
        const deleted = await ExpenseModel.destroy({ where: { id: expenseId } }, { transaction: t });

        if (deleted) {
            req.user.totalExpense -= parseInt(expense_amt);
            await req.user.save({ transaction: t });
            await t.commit();
            res.status(200).json({ message: 'Expense deleted successfully' });

        } else {
            res.status(404).json({ message: 'Expense not found' });
        }
    } catch (error) {
        await t.rollback();
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};




const downloadExpenses = async (req, res) => {
    try {
        if (!req.user.isPremium) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const expenses = await ExpenseModel.findAll({
            where: { userId: req.user.id }
        });

        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Expenses');

        sheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Amount', key: 'expAmt', width: 15 },
            { header: 'Description', key: 'expDes', width: 25 },
            { header: 'Category', key: 'expCat', width: 15 },
            { header: 'Note', key: 'note', width: 25 }
        ];

        expenses.forEach(exp => {
            sheet.addRow({
                id: exp.id,
                expAmt: exp.expense_amount,
                expDes: exp.expense_description,
                expCat: exp.category,
                note: exp.note || ''
            });
        });

        const data = await workbook.xlsx.writeBuffer();

        const filename = `expenses/user-${req.user.id}/${Date.now()}.xlsx`;

        const fileUrl = await uploadToS3(
            data,
            filename,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        res.status(200).json({ fileUrl });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Download failed' });
    }
};


module.exports = { addExpense, getExpenses, deleteExpense, downloadExpenses };


