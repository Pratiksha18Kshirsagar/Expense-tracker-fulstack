const express = require('express');
const router = express.Router();
const {authenticateToken} = require("../middleware/auth");
const { getPremiumStatus } = require('../controllers/premiumControllers');

router.get('/premiumStatus',authenticateToken, getPremiumStatus);

module.exports = router;