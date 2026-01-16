const ExpenseModel = require('../models/expense');



const addExpense = async (req, res) => {
    try {
        const { expense_amount, expense_description, category } = req.body;
        const newExpense = await ExpenseModel.create({
            expense_amount,
            expense_description,
            category,
            userId: req.user.id
        });
        // await req.user.createExpenseModel({expense_amount, expense_description, category});
        res.status(201).json({ message: 'Expense added successfully' });
    } catch (error) {
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
    try {
        const expenseId = req.params.id;    
        const deleted = await ExpenseModel.destroy({ where: { id: expenseId } });
        if (deleted) {
            res.status(200).json({ message: 'Expense deleted successfully' });
        } else {
            res.status(404).json({ message: 'Expense not found' });
        }   
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { addExpense, getExpenses, deleteExpense };


