const express = require('express');
const router = express.Router();
const { addExpense , getExpenses ,deleteExpense , downloadExpenses} = require('../controllers/expenseControllers');  
const {authenticateToken} = require('../middleware/auth');
router.use(authenticateToken);

router.post('/addExpense',addExpense);
router.get('/getExpenses', getExpenses);
router.delete('/deleteExpense/:id', deleteExpense);
router.get('/download', authenticateToken, downloadExpenses);


module.exports = router;