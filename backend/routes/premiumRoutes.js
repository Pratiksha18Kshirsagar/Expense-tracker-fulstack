const express = require('express');
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const { getPremiumStatus, getLeaderboard } = require('../controllers/premiumControllers');

router.get('/premiumStatus', authenticateToken, getPremiumStatus);
router.get('/leaderboard', authenticateToken, getLeaderboard);

module.exports = router;