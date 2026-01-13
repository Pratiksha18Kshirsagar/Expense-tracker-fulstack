const UserModel = require('../models/user.js');


const createUser = (req, res) => {
    const { username, email, password } = req.body; 

    if (!username || !email || !password) {
       return res.status(400).json({ message: 'All fields are required.' });
    }   
    UserModel.create({ name: username, email: email, password: password })
        .then(user => {
            console.log('User created successfully:', user);
        })
        .catch(err => {
            console.error('Error creating user:', err);
            return res.status(500).json({ message: 'Internal server error.' });
        });
    res.status(201).json({ message: 'User created successfully!' });
}   


module.exports = { createUser };