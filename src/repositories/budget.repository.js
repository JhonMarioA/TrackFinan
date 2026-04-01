const db = require("../config/db");

const createBudget = async (userId, categoryId, amount, month, year) => {

    const [result] = await db.query(
        "INSERT INTO budget (user_id, category_id, amount, month, year) VALUES (?, ?, ?, ?, ?)",
        [userId, categoryId, amount, month, year]
    );
    return result.insertId;
};


const getBudgetsByUserId = async (userId) => {
    const [rows] = await db.query(
        "SELECT * FROM budget WHERE user_id = ?",
        [userId]
    );
    return rows;
};

const getBudgetById = async (budgetId) => {
    const [rows] = await db.query(
        "SELECT * FROM budget WHERE id = ?",
        [budgetId]
    );
    return rows[0];
};

const updateBudget = async (budgetId, amount) => {
    await db.query(
        "UPDATE budget SET amount = ? WHERE id = ?",
        [amount, budgetId]
    );
};

const deleteBudget = async (budgetId) => {
    await db.query(
        "DELETE FROM budget WHERE id = ?",
        [budgetId]
    );
};

module.exports = {
    createBudget,
    getBudgetsByUserId,
    getBudgetById,
    updateBudget,
    deleteBudget
};