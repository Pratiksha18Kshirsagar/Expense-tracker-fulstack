const express = require('express');
const router = express.Router();
const path = require('path');
const { createUser, loginUser, forgotPassword, resetPassword } = require('../controllers/userControllers');

router.post('/signup', createUser);
router.post('/login', loginUser);

router.post("/forgot-password", forgotPassword);
router.get('/password/resetpassword/:uuid', (req, res) => {
  console.log("Reset link opened for UUID:", req.params.uuid);

  res.sendFile(
    path.resolve(__dirname, '../../frontend/views/reset.html')
  );
});

// Handle new password submit (POST)
router.post('/password/resetpassword/:uuid', resetPassword);



module.exports = router;