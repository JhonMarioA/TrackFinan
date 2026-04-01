const db = require("../config/db");

const createTransaction = async (accountId, categoryId, paymentMethodId, amount, description) => {

    const [ result ] = await db.execute(
        `INSERT INTO transactions
        (account_id, category_id, payment_method_id, amount, description)
        VALUES (?, ?, ?, ?, ?)`,
        [accountId, categoryId, paymentMethodId, amount, description]
    );

    return result.insertId;
};


const findTransactionsByUserId = async (userId) => {
    const [ rows ] = await db.execute(
        `SELECT t.* 
        FROM transactions t
        JOIN account a ON t.account_id = a.id
        WHERE a.user_id = ?`,
        [userId]
    );

    return rows;
};


const findTransactionById = async (transactionId) => {
    const [ rows ] = await db.execute(
        `SELECT * FROM transactions WHERE id = ?`,
        [transactionId]
    );

    return rows[0];
};


const updateTransaction = async (transactionId, accountId, categoryId, paymentMethodId, amount, description) => {
    await db.execute(
        `UPDATE transactions SET
         account_id = ?, category_id = ?, payment_method_id = ?, amount = ?, description = ? WHERE id = ?`,
         [accountId, categoryId, paymentMethodId, amount, description, transactionId]
    );
};

const deleteTransaction = async (transactionId) => {
    await db.execute(
        `DELETE FROM transactions WHERE id = ?`,
        [transactionId]
    );
};

module.exports = {
    createTransaction,
    findTransactionsByUserId,
    findTransactionById,
    updateTransaction,
    deleteTransaction
};