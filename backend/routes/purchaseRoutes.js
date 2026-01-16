const express = require('express');
const { purchasePremium, updateTransactionStatus ,fetchPaymentStatus} = require('../controllers/purchaseController');
const authenticate = require('../middleware/auth');
const router = express.Router();

console.log(purchasePremium, updateTransactionStatus, fetchPaymentStatus);

router.get('/purchase', authenticate, purchasePremium);
router.post('/update-status', authenticate, updateTransactionStatus);
router.get("/payment-status/:orderId", authenticate, fetchPaymentStatus);
module.exports = router;