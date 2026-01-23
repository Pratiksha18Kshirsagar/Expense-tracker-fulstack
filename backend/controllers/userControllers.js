const UserModel = require('../models/user.js');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendResetEmail } = require("../services/emailService.js");


const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const existingUser = await UserModel.findOne({ where: { email } });

        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};


const loginUser = async (req, res) => {
    // Login logic to be implemented
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email },
            'secretkey',
            { expiresIn: '1h' }
        );
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    console.log("Forgot Password Request for:", email);

    const user = await UserModel.findOne({ where: { email } });
    console.log("User Found:", user.id);

    if (!user) return res.status(404).json({ message: "User not found" });
    
    const resetLink = `http://localhost:4000/user/reset-password/${user.id}`;
    await sendResetEmail(user.email, resetLink);
    res.json({ message: "Reset link sent" });
};


const resetPassword = async (req, res) => {
    const { userId } = req.params;
    const { newPassword } = req.body;

    const user = await UserModel.findByPk(userId);
    if (!user) return res.status(404).json({ message: "Invalid user" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    await user.save();

    res.json({ message: "Password reset successful" });
};


module.exports = { createUser, loginUser, forgotPassword, resetPassword };
