const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const auth = require('../middlewares/auth.middleware');
const { validate, validateParams, validateQuery } = require('../middlewares/validate.middleware');
const { createTransactionBodySchema, updateTransactionBodySchema, transactionIdParamSchema, transactionFilterQuerySchema } = require('../schemas/transactions.schema');

router.use(auth);

router.post('/', validate(createTransactionBodySchema), transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.put('/:id', validateParams(transactionIdParamSchema), validate(updateTransactionBodySchema), transactionController.updateTransaction);
router.delete('/:id', validateParams(transactionIdParamSchema), transactionController.deleteTransaction);
router.get('/filter', validateQuery(transactionFilterQuerySchema), transactionController.findWithFilters);

module.exports = router;