const UserModel = require('../models/user.js');

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

        const user = await UserModel.create({ name, email, password });

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
        const {email,password} = req.body;

        const user = await UserModel.findOne({where:{email}});
        if(!user || user.password !== password){
            return res.status(401).json({message:"Invalid email or password"});
        }
        return res.status(200).json({message:"Login successful", user});

    } catch (error) {
         console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

module.exports = { createUser, loginUser };
