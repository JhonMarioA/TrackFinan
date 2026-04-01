const db = require("../config/db");

const createMethod = async (userId, name) => {

    const [result] = await db.query(
        "INSERT INTO payment_method (user_id, name) VALUES (?, ?)",
        [userId, name]
    );

    // console.log(result);

    return result.insertId;
};


const getMethodsByUserId = async (userId) => {

    const [rows] = await db.query(
        "SELECT * FROM payment_method WHERE user_id = ?",
        [userId]
    );

    return rows;
};

const getMethodById = async (id) => {
    const [rows] = await db.query(
        "SELECT * FROM payment_method WHERE id = ?",
        [id]
    );

    return rows[0];
};


const updateMethod = async (id, name) => {
    await db.query(
        "UPDATE payment_method SET name = ? WHERE id = ?",
        [name, id]
    );
};

const deleteMethod = async (id) => {
    await db.query(
        "DELETE FROM payment_method WHERE id = ?",
        [id]
    );
};

module.exports = {
    createMethod,
    getMethodsByUserId,
    getMethodById,
    updateMethod,
    deleteMethod
};