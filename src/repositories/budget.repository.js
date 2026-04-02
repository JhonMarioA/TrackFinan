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


const getBudgetStatus = async (userId) => {
  const [rows] = await db.execute(
    `SELECT 
        b.id,
        c.name AS category,
        b.amount AS limit_amount,
        COALESCE(SUM(t.amount), 0) AS spent,
        (b.amount - COALESCE(SUM(t.amount), 0)) AS remaining,
        ROUND((COALESCE(SUM(t.amount), 0) / b.amount) * 100, 2) AS percentage
     FROM budget b
     JOIN category c ON b.category_id = c.id
     LEFT JOIN transactions t 
        ON t.category_id = b.category_id
        AND MONTH(t.created_at) = b.month
        AND YEAR(t.created_at) = b.year
     JOIN transaction_type tt ON c.transaction_type_id = tt.id
     WHERE b.user_id = ?
       AND tt.name = 'expense'
     GROUP BY b.id`,
    [userId]
  );
  return rows;
};

module.exports = {
    createBudget,
    getBudgetsByUserId,
    getBudgetById,
    updateBudget,
    deleteBudget,
    getBudgetStatus
};