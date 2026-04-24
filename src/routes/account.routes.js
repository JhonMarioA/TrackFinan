const accountController = require('../controllers/account.controller');
const auth = require('../middlewares/auth.middleware');
const { validate, validateParams } = require('../middlewares/validate.middleware');
const { createAccountBodySchema, updateAccountBodySchema, accountIdParamSchema } = require('../schemas/account.schema');
const express = require('express');
const router = express.Router();

router.use(auth);

router.post('/', validate(createAccountBodySchema), accountController.createAccount);
router.get('/', accountController.getAccounts);
router.put('/:id', validateParams(accountIdParamSchema), validate(updateAccountBodySchema), accountController.updateAccount);
router.delete('/:id', validateParams(accountIdParamSchema), accountController.deleteAccount);
router.get('/account-types', accountController.getAccountTypes);
router.get('/transaction-types', accountController.getTransactionTypes);

module.exports = router;