const userRepo = require('../repositories/user.repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (name, email, password) => {

    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) throw new Error('Email already in use');

    const password_hash = await bcrypt.hash(password, 10);
    const userId = await userRepo.createUser(name, email, password_hash);
    return { userId };
};


const login = async (email, password) => {

    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) throw new Error('Invalid credentials');

    const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token };
};

module.exports = {
    register,
    login
};