const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const auth = require('../middlewares/auth.middleware');

router.use(auth);

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;