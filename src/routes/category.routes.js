const categoryRoutes = require('../controllers/category.controller');
const express = require('express');
const router = express.Router();

const auth= require('../middlewares/auth.middleware');
const { validate, validateParams } = require('../middlewares/validate.middleware');
const { createCategoryBodySchema, updateCategoryBodySchema, categoryIdParamSchema } = require('../schemas/category.schema');

router.use(auth);

router.post('/', validate(createCategoryBodySchema), categoryRoutes.createCategory);
router.get('/', categoryRoutes.getCategories);
router.put('/:id', validateParams(categoryIdParamSchema), validate(updateCategoryBodySchema), categoryRoutes.updateCategory);
router.delete('/:id', validateParams(categoryIdParamSchema), categoryRoutes.deleteCategory);

module.exports = router;