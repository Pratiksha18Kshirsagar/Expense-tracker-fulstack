const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticateToken = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        console.log(token);
        const decoded = jwt.verify(token, 'secretkey');

        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ success: false, message: "User not found" });
        }
        req.user = user;
        next();

    } catch (err) {
        console.log(err);
        return res.status(401).json({ success: false, message: "Invalid Token" });
    }
}

module.exports = { authenticateToken };