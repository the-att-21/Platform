const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signUp = async (req, res) => {
    // Exsisting user
    // Hash password
    // User Creation 
    // Return token

    const {full_name, username, password, email, phone } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({ full_name, username, password: hashedPassword, email, phone });

        const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);
        res.status(201).json({ user: result, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const exsistingUser = await User.findOne({ username });
        if (!exsistingUser) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, exsistingUser.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: exsistingUser.email, id: exsistingUser._id }, SECRET_KEY);
        res.status(201).json({ user: exsistingUser, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}

module.exports = { signUp, login };