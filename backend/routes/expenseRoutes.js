const express = require('express');
const router = express.Router();
const { addExpense , getExpenses ,deleteExpense} = require('../controllers/expenseControllers');  

router.post('/addExpense',addExpense);
router.get('/getExpenses', getExpenses);
router.delete('/deleteExpense/:id', deleteExpense);

module.exports = router;