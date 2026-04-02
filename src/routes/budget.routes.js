const budgetController = require('../controllers/budget.controller');
const auth = require('../middlewares/auth.middleware');
const express = require('express');
const router = express.Router();

router.use(auth);

router.post('/', budgetController.createBudget);
router.get('/', budgetController.getBudgets);
router.put('/:id', budgetController.updateBudget);
router.delete('/:id', budgetController.deleteBudget);
router.get('/status', budgetController.getBudgetStatus);

module.exports = router;