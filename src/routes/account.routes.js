const accountController = require('../controllers/account.controller');
const auth = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.use(auth);

router.post('/', accountController.createAccount);
router.get('/', accountController.getAccounts);
router.put('/:id', accountController.updateAccount);
router.delete('/:id', accountController.deleteAccount);

module.exports = router;