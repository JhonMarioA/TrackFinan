const transactionService = require('../services/transaction.service');

const createTransaction = async (req, res) => {
    try {
        const userId = req.user.userId;
        // console.log(userId);
        const transactionId = await transactionService.createTransaction(userId, req.body);
        res.status(201).json({ id: transactionId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getTransactions = async (req, res) => {
    try {
        const userId = req.user.userId;
        const transactions = await transactionService.getTransactions(userId);
        res.json(transactions);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const userId = req.user.userId;
        const transactionId = req.params.id;
        await transactionService.updateTransaction(userId, transactionId, req.body);
 
        res.json({ message: "Transaction updated successfully" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        const userId = req.user.userId;
        const transactionId = req.params.id;
        await transactionService.deleteTransaction(userId, transactionId);
       
        res.json({ message: "Transaction deleted successfully" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const findWithFilters = async (req, res) => {
  try {
    const userId = req.user.userId;
    const data = await transactionService.findWithFilters(userId, req.query);

    res.json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
    createTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    findWithFilters
};