const db = require('../config/db');

const findByEmail = async (email) => {
    const [rows] = await db.execute(
        'SELECT * FROM user WHERE email = ?',
        [email]
    );
    return rows[0];
};


const createUser = async (name, email, password_hash) => {
    const [result] = await db.execute(
        'INSERT INTO user (name, email, password_hash) VALUES (?, ?, ?)',
        [name, email, password_hash]
    );
    return result.insertId;
};

module.exports = {
    findByEmail,
    createUser
};  