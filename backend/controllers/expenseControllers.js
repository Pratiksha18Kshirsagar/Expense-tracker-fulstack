const ExpenseModel = require('../models/expense');
const sequelize = require('../utils/db');



const addExpense = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { expense_amount, expense_description, category ,note} = req.body;
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

const getExpenses = async(req,res)=>{
    try{
        // const expenses = await ExpenseModel.findAll();
        // const expenses = await req.user.getExpenseModels();
        const expenses = await ExpenseModel.findAll({ where: { userId: req.user.id } });

        res.status(200).json({expenses});
    }catch(error){
        console.error('Error fetching expenses:', error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
}


const deleteExpense = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const expenseId = req.params.id;    
        const expense_amt = req.query.expense_amount;
        const deleted = await ExpenseModel.destroy({ where: { id: expenseId } } , { transaction: t }    );

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


module.exports = { addExpense, getExpenses, deleteExpense };


