const express = require('express');
const { getCategory } = require('../controllers/geminiController');
const router = express.Router();

router.get('/getCategory', getCategory);
module.exports = router;