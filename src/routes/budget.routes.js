const budgetController = require('../controllers/budget.controller');
const auth = require('../middlewares/auth.middleware');
const { validate, validateParams } = require('../middlewares/validate.middleware');
const { createBudgetBodySchema, updateBudgetBodySchema, budgetIdParamSchema } = require('../schemas/budgets.schema');
const express = require('express');
const router = express.Router();

router.use(auth);

router.post('/', validate(createBudgetBodySchema), budgetController.createBudget);
router.get('/', budgetController.getBudgets);
router.put('/:id', validateParams(budgetIdParamSchema), validate(updateBudgetBodySchema), budgetController.updateBudget);
router.delete('/:id', validateParams(budgetIdParamSchema), budgetController.deleteBudget);
router.get('/status', budgetController.getBudgetStatus);

module.exports = router;