const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const { getPaymentPage, processPayment, getPaymentStatus } = require("../controllers/cashfreeController");

router.get("/", getPaymentPage);

// AUTH REQUIRED ONLY HERE
router.post("/pay", authenticateToken, processPayment);

// NO AUTH HERE (Cashfree cannot send JWT)
router.get("/payment-status", getPaymentStatus);

module.exports = router;