const db = require("../config/db");

const createCategory = async (userId, name, transactionTypeId) => {

    const [result] = await db.execute(
        `INSERT INTO category (user_id, name, transaction_type_id)
        VALUES (?, ?, ?)`,
        [userId, name, transactionTypeId]
    );

    return result.insertId;
};

const getCategories = async (userId) => {

    const [ rows ] = await db.execute(
        `SELECT * FROM category
         WHERE user_id=? OR user_id IS NULL`,
         [userId]
    );

    return rows;
};


const getCategoryById = async (id) => {

    const [rows] = await db.execute(
        `SELECT * FROM category WHERE id=?`,
        [id]
    );

    return rows[0];
};

const updateCategory = async (id, name) => {

    await db.execute(
        `UPDATE category SET name=? WHERE id=?`,
        [name, id]
    );
};


const deleteCategory = async (id) => {

    await db.execute(
        `DELETE FROM category WHERE id=?`,
        [id]
    );
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
}

