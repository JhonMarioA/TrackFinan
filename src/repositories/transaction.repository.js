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


// exp v1

const findWithFilters = async (userId, filters) => {
  let query = `
    SELECT t.*
    FROM transactions t
    JOIN account a ON t.account_id = a.id
    WHERE a.user_id = ?
  `;

  const params = [userId];

  //  date filter
  if (filters.startDate) {
    query += ` AND t.created_at >= ?`;
    params.push(filters.startDate);
  }

  if (filters.endDate) {
    query += ` AND t.created_at <= ?`;
    params.push(filters.endDate);
  }

  // category
  if (filters.categoryId) {
    query += ` AND t.category_id = ?`;
    params.push(filters.categoryId);
  }

  // order
  query += ` ORDER BY t.created_at ${filters.sort === 'asc' ? 'ASC' : 'DESC'}`;

  // pagination
  const limit = parseInt(filters.limit) || 10;
  const page = parseInt(filters.page) || 1;
  const offset = (page - 1) * limit;

  query += ` LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  const [rows] = await db.execute(query, params);
  return rows;

  // GET /api/transactions?startDate=2026-04-01&endDate=2026-04-30
  // GET /api/transactions?categoryId=2
  // GET /api/transactions?page=2&limit=5

};


module.exports = {
    createTransaction,
    findTransactionsByUserId,
    findTransactionById,
    updateTransaction,
    deleteTransaction,
    findWithFilters
};