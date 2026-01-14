const express = require('express');
const router = express.Router();
const { addExpense , getExpenses ,deleteExpense} = require('../controllers/expenseControllers');  
const {authenticateToken} = require('../middleware/auth');
router.use(authenticateToken);

router.post('/addExpense',addExpense);
router.get('/getExpenses', getExpenses);
router.delete('/deleteExpense/:id', deleteExpense);

module.exports = router;