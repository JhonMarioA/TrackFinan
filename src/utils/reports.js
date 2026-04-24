const db = require('../config/db');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.middleware');
const { validateQuery } = require('../middlewares/validate.middleware');
const { expensesByCategoryQuerySchema, balanceQuerySchema } = require('../schemas/reports.schema');


// REPOSITORY 

// expenses by category
const getExpensesByCategory = async (userId, startDate, endDate) => {
  let query = `
    SELECT 
      c.name AS category,
      SUM(t.amount) AS total
    FROM transactions t
    JOIN category c ON t.category_id = c.id
    JOIN account a ON t.account_id = a.id
    JOIN transaction_type tt ON c.transaction_type_id = tt.id
    WHERE a.user_id = ?
      AND tt.name = 'expense'
  `;

  const params = [userId];

  if (startDate) {
    query += ` AND t.created_at >= ?`;
    params.push(startDate);
  }

  if (endDate) {
    query += ` AND t.created_at <= ?`;
    params.push(endDate);
  }

  query += ` GROUP BY c.id ORDER BY total DESC`;

  const [rows] = await db.execute(query, params);
  return rows;
};

// income vs expense
const getIncomeVsExpense = async (userId) => {
  const [rows] = await db.execute(
    `SELECT 
      tt.name AS type,
      SUM(t.amount) AS total
     FROM transactions t
     JOIN category c ON t.category_id = c.id
     JOIN transaction_type tt ON c.transaction_type_id = tt.id
     JOIN account a ON t.account_id = a.id
     WHERE a.user_id = ?
     GROUP BY tt.name`,
    [userId]
  );

  return rows;
};

// balance over time
const getBalance = async (userId, startDate, endDate) => {
  const [rows] = await db.execute(
    `SELECT 
      SUM(CASE WHEN tt.name = 'income' THEN t.amount ELSE 0 END) AS income,
      SUM(CASE WHEN tt.name = 'expense' THEN t.amount ELSE 0 END) AS expense,
      SUM(CASE 
            WHEN tt.name = 'income' THEN t.amount 
            ELSE -t.amount 
          END) AS balance
     FROM transactions t
     JOIN category c ON t.category_id = c.id
     JOIN transaction_type tt ON c.transaction_type_id = tt.id
     JOIN account a ON t.account_id = a.id
     WHERE a.user_id = ?
       AND t.created_at BETWEEN ? AND ?`,
    [userId, startDate, endDate]
  );

  return rows[0];
};



// CONTROLLER

const expensesByCategory = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { startDate, endDate } = req.query;

    const data = await getExpensesByCategory(userId, startDate, endDate);

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const incomeVsExpense = async (req, res) => {
  try {
    const userId = req.user.userId;

    const data = await getIncomeVsExpense(userId);

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const balance = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate required' });
    }

    const data = await getBalance(userId, startDate, endDate);

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// ROUTES

router.use(auth);

router.get('/expenses-by-category', validateQuery(expensesByCategoryQuerySchema), expensesByCategory);
router.get('/income-vs-expense', incomeVsExpense);
router.get('/balance', validateQuery(balanceQuerySchema), balance);

module.exports = router;



// Examples of endpoints:

// GET /api/reports/expenses-by-category?startDate=2026-04-01&endDate=2026-04-30
// GET /api/reports/income-vs-expense
// GET /api/reports/balance?startDate=2026-04-01&endDate=2026-04-30
